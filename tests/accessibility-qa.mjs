import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';

// Read-only production accessibility/resource audit. No external forms are submitted.
// QA_BASE_URL=http://localhost:3013 node tests/accessibility-qa.mjs
const base = process.env.QA_BASE_URL || 'http://localhost:3013';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const variants = [
  { name: 'tr-mobile-390', path: '/', width: 390, height: 844, mobile: true },
  { name: 'ar-mobile-390', path: '/ar', width: 390, height: 844, mobile: true },
  { name: 'tr-desktop-1280', path: '/', width: 1280, height: 900, mobile: false },
];
const results = [];

async function resources(page) {
  return page.evaluate(() => {
    const records = [...performance.getEntriesByType('navigation'), ...performance.getEntriesByType('resource')]
      .map(item => ({ url: item.name, initiator: item.initiatorType || 'navigation', transferBytes: item.transferSize,
        encodedBodyBytes: item.encodedBodySize, decodedBodyBytes: item.decodedBodySize, durationMs: item.duration }));
    return { count: records.length, transferBytes: records.reduce((sum, item) => sum + item.transferBytes, 0),
      encodedBodyBytes: records.reduce((sum, item) => sum + item.encodedBodyBytes, 0), records };
  });
}

try {
  for (const variant of variants) {
    const context = await browser.newContext({ viewport: { width: variant.width, height: variant.height },
      isMobile: variant.mobile, hasTouch: variant.mobile, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    const mediaRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (/\.(mp4|mov)(?:\?|$)/i.test(request.url())) mediaRequests.push(request.url());
    });
    const response = await page.goto(base + variant.path, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const initialResources = await resources(page);
    const initialMediaRequests = [...mediaRequests];
    // Real scrolling triggers IntersectionObserver reveal effects before contrast analysis.
    const revealNodes = page.locator('[data-reveal]');
    for (let index = 0; index < await revealNodes.count(); index++) {
      await revealNodes.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(70);
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const hiddenRevealCount = await revealNodes.evaluateAll(nodes => nodes.filter(node => Number(getComputedStyle(node).opacity) < 0.99).length);
    const scrollResources = await resources(page);
    const mediaAfterScroll = [...mediaRequests];
    // Include the complete FAQ text in the audited reading experience.
    await page.locator('.faq-group details').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const compactRule = rule => ({ id: rule.id, impact: rule.impact, description: rule.description, help: rule.help,
      helpUrl: rule.helpUrl, tags: rule.tags, nodes: rule.nodes.map(node => ({ target: node.target, html: node.html,
        failureSummary: node.failureSummary, any: node.any, all: node.all, none: node.none })) });
    const result = {
      ...variant, status: response.status(), errors, initialMediaRequests, mediaAfterScroll, hiddenRevealCount,
      initialResources, scrollResources, violations: audit.violations.map(compactRule),
      incomplete: audit.incomplete.map(compactRule), passRuleCount: audit.passes.length,
      videoElements: await page.locator('video').evaluateAll(nodes => nodes.map(node => ({ src: node.getAttribute('src'),
        preload: node.preload, muted: node.muted, autoplay: node.autoplay,
        captionTracks: node.querySelectorAll('track[kind="captions"],track[kind="subtitles"]').length }))),
    };
    results.push(result);
    console.log(`${variant.name}: ${audit.violations.length} violation rules, ${audit.incomplete.length} manual-review rules; ` +
      `${(initialResources.transferBytes / 1024).toFixed(0)} KiB initial, ${initialMediaRequests.length} initial video requests, ` +
      `${hiddenRevealCount} hidden reveal elements.`);
    for (const rule of audit.violations) console.log(`  ${rule.id}: ${rule.nodes.length} nodes; ${rule.nodes.slice(0, 3).map(node => node.target.join(' ')).join('; ')}`);
    await context.close();
  }
} finally {
  await browser.close();
}

const report = { base, runAt: new Date().toISOString(), browser: 'Chrome headless', tags: ['wcag2a', 'wcag2aa', 'wcag21aa'], results };
await writeFile('tests/accessibility-qa-report.json', JSON.stringify(report, null, 2));
const lines = [
  '# Accessibility and initial resource audit', '', `Run: ${report.runAt}`, `Base: ${base}`, '',
  'Production Chrome audit at 390px Turkish/Arabic and 1280px Turkish. All reveal sections were scrolled into view and FAQ answers expanded before axe WCAG 2 A/AA and 2.1 AA analysis. No forms were submitted or videos played.', '',
  '| Variant | Violation rules | Initial transfer | Transfer after scrolling | Initial / after-scroll video requests |',
  '|---|---:|---:|---:|---:|',
  ...results.map(result => `| ${result.name} | ${result.violations.length} | ${(result.initialResources.transferBytes / 1024).toFixed(0)} KiB | ${(result.scrollResources.transferBytes / 1024).toFixed(0)} KiB | ${result.initialMediaRequests.length} / ${result.mediaAfterScroll.length} |`),
  '', '## Automated violations', '',
  ...results.flatMap(result => result.violations.map(rule => `- **${result.name}: ${rule.id}** (${rule.impact}) — ${rule.help}. ${rule.nodes.map(node => `\`${node.target.join(' ')}\``).join(', ')}`)),
  ...(results.every(result => !result.violations.length) ? ['None detected by this automated audit.'] : []),
  '', '## Manual review and scope', '',
  '- Automated axe checks do not establish full WCAG compliance. Incomplete color-contrast checks involving images/gradients and audio/video accessibility require human review.',
  '- Instructional videos contain original Turkish burned-in text. The audit records caption track presence but does not claim that visible text fully transcribes dialogue and non-speech audio.',
  '- Transfer sizes are observed cold-context local production loading without network/CPU throttling; they are not a Lighthouse performance score or field Core Web Vitals.',
  '- Full resource lists, selectors, contrast measurements and manual-review candidates are in `tests/accessibility-qa-report.json`.',
];
await writeFile('tests/accessibility-qa-report.md', lines.join('\n') + '\n');
process.exitCode = results.some(result => result.violations.length || result.errors.length || result.initialMediaRequests.length || result.hiddenRevealCount) ? 1 : 0;
