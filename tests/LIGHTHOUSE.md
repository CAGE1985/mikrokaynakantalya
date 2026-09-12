# Mobil Lighthouse üretim ölçümü

Tarih: 2026-09-12T20:20:04.418Z. Lighthouse 13.4.1.
Yerel üretim sunucusu: http://localhost:3013. Varsayılan mobil/yavaş bağlantı ve CPU simülasyonu.

| Kategori | Sonuç |
|---|---:|
| performance | 91 / 100 |
| accessibility | 100 / 100 |
| best-practices | 100 / 100 |
| seo | 100 / 100 |

| Ölçüm | Sonuç |
|---|---:|
| First Contentful Paint | 0.9 s |
| Largest Contentful Paint | 3.5 s |
| Total Blocking Time | 10 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1.0 s |

İlk koşuda performans 82, LCP 4.8 s idi. Font alt kümeleri ve ilk fotoğrafın yüksek yükleme önceliği ile yukarıdaki sonuca ulaşıldı. Dil bağlantılarının tek canonical domain üzerinden üretilmesi ve dil düğmesinin erişilebilir adı düzeltildi.

Bu, tek bir yerel laboratuvar koşusudur; gerçek kullanıcı Core Web Vitals veya Google sıralama puanı değildir. LCP 3,5 sn ile iyileştirmeye açıktır; canlı domain/CDN üzerinde ayrıca ölçülmelidir. CLS 0 olarak ölçüldü. SEO 100, yalnızca Lighthouse teknik denetimidir.

Ham raporlar: tests/artifacts/lighthouse-mobile.json ve lighthouse-mobile-final.json (yerel; Git'e dahil değil).

Komut:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npx lighthouse http://localhost:3013 --output=json --output-path=tests/artifacts/lighthouse-mobile-final.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags='--headless --no-sandbox' --quiet
```
