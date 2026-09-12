import {chromium} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

// Independent browser regression check. Run: node tests/mobile-qa.mjs
// QA_BASE_URL overrides the local server; no external forms are submitted.
const base = process.env.QA_BASE_URL || 'http://localhost:3012';
const focused = process.env.QA_MODE === 'focus';
const output = path.resolve('tests/artifacts/mobile-qa');
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true,channel:process.env.QA_BROWSER_CHANNEL||'chrome'});
const locales = ['tr','en','ru','de','ar'];
const localePath = locale => locale === 'tr' ? '/' : `/${locale}`;
const expectedLinks = {
  consultation:'https://www.platinantalya.com/booking-calendar/%C3%BCcretsiz-%C3%B6n-g%C3%B6r%C3%BC%C5%9Fme',
  booking:'https://www.platinantalya.com/service-page/mikro-kaynak-yeni-uygulama',
  calculator:'https://hesapla.platinantalya.com/',
  whatsapp:'https://wa.me/905558923770',
  phone:'tel:+905558923770',
  directions:'https://goo.gl/maps/zdufEy311bMaR2ZY7'
};
const results = [];
function check(result,name,condition,detail='') {
  result.checks.push({name,pass:Boolean(condition),detail});
  if (!condition) console.log(`FAIL ${result.label}: ${name} ${JSON.stringify(detail)}`);
}
async function dimensions(page) {
  return page.evaluate(() => {
    const width=document.documentElement.clientWidth;
    return {width,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,
      outliers:[...document.querySelectorAll('body *')].filter(el=>{
        const r=el.getBoundingClientRect(); const s=getComputedStyle(el);
        return r.width>0 && s.position!=='fixed' && (r.right>width+1||r.left<-1) && !el.closest('.gallery-thumbnails,.brand-strip,dialog');
      }).slice(0,8).map(el=>({tag:el.tagName,class:el.className,left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}))};
  });
}
for (const width of [390,320]) {
  for (const locale of locales) {
    const result={label:`${locale}-${width}`,checks:[],errors:[]};
    results.push(result);
    const context=await browser.newContext({viewport:{width,height:width===390?844:740},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const page=await context.newPage();
    page.setDefaultTimeout(10000);
    const videos=[];
    page.on('request',req=>{if(/\.(mp4|mov)(?:\?|$)/i.test(req.url())) videos.push(req.url());});
    page.on('pageerror',error=>result.errors.push(error.message));
    try {
      const response=await page.goto(base+localePath(locale),{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      check(result,'page status',response?.status()===200,response?.status());
      check(result,'html locale',await page.locator('html').getAttribute('lang')===locale);
      check(result,'html direction',await page.locator('html').getAttribute('dir')===(locale==='ar'?'rtl':'ltr'));
      const d=await dimensions(page);
      check(result,'no document overflow',d.scrollWidth<=width+1&&d.bodyWidth<=width+1,d);
      check(result,'no eager video download',videos.length===0,videos);
      check(result,'26 native FAQ details',await page.locator('.faq-group details').count()===26);
      check(result,'5 FAQ groups',await page.locator('.faq-group').count()===5);
      const empty=await page.locator('.faq-group details').evaluateAll(nodes=>nodes.filter(n=>!n.querySelector('summary')?.textContent?.trim()||!n.querySelector('.faq-answer')?.textContent?.trim()).length);
      check(result,'all FAQ content present',empty===0,empty);
      for(const [name,href] of Object.entries(expectedLinks)) check(result,`${name} link`,await page.locator(`a[href="${href}"]`).count()>0);
      await page.screenshot({path:path.join(output,`${result.label}-hero.png`)});

      await page.locator('.menu-toggle').click();
      check(result,'mobile menu opens',await page.locator('#mobile-menu').isVisible());
      check(result,'menu locks body scrolling',await page.evaluate(()=>getComputedStyle(document.body).overflow)==='hidden');
      await page.locator('#mobile-menu a').first().focus();
      await page.keyboard.press('Escape');
      check(result,'Escape closes menu',await page.locator('#mobile-menu').count()===0);
      check(result,'Escape restores menu trigger focus',await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),await page.evaluate(()=>({tag:document.activeElement?.tagName,class:document.activeElement?.className})));
      check(result,'Escape unlocks body scrolling',await page.evaluate(()=>getComputedStyle(document.body).overflow)!=='hidden');
      if(focused) {
        await page.locator('.menu-toggle').click();
        await page.locator('#mobile-menu a').last().focus();
        await page.keyboard.press('Tab');
        check(result,'menu Tab remains in header or menu',await page.evaluate(()=>!!document.activeElement.closest('.site-header,#mobile-menu')));
        check(result,'background content is inert while menu open',await page.locator('main').evaluate(el=>el.inert));
        await page.keyboard.press('Escape');
        await page.locator('.language-toggle').click();
        await page.locator('#language-list a').first().focus();
        await page.keyboard.press('Escape');
        check(result,'language Escape restores trigger focus',await page.locator('.language-toggle').evaluate(el=>el===document.activeElement));
        await page.locator('#donusumler').scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(output,`${result.label}-gallery.png`)});
        await page.locator('#sorular').scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(output,`${result.label}-faq.png`)});
        check(result,'no video download after scrolling',videos.length===0,videos);
        const afterScroll=await dimensions(page);
        check(result,'no overflow after scrolling',afterScroll.scrollWidth<=width+1&&afterScroll.bodyWidth<=width+1,afterScroll);
        check(result,'no runtime errors',result.errors.length===0,result.errors);
        await context.close();
        console.log(`${result.label}: ${result.checks.filter(c=>c.pass).length}/${result.checks.length} passed`);
        continue;
      }
      await page.locator('.menu-toggle').click();
      await page.locator('#mobile-menu a[href="#fiyat"]').click();
      check(result,'anchor closes menu',await page.locator('#mobile-menu').count()===0);
      check(result,'anchor changes hash',new URL(page.url()).hash==='#fiyat',page.url());
      await page.waitForFunction(()=>document.querySelector('#fiyat').getBoundingClientRect().top<250);
      const anchor=await page.locator('#fiyat').boundingBox();
      const header=await page.locator('.site-header').boundingBox();
      check(result,'anchor heading below fixed header',anchor.y>=header.height-1&&anchor.y<250,{anchorY:anchor.y,headerHeight:header.height});
      await page.keyboard.press('Tab');
      result.anchorTabFocus=await page.evaluate(()=>({tag:document.activeElement?.tagName,class:document.activeElement?.className,text:document.activeElement?.textContent?.slice(0,100)}));

      const indices=width===390&&locale==='tr'?Array.from({length:26},(_,i)=>i):[0,25];
      for (const index of indices) {
        const detail=page.locator('.faq-group details').nth(index);
        await detail.locator('summary').click();
        check(result,`FAQ ${index+1} opens natively`,await detail.getAttribute('open')!==null);
        await detail.locator('summary').press('Enter');
        check(result,`FAQ ${index+1} closes with keyboard`,await detail.getAttribute('open')===null);
      }

      for (const number of ['03','09']) {
        await page.locator('.gallery-thumbnails button').nth(Number(number)-1).click();
        check(result,`gallery ${number} active`,(await page.locator('.case-label b').textContent())===number);
        for(const [index,kind] of ['once','sonra'].entries()) {
          const src=await page.locator('.gallery-stage img').nth(index).getAttribute('src');
          check(result,`gallery ${number} ${kind} image`,decodeURIComponent(src).includes(`/media/photos/uygulama-${number}-${kind}.jpg`),src);
        }
        const trigger=page.locator('.comparison-photo').first();
        await trigger.click();
        check(result,`gallery ${number} modal opens`,await page.locator('.gallery-dialog').getAttribute('open')!==null);
        check(result,`gallery ${number} modal locks scroll`,await page.evaluate(()=>getComputedStyle(document.body).overflow)==='hidden');
        await page.keyboard.press('Escape');
        check(result,`gallery ${number} modal closes`,await page.locator('.gallery-dialog').getAttribute('open')===null);
        // Native dialog close is dispatched asynchronously after cancel/Escape.
        await page.waitForFunction(()=>getComputedStyle(document.body).overflow!=='hidden',{},{timeout:1500}).catch(()=>{});
        check(result,`gallery ${number} modal restores scroll`,await page.evaluate(()=>getComputedStyle(document.body).overflow)!=='hidden');
        check(result,`gallery ${number} modal restores focus`,await trigger.evaluate(el=>el===document.activeElement));
        if(number==='03') check(result,'still no videos before first play',videos.length===0,videos);
        await page.locator('.segmented button').nth(1).click();
        const video=page.locator('.transformation-video');
        check(result,`gallery ${number} video source`,await video.getAttribute('src')===`/media/videos/uygulama-${number}.mp4`);
        await page.waitForFunction(()=>document.querySelector('.transformation-video')?.readyState>=1);
        const state=await video.evaluate(el=>({width:el.videoWidth,height:el.videoHeight,duration:el.duration,error:el.error?.code}));
        check(result,`gallery ${number} video loads`,state.width>0&&!state.error,state);
        await page.locator('.segmented button').first().click();
      }
      const galleryD=await dimensions(page);
      check(result,'no overflow after gallery use',galleryD.scrollWidth<=width+1&&galleryD.bodyWidth<=width+1,galleryD);
      if(width===390) {
        await page.locator('#donusumler').scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(output,`${result.label}-gallery.png`)});
        await page.locator('#sorular').scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(output,`${result.label}-faq.png`)});
      }
      await page.goto(base+localePath(locale)+'#fiyat',{waitUntil:'networkidle'});
      await page.locator('.language-toggle').click();
      for(const other of locales) check(result,`locale link ${other} preserves section`,await page.locator(`#language-list a[lang="${other}"]`).getAttribute('href')===localePath(other)+'#fiyat');
      const next=locales[(locales.indexOf(locale)+1)%locales.length];
      await page.locator(`#language-list a[lang="${next}"]`).click();
      await page.waitForURL(url=>url.pathname===localePath(next)&&url.hash==='#fiyat');
      check(result,'locale switching navigates',await page.locator('html').getAttribute('lang')===next);
      check(result,'no runtime errors',result.errors.length===0,result.errors);
    } catch(error) {
      check(result,'test flow completes',false,error.message);
      await page.screenshot({path:path.join(output,`${result.label}-failure.png`)}).catch(()=>{});
    }
    await context.close();
    console.log(`${result.label}: ${result.checks.filter(c=>c.pass).length}/${result.checks.length} passed`);
  }
}
const desktop=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const desktopPage=await desktop.newPage();
await desktopPage.goto(base,{waitUntil:'networkidle'});
await desktopPage.screenshot({path:path.join(output,'tr-desktop-hero.png')});
await desktopPage.locator('#donusumler').scrollIntoViewIfNeeded();
await desktopPage.screenshot({path:path.join(output,'tr-desktop-gallery.png')});
await desktop.close();
await browser.close();
const failures=results.flatMap(r=>r.checks.filter(c=>!c.pass).map(c=>({variant:r.label,...c})));
await writeFile(path.join(output,focused?'results-focus.json':'results.json'),JSON.stringify({base,runAt:new Date().toISOString(),focused,results,failures},null,2));
await writeFile(focused?'tests/MOBILE-QA-RECHECK.md':'tests/MOBILE-QA.md',`# Independent mobile browser QA${focused?' — focus and initial-state recheck':''}\n\nRun: ${new Date().toISOString()}\nBase: ${base}\nCommand: \`${focused?'QA_MODE=focus ':''}node tests/mobile-qa.mjs\`\n\n${results.map(r=>`- ${r.label}: ${r.checks.filter(c=>c.pass).length}/${r.checks.length} checks passed`).join('\n')}\n\n## Failed checks\n\n${failures.length?failures.map(f=>`- **${f.variant}: ${f.name}** — ${JSON.stringify(f.detail)}`).join('\n'):'None.'}\n\nScreenshots and full output: \`tests/artifacts/mobile-qa/\`. External links were inspected, not submitted.\n`);
console.log(`Completed: ${failures.length} failed checks. Report: ${focused?'tests/MOBILE-QA-RECHECK.md':'tests/MOBILE-QA.md'}`);
process.exitCode=failures.length?1:0;
