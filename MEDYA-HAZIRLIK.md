# Web medya dosyaları

Kullanıcının fotoğraf ve video asılları `GELEN-GORSELLER` ve `GELEN-VIDEOLAR` altında korunmuştur. Web türevleri `public/media` altında bulunur. Fotoğraflara, saç görünümüne, renge veya kadraja estetik müdahale yapılmamıştır.

## Hazır yollar

| İçerik | Web yolu |
|---|---|
| 18 özgün önce–sonra fotoğrafı | `/media/photos/uygulama-01-once.jpg` … `/media/photos/uygulama-09-sonra.jpg` |
| Özgün logo | `/media/logo.png` |
| 9 önce–sonra videosu | `/media/videos/uygulama-01.mp4` … `/media/videos/uygulama-09.mp4` |
| Planlama anlatımı | `/media/videos/planlama.mp4` |
| Kullanım deneyimi anlatımı | `/media/videos/deneyim.mp4` |
| Planlama video kapağı | `/media/posters/planlama.jpg` |
| Deneyim video kapağı | `/media/posters/deneyim.jpg` |
| Inter değişken font | `/fonts/Inter.woff2` |
| Noto Sans Arabic değişken font | `/fonts/NotoSansArabic.woff2` |
| Boyut, kaynak ve SHA-256 envanteri | `/media/manifest.json` |

Fotoğraf ve logo kopyalarının SHA-256 değerleri kaynaklarıyla aynıdır. Fotoğraflar 1320 piksel genişliktedir; yükseklikleri kaynak kadrajına göre değişir. Logo 1200×400 pikseldir.

## Video özellikleri ve boyutlar

11 videonun tamamı 720×1280, 30 fps, H.264 High profil, yuv420p, AAC 128 kbit/s ve MP4 faststart olarak hazırlanmıştır. CRF 25, `medium` kodlama önayarı ve Lanczos ölçekleme kullanılmıştır. Kırpma, renk değiştirme veya rötuş uygulanmamıştır. En fazla iki ffmpeg işlemi aynı anda çalışır.

- Kaynak videolar toplamı: **471,61 MiB**.
- Web videoları toplamı: **79,59 MiB**; yaklaşık **%83,1** küçülme.
- Önce–sonra videoları: her biri yaklaşık **2,89–3,88 MiB** ve 14,4 saniye.
- Planlama: **30,65 MiB**, yaklaşık 135,4 saniye.
- Deneyim: **18,74 MiB**, yaklaşık 97,6 saniye.
- Fotoğraf ve logo toplamı: **9,93 MiB**.
- İki kapak toplamı: **0,30 MiB**.
- İki WOFF2 font toplamı: **0,32 MiB** (332.256 byte).

Bu arşivin tamamı ilk sayfa açılışında indirilmemelidir. Videolarda `preload="none"`, gerçek kapak görseli ve kullanıcı başlatmalı oynatma kullanılmalıdır. Diyalog kapanırken video durdurulmalıdır. İlk ekrandaki gerekli görsel dışındaki galeri fotoğrafları gecikmeli yüklenmelidir.

Video kapakları özgün planlama videosunun 22. saniyesinden ve deneyim videosunun 18. saniyesinden çıkarılmıştır. Kaynağa gömülü Türkçe yazılar ve görüntü içindeki karşılaştırma korunmuştur; bunlar ayrı bir altyazı katmanı değildir ve dil seçimiyle değişmez.

## Fontlar

Fontlar Google Fonts'un resmî deposundan alınmıştır:

- [Inter kaynak ailesi](https://github.com/google/fonts/tree/main/ofl/inter)
- [Noto Sans Arabic kaynak ailesi](https://github.com/google/fonts/tree/main/ofl/notosansarabic)

Tam değişken TTF dosyaları ve OFL lisansları `public/fonts` altında değiştirilmeden saklanır. Üretimde kullanılan WOFF2 dosyaları sitenin dillerine göre alt kümeye ayrılmıştır. Her iki fontun **100–900 değişken ağırlık ekseni** korunmuştur. Inter'in optik boyutu kaynak varsayılanı olan 14'te, Noto Sans Arabic'in genişliği kaynak varsayılanı olan 100'de sabitlenmiştir. Kaynak TTF dosyaları özgün tüm eksenlerini ve karakterlerini korur.

| Font | İlk tam WOFF2 | Optimize WOFF2 | Azalma |
|---|---:|---:|---:|
| Inter | 350.372 byte | **128.520 byte** | **%63,3** |
| Noto Sans Arabic | 361.252 byte | **203.736 byte** | **%43,6** |

Inter'de Latin/Türkçe/Almanca, Kiril ve genişletilmiş Kiril blokları; Noto Sans Arabic'te Arapça, ek Arapça, genişletilmiş Arapça ve sunum biçimi blokları korunur. Her iki alt küme noktalama, para birimi, sayılar ve arayüz sembollerini; ayrıca ilgili dil içeriklerinde gerçekten geçen karakterleri içerir. Kaynak fontun kapsadığı bu repertuardan Inter için **963**, Noto Sans Arabic için **1.525** Unicode karakterin kaybolmadığı doğrulanmıştır. Kontrol karakterleri veya kaynakta bulunmayan semboller yeni glif olarak uydurulmaz.

Arapça birleşim ve konumlandırma için GSUB/GPOS tabloları, `arab` şekillendirme sistemi ve alt kümenin gerektirdiği bağlamsal glifler korunmuştur. Kesin Unicode blokları, sabitlenen eksenler ve glif sayıları `public/media/manifest.json` içindeki font optimizasyon kayıtlarında bulunur.

`next/font/local` için WOFF2 dosyaları tercih edilmelidir. TTF dosyaları kaynak arşivi ve alternatif olarak bırakılmıştır. Yalnızca sayfanın dilinin gerektirdiği font öncelikli yüklenmelidir.

## Yeniden üretme ve doğrulama

Araçlar: Python 3, Pillow, `fonttools[woff]`, ffmpeg, ffprobe ve curl.

```sh
python3 scripts/prepare-media.py
```

Mevcut videolar kaynaklarından daha yeniyse yeniden kodlanmaz. Kodlama ayarları değiştirildiğinde `--force` ile yeniden üretilebilir. Script fotoğraf kopyalarının eşitliğini; video codec, çözünürlük, kare hızı, ses, süre ve faststart özelliklerini; kaynak video SHA-256 değerlerinin değişmediğini doğrular. Fontları her çalışmada tam TTF asıllarından optimize profille üretir; eski büyük WOFF2 dosyalarına geri dönmez. Font karakter kapsamı, kaynak TTF bütünlüğü, Arapça şekillendirme tabloları ve değişken ağırlık ekseni de doğrulanarak envantere yazılır.

Güncel kesin byte boyutları ve bütünlük değerleri için `public/media/manifest.json` kullanılmalıdır. `servedAssetBytes` kullanılan WOFF2 dosyaları dahil web varlıklarını; `totalBytes` ek TTF kaynakları ve lisanslar dahil medya/font klasörlerinin toplamını belirtir. Envanter dosyasının kendi boyutu toplam dışındadır.
