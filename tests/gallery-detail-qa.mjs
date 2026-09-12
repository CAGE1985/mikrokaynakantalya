import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Run against the running site: QA_BASE_URL=http://localhost:3012 node tests/gallery-detail-qa.mjs
const base = process.env.QA_BASE_URL || "http://localhost:3012";
const artifacts = path.resolve("tests/artifacts/gallery-detail");
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
async function currentId(page) {
  return (await page.locator(".gallery-detail-counter").innerText())
    .split("/")[0]
    .trim();
}
async function expectPair(page, id) {
  await page.waitForFunction(
    (id) =>
      document
        .querySelector(".gallery-detail-counter")
        ?.textContent.trim()
        .startsWith(id),
    id,
  );
  assert.equal(await currentId(page), id);
  const images = page.locator(".gallery-detail-pair img");
  assert.equal(await images.count(), 2);
  for (const [i, kind] of ["once", "sonra"].entries()) {
    assert.ok(
      decodeURIComponent(await images.nth(i).getAttribute("src")).includes(
        `/uygulama-${id}-${kind}.jpg`,
      ),
    );
    assert.ok((await images.nth(i).getAttribute("alt")).length > 20);
  }
  const title = await page.locator(`#uygulama-${id} h4`).textContent();
  const description = await page.locator(`#uygulama-${id} > p`).textContent();
  assert.equal(
    await page.locator("#gallery-dialog-title").textContent(),
    title,
  );
  assert.equal(
    await page.locator("#gallery-dialog-description").textContent(),
    description,
  );
  assert.equal(
    await page.locator(".gallery-active-story h3").textContent(),
    title,
  );
}
async function swipe(page, cdp, dx, dy = 0) {
  const box = await page.locator(".gallery-detail-pair").boundingBox();
  const x = box.x + box.width / 2 - dx / 2;
  const y = box.y + box.height / 2 - dy / 2;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y, id: 1 }],
  });
  for (let i = 1; i <= 5; i++)
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + (dx * i) / 5, y: y + (dy * i) / 5, id: 1 }],
    });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
}
for (const variant of [
  { locale: "tr", width: 390, height: 844 },
  { locale: "ar", width: 390, height: 844 },
  { locale: "tr", width: 320, height: 740 },
  { locale: "tr", width: 1440, height: 1000 },
]) {
  const result = { ...variant, passed: [], errors: [] };
  results.push(result);
  const context = await browser.newContext({
    viewport: { width: variant.width, height: variant.height },
    isMobile: variant.width < 700,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const videos = [];
  page.on("request", (request) => {
    if (/\.mp4(?:\?|$)/.test(request.url())) videos.push(request.url());
  });
  page.on("pageerror", (error) => result.errors.push(error.message));
  try {
    const response = await page.goto(
      base + (variant.locale === "tr" ? "/" : "/ar"),
      { waitUntil: "networkidle" },
    );
    assert.equal(response.status(), 200);
    assert.equal(await page.locator(".gallery-case-list > li").count(), 9);
    assert.equal(await page.locator(".gallery-case-list img").count(), 18);
    result.passed.push(
      "Nine case descriptions paired with eighteen real photos",
    );
    await page.locator(".gallery-thumbnails button").nth(2).click();
    const opener = page.locator(".comparison-photo").first();
    await opener.scrollIntoViewIfNeeded();
    const oldScroll = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => {
      document.body.style.overflow = "auto";
    });
    await opener.click();
    await expectPair(page, "03");
    assert.equal(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    assert.equal(
      await page
        .locator(".gallery-detail-pair")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    const box = await page.locator(".gallery-detail-dialog").boundingBox();
    assert.equal(Math.round(box.width), variant.width);
    assert.equal(Math.round(box.height), variant.height);
    const arrows = await page
      .locator(".gallery-detail-arrow")
      .evaluateAll((nodes) =>
        nodes.map((el) => ({
          w: el.getBoundingClientRect().width,
          h: el.getBoundingClientRect().height,
        })),
      );
    assert.ok(arrows.every((a) => a.w >= 44 && a.h >= 44));
    result.passed.push(
      "Full-screen pair, visible touch targets, reduced-motion and body lock",
    );
    await page.locator(".gallery-detail-next").click();
    await expectPair(page, "04");
    await page.locator(".gallery-detail-previous").click();
    await expectPair(page, "03");
    await page.keyboard.press(
      variant.locale === "ar" ? "ArrowLeft" : "ArrowRight",
    );
    await expectPair(page, "04");
    await page.keyboard.press(
      variant.locale === "ar" ? "ArrowRight" : "ArrowLeft",
    );
    await expectPair(page, "03");
    for (let i = 0; i < 9; i++)
      await page.locator(".gallery-detail-next").click();
    await expectPair(page, "03");
    result.passed.push(
      "Arrow buttons, locale-aware keyboard and nine-case wraparound stay paired",
    );
    if (variant.width < 700) {
      await swipe(page, cdp, variant.locale === "ar" ? 160 : -160);
      await expectPair(page, "04");
      await swipe(page, cdp, variant.locale === "ar" ? -160 : 160);
      await expectPair(page, "03");
      await swipe(page, cdp, 8, -110);
      await expectPair(page, "03");
      const touchAction = await page
        .locator(".gallery-detail-media")
        .evaluate((el) => getComputedStyle(el).touchAction);
      assert.ok(
        touchAction.includes("pan-y") && touchAction.includes("pinch-zoom"),
      );
      const pair = await page.locator(".gallery-detail-pair").boundingBox();
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [
          { x: pair.x + 50, y: pair.y + 100, id: 1 },
          { x: pair.x + 130, y: pair.y + 100, id: 2 },
        ],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          { x: pair.x + 30, y: pair.y + 100, id: 1 },
          { x: pair.x + 150, y: pair.y + 100, id: 2 },
        ],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await expectPair(page, "03");
      result.passed.push(
        "Real touch swipe, vertical gesture exclusion, multi-touch exclusion and zoom CSS",
      );
    }
    await page.keyboard.press("Escape");
    await page.waitForFunction(
      () =>
        !document.querySelector(".gallery-detail-dialog").open &&
        document.body.style.overflow === "auto",
    );
    assert.equal(
      await opener.evaluate((el) => el === document.activeElement),
      true,
    );
    assert.ok(
      Math.abs((await page.evaluate(() => window.scrollY)) - oldScroll) < 2,
    );
    result.passed.push(
      "Escape restores original body overflow, page position and opener focus",
    );
    await page.locator(".gallery-case-directory > summary").click();
    await page.locator("#uygulama-09 .text-link").click();
    await expectPair(page, "09");
    await page.locator(".gallery-detail-next").click();
    await expectPair(page, "01");
    await page.locator(".gallery-detail-previous").click();
    await expectPair(page, "09");
    await page.screenshot({
      path: path.join(
        artifacts,
        `${variant.locale}-${variant.width}-dialog.png`,
      ),
    });
    await page.locator(".dialog-close").click();
    await page.waitForFunction(
      () => !document.querySelector(".gallery-detail-dialog").open,
    );
    assert.equal(
      await page
        .locator("#uygulama-09 .text-link")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    assert.equal(videos.length, 0);
    assert.equal(result.errors.length, 0);
    result.passed.push(
      "Directory opens case09; boundary wrap; return focus; zero incidental video requests",
    );
  } catch (error) {
    result.errors.push(error.message);
    await page
      .screenshot({
        path: path.join(
          artifacts,
          `${variant.locale}-${variant.width}-failure.png`,
        ),
      })
      .catch(() => {});
  }
  console.log(
    `${variant.locale}-${variant.width}: ${result.passed.length} scenarios passed; ${result.errors.length} errors`,
  );
  await context.close();
}
const nojs = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const nojsPage = await nojs.newPage();
await nojsPage.goto(base, { waitUntil: "domcontentloaded" });
const nojsResult = { locale: "tr-no-js", passed: [], errors: [] };
results.push(nojsResult);
try {
  assert.equal(await nojsPage.locator(".gallery-case-list > li").count(), 9);
  assert.equal(await nojsPage.locator(".gallery-case-list img").count(), 18);
  await nojsPage.locator(".gallery-case-directory > summary").click();
  assert.equal(
    await nojsPage.locator(".gallery-case-directory").getAttribute("open"),
    "",
  );
  assert.ok(
    (await nojsPage.locator("#uygulama-03 p").textContent()).length > 40,
  );
  nojsResult.passed.push(
    "All nine descriptions/photos in server HTML; native directory works without JavaScript",
  );
} catch (error) {
  nojsResult.errors.push(error.message);
}
await nojs.close();
await browser.close();
await writeFile(
  path.join(artifacts, "results.json"),
  JSON.stringify(results, null, 2),
);
await writeFile(
  "tests/GALLERY-DETAIL-QA.md",
  `# Full-screen gallery QA\n\nBase: ${base}\nRun: ${new Date().toISOString()}\n\n${results.map((r) => `## ${r.locale}${r.width ? ` ${r.width}` : ""}\n\n${r.passed.map((p) => `- PASS: ${p}`).join("\n")}\n${r.errors.map((e) => `- FAIL: ${e}`).join("\n")}`).join("\n\n")}\n\nScreenshots: tests/artifacts/gallery-detail/\n`,
);
if (results.some((r) => r.errors.length)) process.exitCode = 1;
