import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const base = process.env.QA_BASE_URL || "http://localhost:3013";
const output = "tests/artifacts/hair-faq";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
try {
  for (const locale of ["tr", "en", "de", "ru", "ar"]) {
    for (const width of [390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 844 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + (locale === "tr" ? "/" : "/" + locale), {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator(".hair-detail-trigger").count(), 3);
      assert.equal(await page.locator(".hair-dialog").count(), 3);
      assert.ok(
        (
          await page.locator(".language-toggle .language-flag").innerText()
        ).trim(),
      );
      await page.locator(".language-toggle").click();
      assert.equal(
        await page.locator("#language-list .language-flag").count(),
        5,
      );
      await page.keyboard.press("Escape");
      const modalAxe = [];
      for (let i = 0; i < 3; i++) {
        const trigger = page.locator(".hair-detail-trigger").nth(i);
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const modal = page.locator(".hair-dialog[open]");
        await modal.waitFor({ state: "visible" });
        assert.equal(
          await modal.locator(".hair-features li").count(),
          [4, 8, 7][i],
        );
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "hidden",
        );
        assert.ok(
          await modal.evaluate((el) => el.contains(document.activeElement)),
        );
        const rect = await modal.boundingBox();
        assert.ok(
          rect.x >= 0 &&
            rect.x + rect.width <= width + 1 &&
            rect.y >= 0 &&
            rect.y + rect.height <= 845,
        );
        assert.ok(
          await modal.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
        );
        await modal
          .locator(".hair-dialog-footer .button")
          .scrollIntoViewIfNeeded();
        assert.ok(await modal.locator(".hair-dialog-close").isVisible());
        await page.keyboard.press("Tab");
        assert.ok(
          await modal.evaluate((el) => el.contains(document.activeElement)),
        );
        if (width === 390 && ["tr", "ar"].includes(locale) && i === 1) {
          await modal
            .locator(".hair-dialog-body")
            .evaluate((el) => el.scrollTo(0, 0));
          await page.screenshot({
            path: `${output}/${locale}-hair-dialog.png`,
          });
          const axe = await new AxeBuilder({ page })
            .include(".hair-dialog[open]")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          modalAxe.push(axe.violations);
          assert.equal(
            axe.violations.length,
            0,
            JSON.stringify(axe.violations),
          );
        }
        await page.keyboard.press("Escape");
        await page.waitForFunction(
          () =>
            !document.querySelector(".hair-dialog[open]") &&
            document.body.style.overflow !== "hidden",
        );
        assert.notEqual(
          await page.evaluate(() => document.body.style.overflow),
          "hidden",
        );
        await page.waitForFunction(() =>
          document.activeElement?.classList.contains("hair-detail-trigger"),
        );
      }
      const questions = page.locator(".faq-group details");
      for (const index of [0, 1, 18, 19, 22, 23, 24, 25]) {
        await questions.nth(index).locator("summary").click();
        assert.equal(await page.locator(".faq-group details[open]").count(), 1);
        assert.ok(await questions.nth(index).evaluate((el) => el.open));
      }
      assert.match(
        await questions.nth(18).textContent(),
        locale === "ar" ? /3 و6/ : /3–6/,
      );
      assert.match(
        await questions.nth(19).textContent(),
        locale === "ar" ? /مرتين إلى أربع/ : /2–4/,
      );
      const expected = {
        22: ["https://hesapla.platinantalya.com/"],
        23: [
          "https://www.platinantalya.com/booking-calendar/%C3%BCcretsiz-%C3%B6n-g%C3%B6r%C3%BC%C5%9Fme",
        ],
        24: [
          "https://www.platinantalya.com/service-page/mikro-kaynak-yeni-uygulama",
          "https://www.platinantalya.com/booking-calendar/%C3%BCcretsiz-%C3%B6n-g%C3%B6r%C3%BC%C5%9Fme",
          "https://wa.me/905558923770",
          "tel:+905558923770",
        ],
        25: ["https://goo.gl/maps/zdufEy311bMaR2ZY7"],
      };
      for (const [index, hrefs] of Object.entries(expected)) {
        const question = questions.nth(Number(index));
        if (!(await question.evaluate((el) => el.open)))
          await question.locator("summary").click();
        assert.deepEqual(
          await question
            .locator(".faq-actions a")
            .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))),
          hrefs,
        );
        for (const button of await question.locator(".faq-actions a").all()) {
          const r = await button.boundingBox();
          assert.ok(r.height >= 44 && r.x >= 0 && r.x + r.width <= width + 1);
        }
      }
      await page.locator(".hero-discover").scrollIntoViewIfNeeded();
      assert.ok(await page.locator(".hero-discover").isVisible());
      assert.ok(
        (await page.locator(".hero-discover").boundingBox()).height >= 44,
      );
      assert.equal(await page.locator(".price-symbol").count(), 0);
      assert.equal(await page.locator(".price-hair svg").count(), 1);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      assert.deepEqual(errors, []);
      results.push({ locale, width, result: "pass", modalAxe });
      console.log(
        `${locale}-${width}: hair dialogs, FAQ exclusivity/actions, flags and layout PASS`,
      );
      await context.close();
    }
  }
  const context = await browser.newContext({
    viewport: { width: 943, height: 939 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${output}/desktop-hero.png` });
  await page.locator(".intro-image").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/desktop-intro.png` });
  await page.locator(".price-panel").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/desktop-price.png` });
  await context.close();
} finally {
  await browser.close();
  await writeFile(`${output}/report.json`, JSON.stringify(results, null, 2));
}
