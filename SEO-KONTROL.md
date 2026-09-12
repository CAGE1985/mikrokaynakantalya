# SEO, dil ve erişilebilirlik kontrolü

İnceleme tarihi: 12 Eylül 2026. İncelenen sürüm: yerel uygulama, `http://localhost:3012`. Kod incelemesi, beş dilin ham HTTP çıktısı ve ayrı bir geçici profilde çalışan headless Chrome ile kontrol edildi. Ürün dosyaları bu denetimde değiştirilmedi. Ana görev tarafından yapılan düzeltmeler ayrıca tekrar doğrulandı; ilk bulgular aşağıda geçmiş kayıt olarak korunuyor.

## Son doğrulama durumu

- **Video keşfi düzeltildi:** Planlama ve deneyim videoları gerçek `src` ve `preload="none"` ile ilk sunucu HTML'sinde var. Yeni tarayıcı oturumunda kullanıcı tıklamadan önce sıfır MP4 isteği gözlendi. Thumbnail bilgisi `VideoObject` içinde kalıcı URL ile sunuluyor.
- **Mobil menü ve dil seçici odağı düzeltildi:** Menü açılışında ilk bağlantı odaklanıyor; ana içerik, footer ve alt eylem şeridi inert oluyor. Son bağlantıdan Tab görünen header/menü döngüsünde kalıyor. Escape odağı ilgili açma düğmesine döndürüyor; kapatılınca inert durumu temizleniyor.
- **Arapça adres düzeltildi:** Görünür Latin adres `bdi dir="ltr"` içinde.
- **Video metadata eklendi ve kaynakla doğrulandı:** İki videonun kaynak yayın tarihleri, Türkçe dil bilgisi, kalıcı dosya/kapak URL'leri ve ortak Platin yayıncı kimliği Türkçe ve Arapça ham HTML'den kontrol edildi.
- **Kalan klavye bulgusu:** Video kapak düğmesi Enter ile etkinleştirildiğinde video oynuyor, fakat düğme kaldırıldığı için odak BODY'ye düşüyor. Oynatıcıya render sonrasında odak aktarılması önerildi; bu madde yazıldığı anda henüz tekrar doğrulanmış bir düzeltme yoktu.

## Doğrulanan temel yapı

| Kontrol | Sonuç |
| --- | --- |
| `/`, `/en`, `/ru`, `/de`, `/ar` | Beş sayfa HTTP 200 dönüyor. |
| Canonical | Her dil kendi `https://mikrokaynakantalya.com` adresini gösteriyor; eski Platin hizmet sayfasına canonical verilmemiş. |
| Dil alternatifleri | Her sayfanın HTML başlığında beş dilin tamamı, kendisi ve Türkçe köke yönelen `x-default` var. |
| Site haritası | Beş URL ve her URL altında beş karşılıklı dil alternatifi var. |
| Robots | Yerel normal sürümde `index, follow, max-image-preview:large`; robots.txt tüm siteye izin veriyor ve doğru site haritasını bildiriyor. |
| Türkçe ön ek | `/tr` isteği kök adrese yönleniyor. |
| Ana içerik | Her dilde tek H1 ve 26 SSS yanıtını barındıran 26 `details` öğesi ilk sunucu HTML'sinde bulunuyor. SSS metni tıklamaya bağlı olarak getirilmiyor. |
| JSON-LD | Beş dilde de aynı `HairSalon` kimliği: `https://www.platinantalya.com/#salon`. WebSite ortak; WebPage kimliği ve `inLanguage` dile göre değişiyor. |
| İşletme bilgileri | Platin Antalya adı, telefon, adres ve çalışma saatleri görünür iletişim bilgileriyle uyumlu. Sahte değerlendirme puanı, sabit fiyat veya tıbbi kuruluş işaretlemesi yok. |
| Dil seçici | Gerçek bağlantılar içeriyor; `/en#bakim` üzerinde açıldığında tüm dil seçenekleri `#bakim` bölümünü koruyor. |
| Arapça | `lang="ar"`, `dir="rtl"`, yerel Arapça font ve LTR telefon doğrulandı. 390×844 görünümünde yatay sayfa taşması görülmedi. Fotoğraflara ayna dönüşümü uygulanmıyor. |
| Medya dili | İki anlatımlı video kartının kapağında seçilen dilde “Video dili: Türkçe” bilgisi var. |
| Hesaplayıcı | Rusça ve Arapçada aracın Türkçe, İngilizce ve Almanca kullanılabildiği açıkça belirtiliyor. |

