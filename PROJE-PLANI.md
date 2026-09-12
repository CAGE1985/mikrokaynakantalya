# Mikro Kaynak Antalya — proje planı

Tarih: 12 Eylül 2026. Durum: kullanıcının başlama onayıyla ilk uygulama kodlandı; mobil ve beş dil kontrolleri yapıldı. Aşağıdaki ilk taslak kararlarının güncel karşılığı README.md ve uygulama notundadır.

## Kesinleşen kararlar

- Alan adı hedefi: `mikrokaynakantalya.com`.
- Konu: yalnızca mikro kaynak; Platin Antalya'nın bu hizmetine odaklanan site.
- İlk yayında Türkçe, İngilizce, Rusça, Almanca ve Arapça birlikte olacak.
- Kurumsal renkler mevcut PRO BOND sitesindeki Platin Antalya kimliğinden alınacak.
- Kullanıcının belirlediği logo `/Users/muratkocatas/Desktop/platinantalyalogo.png`; proje kopyası `GELEN-GORSELLER/marka/platin-antalya-logo.png`. Yatay bronz Platin Antalya/1973 logosu header ve footer'da oranı korunarak kullanılacak. Başka bir logo veya yazıyla yeniden oluşturulmuş marka işareti kullanılmayacak.
- Kullanıcının sağlayacağı gerçek önce–sonra görselleri kullanılacak.
- İlk sürümde yönetim paneli olmayacak. İçerik ve fotoğraf güncellemeleri birlikte yapılacak.
- Her dilde tek uzun sayfa olacak. Menü bağlantıları sayfadaki ilgili bölüme kaydıracak.
- Plan ve tasarım yönü konuşulduktan sonra kodlama, GitHub ve Vercel aşamalarına geçilecek.
- SEO ve GEO yaklaşımında kullanıcının paylaştığı Google rehberi esas alınacak.
- İşletme ve hizmet bilgileri için kullanıcının kendi [Platin Antalya mikro kaynak sayfası](https://www.platinantalya.com/mikro-kaynak-antalya) ana içerik kaynağı olacak.
- Sabit veya başlangıç fiyatı yayımlanmayacak. Ön fiyat tahmini mevcut `hesapla.platinantalya.com` aracına, kesin fiyat ve uygunluk ücretsiz ön görüşmeye bağlanacak.
- Ücretsiz ön görüşme ve online randevu için Platin Antalya'nın mevcut rezervasyon sistemi kullanılacak.
- Kullanıcının açıklamasına göre hesaplayıcının mevcut bir adedi 0,80 g tutamı ifade ediyor. Uygulamada 0,20 / 0,40 / 0,60 / 0,80 g gibi farklı tutam ağırlıkları saçın bölgesel özelliklerine göre kullanılabiliyor. Bunlar salonun bildirdiği uygulama örnekleri; evrensel güvenlik sınırları veya sabit bölge reçeteleri değildir.
- Ana hizmet adı “mikro kaynak” kalacak. “0,80 g = keratin, 0,40 g = mikro” şeklinde birbirini dışlayan teknik sınıflandırma yapılmayacak. Bağlantı malzemesi, kaynak saç tutamının gramajı ve uygulama bağlantı adedi ayrı anlatılacak.

Sayfa kapsamı kesinleşti: Türkçe, İngilizce, Rusça, Almanca ve Arapça için birer dil sürümü; her sürümde aynı tek sayfa akışı. Ayrı fiyat, bakım veya galeri sayfaları planlanmıyor.

## Referans site incelemesi

[PRO BOND](https://www.probondantalya.com/) masaüstünde ve HTML/CSS kaynakları üzerinden incelendi. Bu çalışma kapsamlı performans veya Search Console denetimi değildir.

Güçlü tarafları: tutarlı bronz/krem kimlik, belirgin Platin logosu, teknik uygulama görselleri, soru-cevap içeriği, telefon ve WhatsApp erişimi.

Yeni site için tasarım değerlendirmesi: ilk ekran metin ağırlıklı ve koyu görsel katmanı baskın. Mikro kaynak hizmetinde bitmiş sonuçların daha erken gösterilmesi, kısa açıklamalar ve açık zeminler ziyaretçinin değerlendirmesini kolaylaştırabilir. Mevcut metinleri mikro kaynak adıyla yeniden kullanmak yerine hizmete özel içerik hazırlanmalı.

Teknik gözlem: alınan ilk HTML yanıtında boş bir `root` alanı ve JavaScript paketi var; ana sayfa içeriği tarayıcıda oluşturuluyor. İlk kaynakta açıklama genel, canonical ve JSON-LD görünmüyor. Bunların JavaScript ile sonradan eklenmediği ayrıca doğrulanmadığı için tüm sitede bulunmadıkları iddia edilmiyor. Yeni uygulamada önemli metinler ve meta bilgiler ilk HTML yanıtında yer alacak. Google JavaScript işleyebilir; önerinin amacı tarama bağımlılığını azaltmak.

Ek inceleme: kullanıcının Platin Antalya hizmet sayfası, açılır 15 SSS yanıtı dahil okundu. Ücretsiz ön görüşme takvimi, güncel mikro kaynak yeni uygulama hizmet sayfası ve hesaplama aracının iletişim formuna kadar yedi adımı incelendi. Doğrulanmış bağlantılar ve dönüşüm akışı [KAYNAK-VE-DONUSUM-PLANI.md](KAYNAK-VE-DONUSUM-PLANI.md) dosyasında kayıtlıdır.

Bu içerikten alınacak iş bilgileri: kişiye özel analiz, yazılı uygulama ve fiyat planı, Limited Plus / Limited Edition / Silver Plus saç grupları, uygulama sonrası destek ve mevcut gerçek sonuçlar. “1973’ten gelen Platin deneyimi” ifadesi marka geçmişi bağlamında kullanılacak; Antalya salonunun açılış yılı veya tek uygulayıcının deneyimi gibi sunulmayacak.

## Görsel yön

Öneri: açık krem ağırlıklı, fotoğrafları büyük kullanan, bronz vurgulu, sakin ve seçkin bir salon kimliği. Kurumsallık; okunaklı tipografi, düzenli boşluklar, tutarlı bileşenler ve gerçek işletme bilgileriyle sağlanacak.

Referans CSS dosyasında doğrulanan renkler:

| Rol | Renk | Kullanım |
| --- | --- | --- |
| Ana bronz | `#89664D` | Ana düğmeler ve marka vurguları |
| Krem | `#F5EDE3` | Ana zemin |
| Koyu kahve | `#1E1A17` | Metin ve koyu bölümler |
| Altın | `#C8A24F` | İnce çizgiler ve sınırlı dekoratif detay |
| Beyaz | `#FFFFFF` | Fotoğraf çevresi ve bazı içerik yüzeyleri |

Kullanıcının Apple benzeri okunaklılık ve premium tipografi isteğiyle yeni font önerisi Inter ve Arapçada Noto Sans Arabic olarak güncellendi. Montserrat eski sitenin referans fontudur; yeni sitede zorunlu değildir. Kesin font seçimi beş dilde gerçek metinle değerlendirilecek. Altın rengi küçük metinlerde kullanılmayacak; gerçek renk eşleşmelerinin okunabilirliği test edilecek.

Header, hero, 14 içerik bölümünün kompozisyonu, SSS grupları, footer, animasyon ve fotoğraf ihtiyacı [TASARIM-YONU.md](TASARIM-YONU.md) dosyasında ayrıntılandırıldı. Yön: yüksek bütçeli marka algısı, büyük gerçek fotoğraflar, geniş boşluklar, güçlü tipografik hiyerarşi ve ölçülü etkileşim. Sohbette gösterilecek kısa yerleşim taslağı üretim sitesi değildir.

İlk ekran taslağı:

- Üstte Platin Antalya logosu, kısa menü, TR / EN / RU / DE / AR dil seçici ve iletişim düğmesi. Dar ekranlarda beş dil tek bir açılır dil menüsünde gösterilecek.
- Ana başlık: “Antalya’da Mikro Kaynak”.
- Yardımcı ifade önerisi: “Saçınızla uyumlu uzunluk. Size özel dolgunluk.”
- Kısa açıklamada kişiye özel uzunluk, yoğunluk ve uygulama planlaması; nihai ifadeler salon bilgileriyle doğrulanacak.
- Birincil eylem: “Ücretsiz Ön Görüşme”. İkincil eylem: “Kaynak Fiyatını Hesapla”. “Önce–Sonra Sonuçları” sayfa içi metin bağlantısı olarak sunulabilecek.
- Masaüstünde metin yanında güçlü bir gerçek sonuç fotoğrafı; mobilde başlık, görsel ve iletişim eylemi kısa bir akışta.

Hareket: ölçülü bölüm geçişleri, fotoğraf büyütme, uygun fotoğraf çiftlerinde önce–sonra sürgüsü ve dokunmatik galeri. Otomatik dönen ana ekran, yoğun paralaks ve sürekli animasyon önerilmiyor. Hareketi azaltma tercihi desteklenecek. Video tıklanınca yüklenecek.

## Ana sayfa akışı

| Sıra | Bölüm | Ziyaretçinin ihtiyacı |
| --- | --- | --- |
| 1 | Ana tanıtım | Hizmet, konum ve sağlayıcıyı hemen anlamak |
| 2 | Seçilmiş önce–sonra uygulamaları | Gerçek sonuçları görmek |
| 3 | Mikro kaynak nedir? | Yöntemi ve hizmet kapsamını anlamak |
| 4 | Doğal sonucun ayrıntıları | Bağlantı, yerleşim, renk ve dokuyu yakın çekimlerle görmek |
| 5 | Kime uygun olabilir? | Kendi beklentisini değerlendirmek ve analizin neden gerekli olduğunu öğrenmek |
| 6 | Kaynak saç seçenekleri | Üç saç grubunu kullanım beklentileri açısından karşılaştırmak |
| 7 | Ön görüşmeden uygulamaya | Analiz, yazılı teklif, uygulama ve kontrol adımlarını öğrenmek |
| 8 | Uzunluk, adet ve gramaj | Kişisel planı oluşturan farklı ölçüleri anlamak |
| 9 | Fiyatı belirleyen etkenler ve hesaplayıcı | Ön tahmini mevcut araçtan almak, kesin fiyat için görüşme seçmek |
| 10 | Bakım ve günlük kullanım | Tarama, yıkama, şekillendirme ve tatil kullanımını öğrenmek |
| 11 | Kontrol, yenileme ve söküm | Uygulama sonrası desteği ve tekrar kullanım değerlendirmesini anlamak |
| 12 | Uygulayıcı ekip, salon ve gerçek yorumlar | Hizmeti veren kişiyi, işletmeyi ve müşteri deneyimlerini görmek |
| 13 | Konulara ayrılmış SSS | Uygunluk, görünüm, süre, bakım ve fiyat sorularını çözmek |
| 14 | Ücretsiz ön görüşme, randevu ve konum | İhtiyacına uygun sonraki adımı seçmek |

Uzunluk/adet/gramaj bölümü, kullanıcının açıkladığı bölgesel uygulama yaklaşımının ana anlatım alanı olacak. Başlık önerisi: “Saçınızın Her Bölgesine Özel Planlama”. Standart bir baş şemasında her bölgeye sabit gramaj atanmayacak; görsel kullanılacaksa kişiye özel planın nasıl değerlendirildiğini açıklayan temsili bir anlatım olacak.

Mobilde sayfa içeriğini örtmeyen sabit alt alanda “Fiyat Hesapla” ve “Ücretsiz Ön Görüşme” bulunacak. Online randevu, telefon ve WhatsApp ilgili bölümlerde erişilebilir kalacak. Menüde bölüm bağlantıları, randevu düğmelerinde mevcut Platin Antalya sistemine giden gerçek bağlantılar kullanılacak. Masaüstünde aynı eylemi tekrarlayan fazla sayıda yüzen düğme kullanılmayacak.

## Sayfa ve dil mimarisi

Karar: her dilde tek güçlü sayfa. Menü, gerçek bağlantılar ve kalıcı bölüm kimlikleri kullanarak ilgili bölüme kaydıracak. Bölüm adresleri paylaşılabilecek, doğrudan açılabilecek ve tarayıcının geri/ileri gezinmesiyle uyumlu çalışacak.

| Türkçe örnek bölüm adresi | Amaç |
| --- | --- |
| `/` | Antalya mikro kaynak ana hizmet sayfası |
| `/#mikro-kaynak` | Hizmetin tanımı ve uygunluk bilgileri |
| `/#once-sonra` | Gerçek uygulamalar ve açıklamaları |
| `/#uygulama` | Planlama ve uygulama süreci |
| `/#sac-secenekleri` | Limited Plus, Limited Edition ve Silver Plus |
| `/#fiyat` | Fiyatlandırma mantığı ve mevcut hesaplama aracına geçiş |
| `/#bakim` | Bakım, kullanım ve çıkarma rehberi |
| `/#sss` | Mikro kaynağa özel sık sorulan sorular |
| `/#iletisim` | Salon, çalışma saatleri ve ulaşım |

Menü sade kalacak; fiyat ve bakım gibi yakın konular gerektiğinde tek menü grubu altında sunulabilecek. Mobil menü bir bölüm seçildiğinde kapanacak. Kaydırmada sabit menünün yüksekliği hesaba katılacak; aktif bölüm göstergesi bulunacak. Hareketi azaltma tercihinde yumuşak kaydırma devre dışı kalacak. Bölüm açıklamaları, galeri açıklamaları ve SSS yanıtları ilk HTML'de bulunacak; görünür hâle gelmeleri için tıklanması gerekse bile içerik sonradan indirilmek zorunda kalmayacak.

SEO her dilde tek sayfa üzerinden planlanacak: bir ana başlık, anlamlı alt başlıklar ve tüm hizmet kapsamını açıklayan title/description. Bölüm kimlikleri ayrı indeks sayfaları oluşturmaz. Bu, kullanıcının tercih ettiği tasarımın doğal kapsamıdır; mikro kaynak tanımı, fiyat, sonuçlar ve bakım aynı sayfada dengeli işlenecek.

Türkçe kök dizinde, İngilizce `/en`, Rusça `/ru`, Almanca `/de`, Arapça `/ar` altında sunulacak. Dil değiştirildiğinde mümkün olduğunda aynı bölümün diğer dildeki karşılığı açılacak. Görünür metinler, başlıklar, açıklamalar, görsel alternatif metinleri ve iletişim düğmeleri çevrilecek; tüm çeviriler doğal dil ve hizmet terminolojisi açısından gözden geçirilecek.

Arapça sürüm `lang="ar"` ve `dir="rtl"` ile sağdan sola çalışacak. Menü, mobil menü, metin hizaları ve yön bildiren işaretler buna uyarlanacak. Telefon numarası, URL ve Latin marka adlarında gerekli soldan sağa metin yalıtımı kullanılacak. Önce–sonra etiketleri ve sürgü yönü ayrıca test edilecek; fotoğraflar yatay çevrilmeyecek. CSS mantıksal yön özellikleriyle tek bileşen sistemi kullanılacak. Almanca uzun sözcükler ve Rusça metin genişlemeleri mobil yerleşimde kontrol edilecek.

Her dil kendi canonical adresini kullanacak; karşılıklı `hreflang` ilişkileri ve uygun `x-default` tanımı olacak. Dil seçimi gerçek bağlantılarla çalışacak; yalnızca tarayıcı içinde metin değiştiren bir sistem kullanılmayacak. IP adresine dayalı zorunlu dil yönlendirmesi yapılmayacak. [Google çok dilli sayfa rehberi](https://developers.google.com/search/docs/specialty/international/localized-versions)

## SEO, yerel görünürlük ve GEO

Ana arama niyeti: Antalya’da mikro kaynak hizmeti arayan ziyaretçinin sonuç, fiyat, uygulayıcı, bakım ve randevu sorularına cevap vermek. “Antalya mikro kaynak”, “mikro kaynak fiyatları Antalya”, “hair extensions Antalya” gibi ifadeler başlangıç araştırma adaylarıdır; arama hacimleri ölçülmüş değildir. Rusça, Almanca ve Arapça sorgular ile hizmet terminolojisi ayrıca doğrulanacak.

Teknik kapsam: sunucudan gelen içerik, anlamlı başlık düzeni, her dil için title/description, indekslenebilir bağlantılar, canonical, sitemap, robots, paylaşım görselleri, doğru durum kodları ve tek www/non-www tercihi. Sitemap beş dilin ana URL'lerini içerecek; bölüm adresleri eklenmeyecek. Canonical adreslerde bölüm kimliği bulunmayacak. Ana adres önerisi `https://mikrokaynakantalya.com`; www sürümü kalıcı yönlendirme ile buna bağlanacak.

GEO için temel içerik kaynağı salonun gerçek uzmanlığı olacak. Uygulama örneklerinde başlangıç durumu, müşterinin hedefi, yapılan işlem ve doğrulanmış süre/uzunluk/gramaj bilgileri bulunacak. Bakım içeriğini inceleyen uygulayıcı ve gerçek güncelleme tarihi belirtilebilecek. Sorulara anlaşılır yanıt vermek kullanıcıya yarar sağladığı için tercih edilecek; yapay zekâ için zorunlu bir metin uzunluğu veya cevap formatı varsayılmayacak.

Google rehberine göre GEO için özel schema ya da `llms.txt` zorunlu değil; temel SEO, özgün içerik ve taranabilirlik geçerliliğini koruyor. İndekslenme, ilk sıra veya yapay zekâ yanıtlarında görünme garantisi verilmeyecek. [Kullanıcının paylaştığı Google rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=tr)

İşletme adı, adres, telefon ve çalışma saatleri Platin Antalya'nın mevcut Google İşletme Profili ile aynı gerçek işletmeyi temsil edecek. Referans sitedeki telefon `+90 555 892 37 70`; adres Fener Mahallesi, Bülent Ecevit Bulvarı, Bulvar Lara 43B, Muratpaşa/Antalya olarak görünüyor. Yayından önce güncelliği doğrulanacak. Aynı salon için yeni domain nedeniyle ikinci profil açılması planlanmıyor. Yerel sıralamada alaka, mesafe ve bilinirlik etkili; profil doğruluğu ve gerçek müşteri değerlendirmeleri site çalışmasını tamamlayacak. [Google yerel sıralama rehberi](https://support.google.com/business/answer/7091?hl=tr)

Yeni domain, Platin Antalya'nın mikro kaynak hizmetini açıkça temsil edecek. Ana kurumsal siteyle ilişki doğal bağlantılarla açıklanacak. Üç sitede aynı uzun metinler çoğaltılmayacak; mikro kaynak, PRO BOND ve genel salon içeriğinin görevleri ayrılacak. Mahalle adı değiştirilmiş kopya sayfalar oluşturulmayacak. Birden fazla site olması tek başına ihlal değildir; yeni sitenin bağımsız fayda sunması önemlidir. [Google giriş sayfası spam politikası](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)

Mevcut `platinantalya.com/mikro-kaynak-antalya` adresi salonun hizmet sayfası olarak kalabilir. Yeni site beş dilde ayrıntılı sonuçlar ve karar desteğiyle kendi başına faydalı olacak; randevu ve hesaplama mevcut sistemlerde tamamlanacak. İki sayfa özgün içerikle yayında kalacaksa kendi canonical adreslerini kullanacak. Yeni domaini eski sayfaya canonical yapmak yeni domainin bağımsız görünürlük hedefiyle uyumlu değil. Eski sayfa ancak gerçek bir taşınma kararı olursa yönlendirilir. Bu aşamada mevcut siteye canonical, yönlendirme veya içerik değişikliği yapılmayacak. [Google canonical rehberi](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

Yeni domain eski sitenin geçmişini ve bağlantı kazanımlarını otomatik devralmaz. Üst sıralar hedeflenecek; anahtar kelimeli alan adı tek başına üstünlük sağlamaz. Yayın öncesinde mevcut hizmet sayfasının Search Console verisi başlangıç olarak kaydedilecek; iki sitenin toplam görünürlüğü ve nitelikli başvurusu birlikte değerlendirilecek. [Google SEO başlangıç rehberi](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

Görünür bilgiyle eşleşen `HairSalon` / `LocalBusiness` ve `WebSite` verileri hazırlanacak. Hizmet ve video verileri içerik varsa değerlendirilecek. Tek sayfaya yapay bir içerik haritası hiyerarşisi eklenmeyecek. Yapılandırılmış veri tek başına sıralama, AI görünürlüğü veya değerlendirme yıldızları sağlamaz. SSS içeriğinin amacı kullanıcıya yardımcı olmak olacak; Google sonuçlarında özel SSS görünümü sözü verilmeyecek. [Yerel işletme yapılandırılmış veri rehberi](https://developers.google.com/search/docs/appearance/structured-data/local-business)

## Önce–sonra içerik modeli

İlk tasarım için 6–10 güçlü fotoğraf çifti yararlı olur; bu bir yayın zorunluluğu değil. Kullanılacak fotoğrafların yayın izni olmalı. Her çift aynı kişiye ve aynı uygulamaya ait olacak; orijinal dosyalar korunacak.

Fotoğraflar yazısız ve birleştirilmemiş ayrı orijinaller olarak alınacak. Öncesi/sonrası etiketleri resme gömülmeyecek; sitedeki beş dilin içeriklerinden gelecek. Kullanıcı dosyaları `GELEN-GORSELLER/once-sonra/` klasörüne `uygulama-01-once.jpg` ve `uygulama-01-sonra.jpg` gibi eşleşen adlarla veya doğrudan sohbete verebilir. Ayrıntılar aynı klasördeki `NASIL-EKLENIR.md` dosyasında. Birleşik fotoğraf mevcutsa kullanılabilirliği ayrıca değerlendirilecek.

İlk fotoğraf grubu teslim edildi: `/Users/muratkocatas/Desktop/BA` klasöründeki 18 JPG, kıyafet ve çekim bağlamı üzerinden 9 önce–sonra çifti olarak eşleştirildi. Kullanıcının isteğiyle aynı klasörde `uygulama-01-once.jpg` / `uygulama-01-sonra.jpg` düzeninde 01–09 olarak adlandırıldı. Orijinaller taşınmadı veya yeniden sıkıştırılmadı; 18 dosyanın boyut ve SHA-256 kontrolleri değişmedi. Eski/yeni adlar ve bütünlük kaydı `GELEN-GORSELLER/once-sonra/BA-ESLESTIRME.json` içinde. Çekim açıları değişen çiftlerde yan yana karşılaştırma tercih edilecek; sürgü uygunluğu tasarımda ayrıca değerlendirilecek.

Örnek kayıt alanları: önce fotoğrafı, sonra fotoğrafı, kısa açıklama, hedeflenen sonuç, doğrulanmış uzunluk/gramaj/süre, beş dilde alternatif metin, gösterim sırası ve varsa bakım notu. Bilinmeyen teknik değerler uydurulmayacak. Kişi adı zorunlu olmayacak.

Açı ve kadraj uyumluysa sürgü; uyumsuzsa yan yana veya mobilde alt alta gösterim kullanılacak. Görsellerde saç yoğunluğunu/uzunluğunu değiştiren rötuş yapılmayacak. Gerçek müşteri sonuçları yerine yapay zekâ fotoğrafları konulmayacak. Yakın çekim bağlantı fotoğrafları, salon ve uygulayıcı fotoğrafları güven anlatımını tamamlayacak.

## Gramaj, adlandırma ve güven veren anlatım

### Kullanıcının verdiği uygulama bilgisi

Saçın tüm bölgeleri aynı yoğunluk ve yapıda olmayabiliyor. Kullanıcı; daha ince veya hassas bölgelerde uygunluk değerlendirmesiyle yaklaşık 0,20–0,40 g, daha yoğun ve uygulamaya uygun bölgelerde 0,60–0,80 g tutamlar kullanabildiğini anlattı. Yeni sitenin ana açıklaması bu bölgesel değerlendirme olacak. İnce saçlı olmak, yıpranmış saç veya aktif dökülme aynı durum gibi ele alınmayacak; uygun görülmeyen bölgelerde uygulama yapılmaması da değerlendirme kapsamına girecek.

Hesaplayıcıdaki mevcut 0,80 g birim tanımı kullanıcı tarafından açıklandı. Bunun gelecekte 0,40 g'a çevrilmesi olasılık olarak konuşuldu; değişiklik kararı alınmadı. Yeni sitenin tamamı 0,40 g sabit tutam üzerinden tanımlanmayacak.

### Araştırma sonucu ve terminoloji kararı

Balmain resmi ürün sayfasında aynı ürün ailesiyle bağlantılı “Micro Keratin Bonds” ve “Keratin Bonds” ürünlerini birlikte anıyor. Great Lengths keratin bağlantılı seride standart ve MINI seçenekler sunuyor; mini tutam duyurusunda bölgelere göre daha küçük tutam kullanımını açıklıyor. Bu kaynaklardan çıkan terminoloji önerisi: “keratin” bağlantı malzemesi/sistemini, “mikro/mini” bağlantının küçük biçimini anlatabilir; tek başına saç tutamı gramajı bu adları birbirinden ayırmaz. İncelenen kaynaklarda mikro kaynak için evrensel 0,40 g standardı doğrulanmadı.

[Balmain ürün açıklaması](https://balmainhairextensions.com/prebonded-fill-in-extensions-human-hair.html), [Great Lengths standart/MINI serisi](https://www.greatlengths.com/en-gb/pre-bonded-hair-extensions), [Great Lengths mini tutam açıklaması](https://www.greatlengths.com/en-ca/blog/new-at-great-lengths)

Ana başlık ve menü “Mikro Kaynak” olacak. Teknik açıklamada, kullanılan ürünün içeriği doğrulandığında “keratin esaslı bağlantılarla, kişiye ve bölgeye özel hazırlanan kaynak tutamları” denebilir. Ürün içeriği doğrulanmadan “saf keratin”, “organik”, “medikal”, “alerji yapmaz” veya “saçı besler” ifadeleri eklenmeyecek. Kaynak üreticinin malzemeye ilişkin kendi iddiası Platin'in kullandığı ürüne otomatik aktarılmayacak.

Önerilen kavramlar: bölgesel saç değerlendirmesi, kişiye özel tutam hazırlığı, kontrollü gramaj planlaması, renk ve doku uyumu, dengeli dolgunluk, doğal geçiş, yazılı uygulama planı, düzenli kontrol ve bakım desteği. “Dağılım mühendisliği” gibi ifadeler kullanılırsa gerçek uygulama adımlarıyla açıklanmalı; klinik olarak kanıtlanmış üstünlük çağrışımı yaratılmamalı.

### Metin taslakları

Ana mesaj: **“Doğal görünüm, saçınıza özel planlamayla başlar.”**

Bölüm başlığı: **“Saçınızın Her Bölgesine Özel Tutam Planlaması”**

Metin: “Platin Antalya’da mikro kaynak öncesinde saçınızı bölge bölge değerlendiriyoruz. Tel yapınız, mevcut yoğunluğunuz, bağlantıya alınacak doğal saç miktarı ve hedeflediğiniz görünüm birlikte ele alınıyor. Tutamların ağırlığını ve yerleşimini bu değerlendirmeye göre hazırlıyor; renk, doku ve uzunluk uyumuyla bütünleşen bir sonuç hedefliyoruz.”

Gramaj açıklaması: “Uygulamaya uygun bulunan bölgelerde, kişisel planınıza göre 0,20, 0,40, 0,60 veya 0,80 gram gibi farklı tutam ağırlıkları kullanılabilir. Kullanılacak toplam saç miktarı ile bağlantı sayısı saç analizi sırasında birlikte belirlenir.”

Ön görüşme metni: “Saçınıza uygun uzunluğu, dolgunluğu ve uygulama planını birlikte belirleyelim. Ücretsiz ön görüşmede seçeneklerinizi değerlendirin; işlem kapsamınızı ve fiyatınızı uygulamadan önce öğrenin.”

Fiyat açıklaması: “Tutam adedi, toplam saç miktarıyla birlikte anlam kazanır. Size uygun kaynak saçı ve hizmet kapsamını hesaplama aracımızla ön değerlendirin; kesin uygulama planınızı ve fiyatınızı ücretsiz ön görüşmede netleştirin.”

SSS ekleri: “Mikro kaynak ile keratin kaynak arasındaki fark nedir?”, “Neden her bölgede aynı gramaj kullanılmıyor?”, “Tutam adedi ile toplam saç gramajı aynı şeyi mi anlatır?”, “Daha küçük bağlantı her saç için uygun mudur?” Yanıtlar ürün bilgisi ve salonun uygulama yaklaşımıyla sınırlandırılacak.

### Doğruluk sınırı

Dermatoloji kaynakları sürekli çekişin ve uygunsuz uygulamanın saç kaybına yol açabileceğini açıklıyor; bunlar belirli tutam gramajlarına güvenlik onayı vermiyor. “0,20 g her hassas saçta güvenlidir”, “kökleri güçlendirir”, “dökülmeyi önler”, “sıfır zarar” gibi ifadeler kullanılmayacak. Güven; değerlendirme, uygunluk kararı, açık bilgi ve takip sürecinin anlatımıyla kurulacak. [AAD kaynak ve saç hasarı rehberi](https://www.aad.org/public/diseases/hair-loss/insider/stop-damage/prevent-hair-damage-weave-extensions)

Kaynak sayfasındaki kullanım süresi, yeniden uygulama ve garanti anlatımları ürün ve kişi koşullarına bağlı ele alınacak; uzun süre aralıksız kullanım herkes için güvenliymiş gibi sunulmayacak. Nihai bakım metinleri mevcut ürün talimatları ve salonun kontrol programıyla birlikte gözden geçirilecek.

### Hesaplama birimi önerisi

Toplam kaynak saç gramajı, satış tutamı adedi ve uygulanan bağlantı adedi ayrı alanlar olarak düşünülmeli. Örneğin matematiksel olarak 100 × 0,80 g ile 200 × 0,40 g aynı 80 g ağırlığı verir; aynı toplam ağırlık bağlantı sayısının, işçilik süresinin veya toplam hizmet fiyatının aynı olacağı anlamına gelmez. Örnek bir uygulama tavsiyesi değildir.

Hesaplayıcı için öneri: saç miktarını gram üzerinden anlaşılır biçimde göstermek, uygulama bağlantı sayısını kişisel planın parçası olarak açıklamak. Mevcut ürün birimi değiştirilecekse adet seçenekleri, toplam gramaj, saç maliyeti ve işçilik hesabı birlikte yeniden değerlendirilir. Sadece “0,80” etiketini “0,40” olarak değiştirmek yeterli değildir. Bu ayrı geliştirme kullanıcıyla netleştirilmeden yapılmayacak.

Beş dilde terimler tutarlı olacak: mikro kaynak, mikro halka yöntemi veya saç ekimi olarak çevrilmeyecek. Kullanılan bağlantı sistemi doğrulanınca teknik karşılığı her dilde açıkça anlatılacak.

## Teknik altyapı

Video kapsamı eklendi: kullanıcı kendi önce–sonra, mikro kaynak tanıtımı ve gramaj anlatımı videolarını sağlıyor. İlk iki Instagram bağlantısı 1080 × 1920, 30 fps, sesli MP4 olarak `GELEN-VIDEOLAR/orijinaller/` altında arşivlendi. Süreleri 135,44 ve 97,62 saniye; görüntü/ses akışları yeniden kodlanmadan birleştirildi ve baştan sona hatasız çözülerek kontrol edildi. Bunlar Instagram'ın sunduğu en yüksek çözünürlüklü dağıtım kopyalarıdır; kamera orijinalleri değildir. Gönderi açıklamaları ve örnek video kareleri incelendi; tam konuşma dökümleri henüz hazırlanmadı. Birinci video kişisel planlama, ikinci video müşteri deneyimi/bakım-kontrol bölümüne önerildi. İkisinde de gömülü Türkçe yazılar olduğu için çok dilli altyazı yerleşimi ayrıca hazırlanacak. Kaynak, süre, konu ve dosya bütünlük bilgileri [GELEN-VIDEOLAR/VIDEO-ENVANTERI.md](GELEN-VIDEOLAR/VIDEO-ENVANTERI.md) ve aynı klasördeki `envanter.json` içinde. Yeni bağlantılar geldikçe aynı kayıt sürdürülecek. Büyük arşiv dosyaları GitHub dışında tutulacak; medya barındırma ve nihai web türevleri tasarım/uygulama aşamasında seçilecek.

| Parça | Öneri | Gerekçe |
| --- | --- | --- |
| Uygulama | Next.js App Router, kurulum tarihinde desteklenen kararlı sürüm | İçerik ve metadata'nın ilk HTML yanıtında sunulması |
| Kod | TypeScript | İçerik alanları ve dil eşleşmelerinde hata kontrolü |
| Tasarım | Tailwind CSS ve merkezi marka değişkenleri | Beş dilde tutarlı, mobil uyumlu özel tasarım; Arapça RTL desteği |
| Çok dil | next-intl, URL tabanlı dil yönlendirmesi | Çeviriler ve dil karşılıklarının düzenli yönetimi |
| İçerik | Depoda düzenli JSON/TypeScript veri dosyaları; uzun rehberler gerekirse Markdown | Panel gerektirmeden birlikte güncelleme |
| Görseller | next/image, uygun boyutlar, WebP/AVIF çıktılar | Fotoğraf ağırlıklı sitede hızlı açılış |
| Font | Yerel sunulan fontlar, Latin/Kiril/Arap alfabesi desteği | Tutarlı tipografi ve daha az dış istek |
| Etkileşim | Gerekli bölümlerde küçük istemci bileşenleri; CSS geçişleri | Galeri ve sürgü için sınırlı JavaScript |
| Randevu ve fiyat tahmini | Mevcut Platin Antalya rezervasyon sistemi ve hesaplayıcıya bağlantılar | Güncel fiyat hesabı ve randevu akışını tek merkezde tutmak |
| Sürüm kontrolü | Kullanıcıya ait GitHub deposu | Değişiklik geçmişi ve geri dönüş |
| Yayın | GitHub bağlantılı Vercel | Önizleme, üretim yayını ve alan adı yönetimi |
| Ölçüm | Search Console ve seçilecek tek analitik kurulumu | Organik görünürlük ve iletişim eylemleri |

Sayfalar büyük ölçüde önceden üretilecek (SSG). Yönetim paneli, kullanıcı hesabı, ödeme ve veritabanı ilk sürüm kapsamına girmiyor. Dinamik deneyim galeri, önce–sonra sürgüsü, dil geçişi ve açılır içerikle sağlanacak. İçerik güncellemesi GitHub değişikliği ve yeniden yayınla yapılacak.

İlk sürümde hesaplayıcı veya rezervasyon sistemi iframe ile gömülmeyecek; doğrulanmış hedeflere normal bağlantılar verilecek. Site içinde fiyat formülü, kopya fiyat tablosu veya yeni randevu veritabanı tutulmayacak. Dil parametresi veya hizmeti önceden seçme parametresi ancak hedef uygulama desteklediği doğrulanırsa eklenecek. Randevu arayüzünde beş dil, hesaplayıcıda Türkçe/İngilizce/Almanca görüldü. Rusça ve Arapça ziyaretçiye hesaplayıcının mevcut dil kapsamı geçiş öncesinde kısa biçimde açıklanacak; araç için bu dilleri eklemek ayrı geliştirme konusu olarak kaydedildi.

[Next.js sunucu/istemci bileşenleri](https://nextjs.org/docs/app/getting-started/server-and-client-components), [next-intl resmi rehberi](https://next-intl.dev/docs/getting-started/app-router), [Vercel GitHub entegrasyonu](https://vercel.com/docs/git/vercel-for-github)

## Yayına hazırlık ve doğrulama

1. Tek sayfa kararı üzerinden tasarım yönü ve fotoğraf seçimi netleşir.
2. Türkçe içerik hazırlanır; beş dilde metin ve görsel açıklamaları tamamlanır.
3. Ana ekranın masaüstü/mobil tasarımı değerlendirilir; ardından tüm bölümler ve beş dil sürümü kodlanır.
4. GitHub deposuna aktarılır, Vercel önizlemesi açılır.
5. Beş dilde menüler, bölüm bağlantıları, doğrudan bölüm açılışı, sabit menü kaydırma payı, dil geçişi, galeri, sürgü, telefon, WhatsApp, ücretsiz ön görüşme, online randevu ve hesaplayıcı bağlantıları test edilir. Arapça sağdan sola yerleşim, telefon numarası görünümü ve görsel etiketleri ayrıca kontrol edilir. Otomasyonla gerçek mesaj veya randevu oluşturulmaz.
6. İlk HTML içeriği, canonical/hreflang, sitemap, robots, yapılandırılmış veri, kırık bağlantılar ve 404 davranışı kontrol edilir. Önizleme URL'leri indekslenmeye kapalı tutulur.
7. Mobil görünüm, klavye kullanımı, renk karşıtlığı, odak durumları ve hareketi azaltma tercihi kontrol edilir.
8. Alan adı ve SSL bağlanır; canlı sitede üretim ayarları ve yönlendirmeler tekrar kontrol edilir. DNS değişikliklerinde e-posta kayıtları korunur.
9. Search Console doğrulaması ve sitemap gönderimi yapılır. Google'ın üretken AI görünürlük ayarı kontrol edilir; uygun raporlar izlenir.

Performans hedefleri: gerçek kullanıcı verisinde mobil/masaüstü ayrı değerlendirilerek 75. yüzdelikte LCP en fazla 2,5 saniye, INP en fazla 200 ms, CLS en fazla 0,1. Yeni sitede yeterli saha verisi oluşana kadar laboratuvar testleri kullanılır; test puanı saha performansı garantisi değildir. [Web Vitals ölçütleri](https://web.dev/articles/vitals)

Başarı ölçümü: dil/sayfa bazında organik gösterim ve tıklamalar, indekslenme durumu, ön görüşme/randevu/hesaplayıcı/WhatsApp/telefon/yol tarifi tıklamaları ve salonun doğrulayabildiği gerçek randevular. Olaylara dil, sayfa bölümü ve hedef bilgisi eklenebilecek; ad, telefon veya e-posta analitiğe gönderilmeyecek. İletişim veya randevu düğmesine tıklamak tamamlanmış randevu sayılmaz. Hesaplama ve rezervasyonun tamamlanması ancak mevcut sistemlerden doğrulanabilirse ölçülür. Alan adları arası ölçüm gerekiyorsa mevcut analitik kurulumuyla uyumluluk ayrıca kontrol edilir. AI referans trafiği yalnız tanınabilen kaynaklar ölçüsünde raporlanır.

Barındırma bütçesine alan adı ve ticari kullanıma uygun Vercel planı dahil edilmeli. Hobby planı kişisel, ticari olmayan kullanıma ayrıldığı için bu salon sitesi için mevcut uygun plan veya Pro değerlendirilir; bu aşamada satın alma yapılmaz. [Vercel Hobby kapsamı](https://vercel.com/docs/plans/hobby)

## Güncel durum ve kalan işler

Kodlamaya başlamak için fotoğraf ve video malzemesi yeterli. Dokuz çiftin 18 fotoğrafı artık `GELEN-GORSELLER/once-sonra/` içinde de mevcut; dosya özetleri BA eşleme kaydıyla birebir doğrulandı. Bunlara eşleşmiş 9 dönüşüm videosu ve 2 anlatımlı/deneyim videosu eşlik ediyor. Kullanıcıdan yeni önce–sonra görseli veya video beklemek gerekmiyor.

Uygulama aşamasında bizim tamamlayacağımız işler:

- Hero ve galeri için mevcut malzemeden seçim; kullanıcının teslim ettiği yatay logonun header ve footer'a oranı korunarak yerleştirilmesi.
- Nihai Türkçe metinler ve SSS; İngilizce, Rusça, Almanca, Arapça sürümleri ve Arapça yerleşimi.
- Video konuşma dökümleri, çeviriler, altyazılar, kapaklar ve hızlı/uyumlu web türevleri. Anlatım videolarındaki gömülü Türkçe yazılara uygun altyazı sunumu.
- Tasarımın kodlanması; animasyonlar, eşleşmiş fotoğraf/video galerisi, bölüm menüsü, randevu ve hesaplama bağlantıları.
- SEO/GEO teknik uygulaması, erişilebilirlik, mobil ve beş dil kontrolleri; performans doğrulaması.
- GitHub, Vercel, medya barındırma, alan adı ve Search Console bağlantılarının kurulum/kontrolü. Hesaplara erişim mevcut oturumlarla incelenecek; eksik erişim ancak somut ihtiyaç halinde istenecek.

İçerik doğruluğu için tamamlanacaklar: kullanılan bağlantı ürününün içeriği ve talimatları; saç grupları arasındaki gerçek farklar; uygulayıcı isimleri/rolleri ve hizmet dilleri; mevcut adres/saatler ile gerçek yorum kaynaklarının güncelliği. Mevcut sitelerden alınabilen bilgiler yeniden kullanıcıya sorulmayacak. Belirsiz teknik bilgiler metinler somutlaştığında salonla teyit edilecek.

İsteğe bağlı ek malzeme: ekip ve salon fotoğrafları, bağlantı/tutam yakın çekimleri, anlatımlı videoların yazısız orijinalleri ve uygulamalara ait bilinen uzunluk/gramaj bilgileri. Bunların olmaması tasarıma/kodlamaya başlamayı engellemez; bilinmeyen değerler uydurulmaz.

Hesaplayıcının 0,40 g satış birimine veya gram bazlı gösterime geçirilmesi ayrı bir geliştirme kararıdır. Yeni site mevcut hesaplayıcıya doğru açıklamayla bağlantı verebilir; hesaplayıcı değişikliği başlamanın ön koşulu değildir.

Bu doküman planlama çıktısıdır. GitHub deposu oluşturulmadı, Vercel yayını yapılmadı ve uygulama kodlamasına başlanmadı.

## Karar kaydı — 12 Eylül 2026

1. PRO BOND renk kimliği referans alındı; yeni sitenin konusu yalnız mikro kaynak olarak belirlendi.
2. Tek sayfa ve menüden bölüme kaydırma kararı alındı.
3. İlk yayın dilleri Türkçe, İngilizce, Rusça, Almanca ve Arapça olarak kesinleşti; Arapça RTL planlandı.
4. Yönetim paneli yerine güncellemeleri birlikte yapma kararı alındı.
5. Google'ın SEO/GEO rehberi esas alındı; özgün içerik, yerel işletme kimliği, hızlı erişim ve randevu hedefi benimsendi.
6. Kullanıcının Platin Antalya hizmet sayfası içerik kaynağı olarak eklendi; ücretsiz ön görüşme, randevu ve mevcut hesaplayıcı bağlantıları incelendi.
7. Sabit fiyat sunmama; ön tahmin için hesaplayıcı, kesin plan/fiyat için ücretsiz ön görüşme yaklaşımı kesinleşti.
8. Kullanıcı 0,80 g satış tutamı ve bölgelere göre değişen 0,20–0,80 g uygulama örneklerini açıkladı. “Her mikro kaynak 0,40 g'dır” yaklaşımı benimsenmedi.
9. Terim araştırması yapıldı; keratin malzemesi ile mikro/mini bağlantı boyutunun birbirini dışlayan kategoriler olmadığı kaydedildi.
10. Güven veren metin taslakları eklendi. Gerçek fotoğraf seçimi, malzeme detayları ve hesaplayıcının olası birim değişikliği sonraki tasarım/içerik çalışmasında netleştirilecek.
11. Kullanıcı; header, hero, tüm bölümler, kapsamlı SSS ve footer için yüksek bütçeli marka algısı, güçlü görseller, animasyon ve Apple benzeri okunaklı premium tipografi istedi. Tasarım yönü ayrı dokümana işlendi; Inter/Noto Sans Arabic önerisi, bölüm kompozisyonları ve iki ayırt edici etkileşim eklendi.
12. Kullanıcının fotoğraf teslimi sorusu üzerine yazısız, ayrı önce/sonra orijinalleri ve dil değişiminde site tarafından çevrilen etiketler planlandı. Görsel teslim klasörü ve örnek dosya adları oluşturuldu.
13. Kullanıcı; çok sayıda önce–sonra, mikro kaynak tanıtımı ve gramaj anlatımı videosu sağlayacağını, linklerin incelenmesini ve tam kalitede yerel klasöre indirilmesini istedi. Video arşivi ve kullanım planı eklendi; indirmeler bağlantılar paylaşıldığında başlayacak.
14. Masaüstündeki BA klasöründen 9 önce–sonra fotoğraf çifti alındı ve asılların içeriği korunarak aynı klasörde tutarlı biçimde yeniden adlandırıldı. Eşleme kaydı proje klasöründe saklandı; Finder'daki 18 yeni dosya adı doğrulandı.
15. Kullanıcının seçtiği Instagram DO1XXtQCHuJ ve DPYM8X1iCyW videoları indirildi, 1080 × 1920 / 30 fps ve sesli oldukları doğrulandı. Birinci video kişisel planlama, ikinci video kullanım deneyimi için kaydedildi. Gömülü Türkçe yazılar ve çok dilli sunum ihtiyacı envantere işlendi.
16. Kullanıcı BA fotoğraflarına ait önce–sonra videolarının da bulunduğunu belirtti. Galeride ilk görünüm için 3 güçlü dönüşüm videosu seçme, aynı uygulamanın fotoğraflarıyla tek kayıt altında sunma ve videoları kullanıcı başlatınca yükleme önerisi tasarım planına eklendi. Ek video bağlantıları ve kesin seçim bekleniyor.
17. Dokuz uygulamanın video teslimi için `GELEN-VIDEOLAR/once-sonra/` klasörü oluşturuldu. Birleşik videolar `uygulama-01-once-sonra`, ayrı videolar `uygulama-01-once` / `uygulama-01-sonra` biçiminde, BA fotoğraflarıyla aynı numarayı ve gerçek dosya uzantısını koruyacak. Yerel video arşivi GitHub kapsamı dışında tutuldu.
18. Kullanıcı 9 MOV videoyu teslim etti. Dosyalar BA fotoğraflarıyla kıyafet/çekim bağlamına göre eşleştirildi; `uygulama-01-once-sonra.mov` ile `uygulama-09-once-sonra.mov` arasında adlandırıldı. Her birinde önce ve sonra birlikte bulunuyor. Dokuz videonun toplamı 425,42 MB; üç dosya 2160 × 3840, altı dosya 1080 × 1920, süreler yaklaşık 14,4 saniye. Yeniden kodlama yapılmadı; boyut ve SHA-256 kontrolleri değişmedi. Kayıtlar `GELEN-VIDEOLAR/ONCE-SONRA-ESLESTIRME.json` ve `envanter.json` içine işlendi.
19. Kullanıcı `platinantalyalogo.png` dosyasını kullanılacak logo olarak seçti. Orijinal dosya korunarak proje marka klasörüne birebir kopyalandı; header/footer logo tercihi kesinleşti.


## Uygulama durumu — 12 Eylül 2026

- Kullanıcı salon/ekip, bağlantı yakın çekimleri ve yazısız video orijinallerinin olmadığını belirterek mevcut materyallerle kodlamaya başlama onayı verdi. Bu dosyalar yayın ön şartı değildir.
- Mobil kullanım önceliği ayrıca vurgulandı. İlk ekranda gerçek saç sonucu, sabit mobil ön görüşme/fiyat erişimi, 320 px ve 390 px beş dil testleri uygulandı.
- Next.js 16.3.5 / React 19.3 / TypeScript / next-intl; beş statik dil sayfası. Gerçek logo,18fotoğraf,9dönüşüm ve2anlatım videosu entegre edildi. Videolar oynatılmadan indirilmez.
- Özel galeri, tam ekran fotoğraf inceleme, bölüm menüsü,5grupta26SSS ve mevcut randevu/hesaplayıcı bağlantıları kodlandı.
- Mobil menü/dil odakları, arka plan inert davranışı, hareket azaltma tercihi ve Arapça RTL uygulandı.
- Canonical, hreflang, sitemap, robots, HairSalon/WebSite/WebPage ve iki kaynak tarihi doğrulanmış VideoObject eklendi. SEO/GEO birinci sıra garantisi olarak sunulmaz.
- Kaynakfoto/video orijinalleri yerel olarak korunuyor; webkopyaları public/media altında.
- İki anlatım videosu Türkçe ve gömülü Türkçe yazılıdır;5dilde başlık ve özet mevcut, ses/VTTçevirisi yoktur.
- Mevcut Vercel ekibi Hobby planında. Ticari yayın için uygun plan/ekip gereksinimi nedeniyle onaysız ücretli yükseltme yapılmadı. GitHub ve yerel çalışan önizleme tamamlanarak bu karar kullanıcıya sunulur.

- GitHub özel depo oluşturuldu ve kod yüklendi: https://github.com/CAGE1985/mikrokaynakantalya . Yerel üretim önizlemesi http://localhost:3013 .
- Son mobil Lighthouse:91performans/100erişilebilirlik/100eniyiuygulamalar/100teknikSEO; LCP3,5sn laboratuvar değeri, gerçek kullanıcı ölçümü değildir. Son5dil×2genişlik kontrolü250/250 geçti.
