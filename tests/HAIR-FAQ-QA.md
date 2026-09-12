# Saç grubu ve SSS kontrolü

12 Eylül 2026. Chrome, 390×844 ve 320×844; Türkçe, İngilizce, Almanca, Rusça ve Arapça.

- Üç saç grubu penceresi: açma, 4/8/7 özellik kapsamı, küçük ekrana sığma, uzun metin kaydırması, sabit kapatma düğmesi, Escape ve açan düğmeye odak dönüşü.
- Pencere açıkken arka plan kaydırma kilidi; kapandıktan sonra önceki duruma dönüş.
- Türkçe/Arapça Limited Edition açık pencerelerinde axe WCAG A/AA: sıfır otomatik ihlal.
- 26 SSS içinde farklı gruplara geçerken yalnız bir cevabın açık kalması.
- 3–6 ay ve 2–4 tekrar bilgilerinin beş dilde varlığı.
- Fiyat hesaplama, ön görüşme, online randevu, WhatsApp, telefon ve konum bağlantılarının doğru cevaba bağlı olması; mobil dokunma alanları.
- Dil düğmesi/menüsünde beş bayrak, görünür mobil keşfet butonu, yeni saç tutamı çizimi ve yatay taşma kontrolü.

Tekrar çalıştırma: `QA_BASE_URL=http://localhost:3013 node tests/hair-faq-qa.mjs`.
Ham sonuçlar ve ekran görüntüleri `tests/artifacts/hair-faq/` içindedir; Git'e dahil edilmez.

Galeri hareketleri ve JavaScript kapalı içerik kontrolü ayrı `GALLERY-DETAIL-QA.md` raporundadır. Otomatik axe sonucu tam WCAG uygunluk beyanı değildir. Mobil testler Chrome cihaz benzetimidir; bu koşuda fiziksel iPhone testi yapılmadı.