Yerel Next.js 16.3.5 belgelerindeki metadata söz dizimi de kontrol edildi. Önceden anılan `maxImagePreview` tipi sorunu güncel dosyada yok; kullanılan `'max-image-preview'` anahtarı doğru HTML çıktısı üretiyor.

Dil alternatiflerinin kendisini ve diğer dilleri karşılıklı listelemesi, Google'ın [yerelleştirilmiş sürümler rehberiyle](https://developers.google.com/search/docs/specialty/international/localized-versions) uyumlu. `HairSalon` kimliğinin tüm yerel sürümlerde ortak olması doğrulandı; bu denetim eski sitede aynı `@id` değerinin yayımlandığını ayrıca doğrulamış sayılmaz.

## İlk bulgular ve düzeltme kaydı

### P2 — Anlatımlı videolar yalnızca tıklama sonrasında HTML'ye ekleniyor

**Durum: İki anlatımlı video için düzeltildi ve tekrar doğrulandı.** Galerinin isteğe bağlı video modu bu düzeltmenin kapsamına dahil değil.

Konum: `src/components/video-card.tsx:10`; benzer seçim davranışı `src/components/gallery.tsx` içinde de var.

`playing` başlangıçta `false` olduğu için kartın ilk çıktısı bir kapak düğmesi. `video` ve gerçek medya `src` değeri, ancak kullanıcı tıklayınca DOM'a ekleniyor. Bu, oynatıcıyı Google'ın kullanıcı etkileşimi olmadan keşfetmesini zorlaştırır. Google'ın [video rehberi](https://developers.google.com/search/docs/appearance/video#help-google-find-your-videos) videonun kullanıcı eylemine bağlı yüklenmemesini öneriyor.

Öneri: Anlatımlı videonun `src` ve `poster` içeren gerçek `video` öğesini ilk render'da üretmek; `preload="none"` ile başlangıç veri yükünü düşük tutmak ve düğmeye basıldığında mevcut öğede oynatmayı başlatmak. Galeride seçilmeyen videolar için doğrulanmış açıklama ve doğrudan medya bağlantıları ya da uygun metadata ayrıca değerlendirilebilir. Uydurma yayın tarihi veya transkript eklenmemeli.

Bu hizmet sayfasında video yardımcı içeriktir. Ayrı izleme sayfası açılmadan video sonuçlarında görünme garantisi verilmemeli; kullanıcı tek sayfa istediği için yalnızca SEO adına ek sayfalar oluşturmak bu denetimin önerisi değildir.

### P2 — Mobil menüde odak arka plana kaçıyor; Escape odağı kaybediyor

**Durum: Düzeltildi ve mobil Chrome klavye testiyle tekrar doğrulandı.**

Konum: `src/components/header.tsx:24`, `:28`, `:42`.

390×844 Arapça sayfada menü açıldı. Son menü bağlantısına odaklanıp Tab basıldığında odak, kaplamanın arkasındaki `.mobile-actions` bağlantısına geçti. Menü içindeki bağlantıdan Escape basıldığında aktif öğe `BODY` oldu. Dil seçici içinden Escape basılması da odağı `BODY` öğesine düşürdü.

Öneri: Tam ekran menü açıkken odağı görünen menü ve kapatma kontrolü içinde yönetmek; örtülen ana içerik ile alt sabit düğmeleri etkileşime kapatmak. Menü kapatıldığında odağı açan düğmeye döndürmek. Dil seçici Escape ile kapatıldığında da dil düğmesine odak dönmeli. [WAI-ARIA modal iletişim örüntüsü](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) tam ekran kaplama için uygun odak davranışını açıklıyor.

### P3 — Arapça iletişim adresinin Latin yazım yönü ayrılmamış

**Durum: `bdi dir="ltr"` ile düzeltildi ve tekrar doğrulandı.**

Konum: `src/app/[locale]/page.tsx`, iletişim bölümündeki `<p>{address}</p>`.

Adres tamamen Latin karakterlerle tutuluyor, fakat paragraf `direction: rtl` miras alıyor. Telefon için doğru biçimde `dir="ltr"` uygulanmış. Adresin de `bdi dir="ltr"` veya eşdeğer yön izolasyonuyla verilmesi, özellikle satır kırılması ve `43B`/eğik çizgi çevresindeki noktalamanın tutarlı kalmasını sağlar. Bu kontrolde yanlış adres metni veya sayfa taşması görülmedi; bulgu yön izolasyonu eksikliğidir.

## Doğrulanan kaynak video tarihleri

Yerel kaynak metadata dosyalarındaki `upload_date` ve Unix `timestamp` alanları birbiriyle tutarlı. Bunlar kaynak Instagram yayın tarihleri; indirme veya yeni sitenin yayın tarihleri değil.

