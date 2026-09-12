# Mikro Kaynak Antalya

Platin Antalya için mobil öncelikli, beş dilli ve tek sayfalı mikro kaynak sitesi. Next.js App Router, React, TypeScript, next-intl; yerel Inter/Noto Sans Arabic fontları. CMS veya ayrı veri tabanı yok.

## Çalıştırma

Node.js 24 LTS ve npm kullanılır.

```sh
npm ci
npm run dev -- --port 3012
```

Üretim:

```sh
npm run check
npm run start -- --port 3013
```

Dil adresleri: `/` Türkçe, `/en` İngilizce, `/ru` Rusça, `/de` Almanca, `/ar` Arapça. `/tr` köke yönlenir. Dil değişimi mevcut bölüm bağlantısını korur. Arapça RTL; telefon ve Latin adres LTR'dir.

## İçerik ve medya

- `src/content/tr.ts`: Türkçe ana içerik; diğer dört dosya eşdeğer çeviriler. Her dilde 26 SSS bulunur.
- `src/lib/site.ts`: doğrulanmış randevu, ücretsiz ön görüşme, hesaplayıcı, telefon, harita ve sosyal bağlantıları.
- `src/app/[locale]/page.tsx`: sunucuda üretilen sayfa ve yapılandırılmış veri.
- `src/app/globals.css`: responsive tasarım, marka renkleri ve hareket tercihleri.
- `public/media/photos`: 9 uygulama × öncesi/sonrası. Dosya çiftleri aynı uygulama numarasıyla eşleşir.
- `public/media/videos`: 9 dönüşüm + 2 anlatım/deneyim videosu. Web kopyaları H.264/AAC, 720×1280, 30 fps, faststart.
- `public/media/posters`: iki videonun gerçek kapak kareleri.
- `public/media/logo.png`: kullanıcının verdiği, değiştirilmemiş Platin Antalya logosu.
- Kaynak dosyalar `GELEN-GORSELLER` ve `GELEN-VIDEOLAR` içinde yerel olarak korunur; büyük orijinaller GitHub/Vercel'e gönderilmez. `scripts/prepare-media.py` web kopyalarını tekrar oluşturur; ayrıntılar `MEDYA-HAZIRLIK.md`.

Öncesi/sonrası etiketleri fotoğraflara gömülmez; arayüzde beş dilde gösterilir. Gerçek sonuç fotoğraflarının saç görünümü değiştirilmez. Örnek uygulamaların gerçek gramaj, santimetre, müşteri adı veya yorumu verilmediği için üretilmez.

Anlatımlı iki video Türkçedir ve orijinal gömülü Türkçe yazıları içerir. Başlık/açıklamalar beş dilde mevcuttur; çevrilmiş ses veya altyazı varmış gibi gösterilmez. Bu sürümde ek VTT altyazı dosyası bulunmaz. Videolar ilk HTML'de keşfedilebilir, `preload="none"` ile oynatma talebine kadar indirilmez. Dönüşüm videosu yalnız seçildiğinde yüklenir.

## SEO ve ölçüm

Beş sayfa derleme sırasında statik HTML olarak hazırlanır. Yerelleştirilmiş başlık/açıklama, self-canonical, karşılıklı hreflang, x-default, sitemap ve robots bulunur. HairSalon/WebSite/WebPage ve iki gerçek VideoObject aynı işletme kimliğine bağlanır. Tüm 26 SSS cevabı ilk HTML'dedir. Yapay puan, sahte yorum, FAQ zengin sonuç veya sıralama garantisi kullanılmaz.

`VERCEL_ENV=preview` için indeksleme kapatılır. Production dağıtımı kendi üretim ayarlarıyla derlenmelidir; preview derlemesini doğrudan promote etmek noindex'i taşıyabilir. Ana hedef domain `https://mikrokaynakantalya.com` olarak tanımlıdır. Alan adı Vercel'e bağlandıktan sonra www sürümü ana domaine yönlenmelidir.

Search Console doğrulama, site haritası gönderimi ve gerçek dönüşüm analitiği henüz yapılmadı. Bu sürümde GA/GTM kimliği, yeni form veya çerezle ölçüm eklenmedi. Randevu ve hesaplama mevcut Platin Antalya uygulamalarında tamamlanır; dış bağlantı tıklaması tamamlanmış rezervasyon olarak sayılmaz.

## Kontroller

```sh
npm run check
node tests/mobile-qa.mjs
QA_MODE=focus node tests/mobile-qa.mjs
```

Tarayıcı testleri Playwright Chromium gerektirir. Gerekirse `npx playwright install chromium` kullanın. Test varsayılanı `http://localhost:3012`; `QA_BASE_URL` ile değiştirilebilir. Testler gerçek randevu oluşturmaz ve dış sistemlere kişisel bilgi göndermez. Sonuçlar `tests/MOBILE-QA.md` ve `tests/MOBILE-QA-RECHECK.md` dosyalarında.

## GitHub ve Vercel

Bu proje kendi bağımsız Git deposudur. `codex/mikro-kaynak-site` ilk uygulama dalıdır. GitHub deposu özel olarak oluşturulur; yalnız web dosyaları ve ilgili proje belgeleri sürümlenir.

Yayın hedefi Vercel'dir. Mevcut bağlı `muratproje` ekibinin planı 12 Eylül 2026 kontrolünde Hobby idi. [Vercel Hobby koşulları](https://vercel.com/docs/plans/hobby) ticari kullanıma izin vermediği için işletme yayını öncesi uygun ücretli plan/ekip gerekir. Onaysız abonelik veya yükseltme yapılmaz.

Uygun Vercel ekibi hazır olduğunda:

```sh
vercel link --project mikrokaynakantalya --scope EKIP --yes
vercel deploy --prod --scope EKIP
```

Ardından GitHub bağlantısı, ana domain/WWW yönlendirmesi ve Search Console doğrulaması tamamlanır. Canlı dağıtım, medya, 5 dil, robots/canonical ve randevu hedefleri tekrar kontrol edilir.