| Video | Kaynak kaydı | ISO 8601 yayın zamanı |
| --- | --- | --- |
| Planlama | `instagram-DO1XXtQCHuJ.kaynak.json`: `20250920`, `1758392440` | `2025-09-20T18:20:40+00:00` |
| Deneyim | `instagram-DPYM8X1iCyW.kaynak.json`: `20251004`, `1759561200` | `2025-10-04T07:00:00+00:00` |

Google'ın [VideoObject tanımına](https://developers.google.com/search/docs/appearance/structured-data/video#video-object) göre `uploadDate` videonun ilk yayın tarihini temsil ediyor. Güncel JSON-LD'de bu tarihler kullanılıyor. Video dili bütün dil sayfalarında `tr`; başlık ve kısa açıklama sayfa dilinde. Kaynak Instagram bağlantısı `sameAs` olarak verilmiş; doğrudan video dosyası `contentUrl` içinde. Tam konuşma doğrulanmadığı için uydurma `transcript` eklenmemiş.

## Medya ve yayın hazırlığı notları

- Çok dilli altyazı işi tamamlanmış sayılmamalı: oynatıcıda `track` öğesi veya doğrulanmış tam konuşma dökümü yok. İlk planlama videosunda gömülü Türkçe yazılar bulunduğu önceki kare incelemesinde doğrulanmıştı; bunlar dil seçimiyle değişmez. İkinci videonun tüm sesi bu denetimde dinlenmedi. Çeviri altyazılar ancak konuşma doğrulandıktan sonra hazırlanmalı.
- Başlangıçta görünen Türkçe video dili bilgisi, oynatıcı açılınca kapakla birlikte kayboluyor. Bilgiyi kartın dışında kalıcı tutmak, Türkçe bilmeyen ziyaretçinin oynatma sırasında da dil durumunu anlamasını sağlar.
- Galerinin ilk HTML'si dokuz sonuç küçük resmini içeriyor; diğer önce fotoğrafları seçimle değişiyor. Tüm çiftlerin özgün açıklamalarla keşfedilebilirliği, sonraki içerik/görsel SEO çalışmasına dahil edilebilir. Salt anahtar kelime eklemek için fotoğrafta olmayan bilgi yazılmamalı.
- Vercel ön izleme koşulu kodda mevcut; gerçek ön izleme alanında `noindex`, gerçek alan adında normal index ve canonical çıktısı dağıtım sonrası yeniden kontrol edilmeli. HTTP `Link` alternatifleri isteğin sunucusunu kullanıyor; asıl alan adı üzerinde HTML ve HTTP alternatifleri aynı alanı göstermeli.
- Domain bağlandıktan sonra HTTPS, tercih edilen `www`/çıplak alan yönlendirmesi, beş dilin 200 yanıtı ve site haritası yeniden doğrulanmalı. Bu denetim DNS veya canlı dağıtımın tamamlandığını göstermez.
- Uygulama kodunda randevu/hesaplama bağlantıları gerçek hedeflere gidiyor. Dönüşüm tıklamalarını ölçen bir olay katmanı bu inceleme anında görünmüyor; ölçüm kurulumu yapılmadan randevuya katkı sayısal olarak doğrulanmış kabul edilmemeli.
- Search Console kaydı, site haritası gönderimi, canlı URL incelemesi ve gerçek kullanıcı performansı ölçümü yayın sonrası adımlardır. Kimlik bilgileri veya hesap erişimleri bu denetimde incelenmedi.

## Kontrol yöntemi ve sınırlar

Ham HTTP yanıtları standart HTML ayrıştırıcısıyla incelendi. Yerel uygulamanın beş dili için canonical, hreflang, robots, JSON-LD, dil/yön ve SSS sayıları karşılaştırıldı. Ayrı headless Chrome oturumunda mobil klavye adımları ve dil seçici bağlantıları doğrulandı. Masaüstü ve mobil görsel tasarımın bütün ekran boyutlarında tam regresyon testi bu raporun kapsamı değil; ürün değişiklikleri ana uygulama görevi tarafından yürütülüyor.


## Son uygulama doğrulaması

Videoyu Enter ile başlatınca odağın BODY’ye düşmesi giderildi. Üretim tarayıcısında odak VIDEO öğesine geçiyor ve kontroller etkin. Küçük metin kontrastları koyulaştırıldı, etiketli galeri/sosyal gruplarına role=group eklendi. TR390 / AR390 / TR1280 için son axe koşusu sıfır otomatik ihlal buldu. Kaynak videoların sesi ve gömülü yazıları Türkçedir; ek VTT altyazıları bu sürümde yoktur.
