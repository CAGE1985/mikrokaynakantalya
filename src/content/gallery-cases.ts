import type { Locale } from "@/i18n/routing";

export type GalleryCase = {
  id: string;
  title: string;
  description: string;
  beforeAlt: string;
  afterAlt: string;
};

type CaseText = [
  title: string,
  description: string,
  beforeAlt: string,
  afterAlt: string,
];

// Order follows the verified local photo/video IDs, not the source page order.
// Source-to-photo evidence is recorded in GALERI-ACIKLAMALARI.md.
const cases: Record<Locale, CaseText[]> = {
  tr: [
    [
      "Işıltılı Kahve",
      "Kahve tonlarıyla uyumlu tutamlarla uzunluk ve dengeli dolgunluk hedeflendi. Sıcak ışıltılar, dalgalı görünümde yumuşak bir renk geçişi oluşturuyor.",
      "Uygulama öncesinde omuz hizasında, düz koyu kahve saç.",
      "Uygulama sonrasında sıcak ışıltılı, uzun ve dalgalı kahve saç.",
    ],
    [
      "Ombre Geçişli",
      "Koyu diplerle soğuk sarı uçları buluşturan tutam seçimiyle ombre geçişi bütünleştirildi. Uygulama, uzunluk ve dengeli dolgunluk hedefiyle planlandı.",
      "Omuz hizasındaki kumral saçın mikro kaynak öncesi görünümü.",
      "Koyu diplerden soğuk sarı uçlara geçen, uzun dalgalı saçın uygulama sonrası görünümü.",
    ],
    [
      "Bakır Tonlarda",
      "Bakır tonlarına uyumlu tutamlarla renk bütünlüğü gözetildi. Uygulama sonrasında daha uzun, dolgun ve dalgalı bir görünüm elde edildi.",
      "Omuzları geçen, bakır tonlu saçın uygulama öncesi görünümü.",
      "Mikro kaynak sonrasında uzun dalgalarla şekillendirilmiş, dolgun bakır saç.",
    ],
    [
      "Balyaj Uyumlu Sarı",
      "Sarı ve balyajlı tonlarla uyumlu tutamlar seçildi. Koyu diplerden açık uçlara uzanan geçiş, daha uzun ve dolgun bir görünümle bütünleştirildi.",
      "Koyu dipli, açık sarı uçlu ve omuzları geçen saçın uygulama öncesi görünümü.",
      "Koyu diplerden açık sarı uçlara geçen, uzun dalgalı saçın uygulama sonrası görünümü.",
    ],
    [
      "Doğal Koyu Kahve",
      "Doğal koyu kahve renge ve saç dokusuna uyumlu mikro kaynaklarla uzunluk ve dengeli hacim kazandırıldı. Amaç, mevcut saçla bütünleşen bir görünüm oluşturmaktı.",
      "Kısa, koyu kahve saçın mikro kaynak öncesi görünümü.",
      "Uygulama sonrasında bel hizasına uzanan, koyu kahve dalgalı saç.",
    ],
    [
      "Doğal Kahve",
      "Çikolata kahve tonlarıyla bütünleşen bir görünüm için tutamlar renk ve doku uyumuna göre seçildi. Uzunluk ve dengeli hacim birlikte hedeflendi.",
      "Omuz hizasında, koyu dipli ve açık uçlu saçın uygulama öncesi görünümü.",
      "Uygulama sonrasında uzun, yumuşak dalgalı çikolata kahve saç.",
    ],
    [
      "Işıltılı Kumral",
      "Kumral tonlarıyla uyumlu kaynak saç seçilerek uzunluk ve dolgunluk artırıldı. Açık ışıltılar, dalgalı saçın hareketinde yumuşak bir geçiş oluşturuyor.",
      "Omuz hizasında, kahve tonlu düz saçın uygulama öncesi görünümü.",
      "Açık ışıltılarla bütünleşen, uzun dalgalı kumral saçın uygulama sonrası görünümü.",
    ],
    [
      "Sıcak Bakır Işıltılı",
      "Sıcak bakır ve kahve yansımalarına uyumlu tutamlarla renk geçişi bütünleştirildi. Uygulama sonrasında daha uzun, yoğun ve canlı bir görünüm elde edildi.",
      "Bakır-kahve tonlarında, omuzları geçen saçın uygulama öncesi görünümü.",
      "Uygulama sonrasında sıcak bakır yansımalı, uzun dalgalı kahve saç.",
    ],
    [
      "Sarı Tonlarda",
      "Mevcut sarı tonlara uyumlu tutamlarla renk bütünlüğü gözetildi. Uygulama, daha uzun ve hacimli bir görünüm hedefiyle planlandı.",
      "Koyu dipli, düz sarı saçın mikro kaynak öncesi görünümü.",
      "Uygulama sonrasında dolgun dalgalarla şekillendirilmiş sarı saç.",
    ],
  ],
  en: [
    [
      "Highlighted Brown",
      "Strands chosen to complement the brown tones were used to add length and balanced fullness. Warm highlights create a soft colour transition through the waves.",
      "Before the application: straight, shoulder-length dark brown hair.",
      "After the application: long, wavy brown hair with warm highlights.",
    ],
    [
      "Ombré Transition",
      "Strands blending dark roots with cool blonde ends were chosen to bring the ombré transition together. The application was planned for added length and balanced fullness.",
      "Shoulder-length light brown hair before micro bond extensions.",
      "After the application: long waves transitioning from dark roots to cool blonde ends.",
    ],
    [
      "Copper Tones",
      "Strands were matched to the copper tones for a cohesive colour result. The finished hair has a longer, fuller appearance styled in waves.",
      "Copper-toned hair extending below the shoulders before the application.",
      "After micro bond extensions: full copper hair styled in long waves.",
    ],
    [
      "Balayage Blonde",
      "Strands were selected to complement the blonde and balayage tones. The transition from dark roots to light ends was blended into a longer, fuller look.",
      "Before the application: hair below the shoulders with dark roots and light blonde ends.",
      "After the application: long waves blending dark roots into light blonde ends.",
    ],
    [
      "Natural Dark Brown",
      "Micro bond extensions matched to the natural dark brown colour and hair texture added length and balanced volume. The aim was a look that blends with the existing hair.",
      "Short, dark brown hair before micro bond extensions.",
      "After the application: dark brown waves reaching the waist.",
    ],
    [
      "Natural Brown",
      "Strands were selected for colour and texture compatibility with a chocolate brown look. Added length and balanced volume were planned together.",
      "Before the application: shoulder-length hair with dark roots and lighter ends.",
      "After the application: long, softly waved chocolate brown hair.",
    ],
    [
      "Highlighted Light Brown",
      "Extensions selected to complement the light brown tones added length and fullness. Lighter highlights create soft transitions through the movement of the waves.",
      "Before the application: straight, shoulder-length brown hair.",
      "After the application: long, wavy light brown hair with lighter highlights.",
    ],
    [
      "Warm Copper Highlights",
      "Strands chosen to complement warm copper and brown reflections brought the colour transition together. The finished result has a longer, fuller and more vibrant appearance.",
      "Before the application: copper-brown hair extending below the shoulders.",
      "After the application: long brown waves with warm copper highlights.",
    ],
    [
      "Blonde Tones",
      "Strands were matched to the existing blonde tones to maintain colour harmony. The application was planned for a longer look with more volume.",
      "Straight blonde hair with darker roots before micro bond extensions.",
      "After the application: blonde hair styled in full waves.",
    ],
  ],
  de: [
    [
      "Braun mit sanften Highlights",
      "Zu den Brauntönen passende Strähnen wurden für mehr Länge und ausgewogene Fülle ausgewählt. Warme Highlights sorgen in den Wellen für sanfte Farbübergänge.",
      "Vor der Anwendung: glattes, schulterlanges dunkelbraunes Haar.",
      "Nach der Anwendung: langes, gewelltes braunes Haar mit warmen Highlights.",
    ],
    [
      "Fließender Ombré-Verlauf",
      "Strähnen, die dunkle Ansätze mit kühlen blonden Spitzen verbinden, ergänzen den Ombré-Verlauf. Geplant wurden mehr Länge und ausgewogene Fülle.",
      "Schulterlanges hellbraunes Haar vor der Micro-Bonding-Anwendung.",
      "Nach der Anwendung: lange Wellen mit einem Übergang von dunklen Ansätzen zu kühlen blonden Spitzen.",
    ],
    [
      "Kupfertöne",
      "Die Strähnen wurden auf die Kupfertöne abgestimmt, um ein stimmiges Farbbild zu erhalten. Das Ergebnis zeigt längeres, voller wirkendes Haar in Wellen.",
      "Vor der Anwendung: kupferfarbenes Haar, das über die Schultern reicht.",
      "Nach der Micro-Bonding-Anwendung: volles kupferfarbenes Haar in langen Wellen.",
    ],
    [
      "Blond mit Balayage",
      "Die Strähnen wurden passend zu den Blond- und Balayage-Tönen ausgewählt. Der Verlauf von dunklen Ansätzen zu hellen Spitzen wurde in einen längeren, volleren Look eingebunden.",
      "Vor der Anwendung: Haar über Schulterlänge mit dunklen Ansätzen und hellblonden Spitzen.",
      "Nach der Anwendung: lange Wellen mit dunklen Ansätzen und hellblonden Spitzen.",
    ],
    [
      "Natürliches Dunkelbraun",
      "Auf das natürliche Dunkelbraun und die Haarstruktur abgestimmte Micro-Bonding-Extensions ergänzen Länge und ausgewogenes Volumen. Ziel war ein harmonischer Übergang zum eigenen Haar.",
      "Kurzes dunkelbraunes Haar vor der Micro-Bonding-Anwendung.",
      "Nach der Anwendung: dunkelbraune Wellen bis zur Taille.",
    ],
    [
      "Natürliches Braun",
      "Für einen harmonischen schokoladenbraunen Look wurden die Strähnen nach Farbe und Struktur ausgewählt. Mehr Länge und ausgewogenes Volumen wurden gemeinsam geplant.",
      "Vor der Anwendung: schulterlanges Haar mit dunklen Ansätzen und helleren Spitzen.",
      "Nach der Anwendung: langes schokoladenbraunes Haar mit weichen Wellen.",
    ],
    [
      "Hellbraun mit Highlights",
      "Zum hellbraunen Farbton passende Extensions ergänzen Länge und Fülle. Helle Highlights erzeugen sanfte Übergänge in der Bewegung der Wellen.",
      "Vor der Anwendung: glattes, schulterlanges braunes Haar.",
      "Nach der Anwendung: langes, gewelltes hellbraunes Haar mit helleren Highlights.",
    ],
    [
      "Warme Kupferreflexe",
      "Zu den warmen Kupfer- und Braunreflexen passende Strähnen verbinden die Farbübergänge. Das Ergebnis zeigt einen längeren, volleren und lebendigen Look.",
      "Vor der Anwendung: kupferbraunes Haar, das über die Schultern reicht.",
      "Nach der Anwendung: lange braune Wellen mit warmen Kupferreflexen.",
    ],
    [
      "Blondtöne",
      "Die Strähnen wurden auf die vorhandenen Blondtöne abgestimmt, um die Farbharmonie zu erhalten. Ziel der Planung war ein längerer Look mit mehr Volumen.",
      "Glattes blondes Haar mit dunkleren Ansätzen vor der Micro-Bonding-Anwendung.",
      "Nach der Anwendung: blondes Haar, zu vollen Wellen gestylt.",
    ],
  ],
  ru: [
    [
      "Каштановый с бликами",
      "Пряди в тон каштановым оттенкам подобраны для добавления длины и равномерного объёма. Тёплые блики создают мягкие цветовые переходы в волнистой укладке.",
      "До процедуры: прямые тёмно-каштановые волосы до плеч.",
      "После процедуры: длинные волнистые каштановые волосы с тёплыми бликами.",
    ],
    [
      "Плавный переход омбре",
      "Пряди, сочетающие тёмные корни с холодными светлыми концами, дополнили переход омбре. Процедура была спланирована для увеличения длины и равномерного объёма.",
      "Русые волосы до плеч перед микрокапсульным наращиванием.",
      "После процедуры: длинные волны с переходом от тёмных корней к холодным светлым концам.",
    ],
    [
      "Медные оттенки",
      "Пряди подобраны в тон медным оттенкам для целостного цветового результата. После процедуры волосы выглядят длиннее и объёмнее, укладка выполнена волнами.",
      "До процедуры: волосы медного оттенка ниже плеч.",
      "После микрокапсульного наращивания: объёмные медные волосы, уложенные длинными волнами.",
    ],
    [
      "Блонд с балаяжем",
      "Пряди подобраны с учётом светлых оттенков и балаяжа. Переход от тёмных корней к светлым концам дополнен большей длиной и объёмом.",
      "До процедуры: волосы ниже плеч с тёмными корнями и светлыми концами.",
      "После процедуры: длинные волны с переходом от тёмных корней к светлым концам.",
    ],
    [
      "Натуральный тёмный каштан",
      "Микрокапсульное наращивание с учётом натурального тёмно-каштанового цвета и текстуры добавило длину и равномерный объём. Целью было гармоничное сочетание с собственными волосами.",
      "Короткие тёмно-каштановые волосы перед микрокапсульным наращиванием.",
      "После процедуры: тёмно-каштановые волнистые волосы до талии.",
    ],
    [
      "Натуральный каштан",
      "Для гармоничного шоколадно-каштанового оттенка пряди подбирались по цвету и текстуре. Увеличение длины и равномерный объём планировались вместе.",
      "До процедуры: волосы до плеч с тёмными корнями и более светлыми концами.",
      "После процедуры: длинные шоколадно-каштановые волосы с мягкими волнами.",
    ],
    [
      "Русые оттенки с бликами",
      "Пряди, подобранные в тон русым оттенкам, добавили длину и объём. Светлые блики создают мягкие переходы в движении волн.",
      "До процедуры: прямые каштановые волосы до плеч.",
      "После процедуры: длинные волнистые русые волосы со светлыми бликами.",
    ],
    [
      "Тёплые медные блики",
      "Пряди в тон тёплым медным и каштановым переливам объединили цветовые переходы. После процедуры получился более длинный, объёмный и выразительный образ.",
      "До процедуры: медно-каштановые волосы ниже плеч.",
      "После процедуры: длинные каштановые волны с тёплыми медными бликами.",
    ],
    [
      "Светлые оттенки",
      "Пряди подобраны к имеющимся светлым оттенкам для сохранения цветовой гармонии. Процедура планировалась для увеличения длины и объёма.",
      "Прямые светлые волосы с более тёмными корнями перед микрокапсульным наращиванием.",
      "После процедуры: светлые волосы, уложенные объёмными волнами.",
    ],
  ],
  ar: [
    [
      "بني بخصل مضيئة",
      "اختيرت خصل تتناغم مع درجات البني لإضافة طول وامتلاء متوازن. وتمنح اللمسات الدافئة انتقالاً لونياً ناعماً في التموجات.",
      "قبل التطبيق: شعر بني داكن مستقيم بطول الكتفين.",
      "بعد التطبيق: شعر بني طويل ومموج بخصل مضيئة دافئة.",
    ],
    [
      "تدرّج أومبري ناعم",
      "اختيرت خصل تجمع بين الجذور الداكنة والأطراف الشقراء الباردة لتكامل تدرّج الأومبري. وخُطط للتطبيق بهدف إضافة طول وامتلاء متوازن.",
      "شعر بني فاتح بطول الكتفين قبل تركيب وصلات الشعر الدقيقة.",
      "بعد التطبيق: تموجات طويلة تتدرّج من جذور داكنة إلى أطراف شقراء باردة.",
    ],
    [
      "درجات نحاسية",
      "اختيرت الخصل بما ينسجم مع الدرجات النحاسية للحفاظ على تناسق اللون. وبعد التطبيق، أصبح المظهر أطول وأكثر امتلاءً مع تصفيف مموج.",
      "قبل التطبيق: شعر بدرجات نحاسية يتجاوز الكتفين.",
      "بعد تركيب الوصلات الدقيقة: شعر نحاسي ممتلئ بتصفيف ذي تموجات طويلة.",
    ],
    [
      "أشقر متناغم مع البالياج",
      "اختيرت الخصل لتنسجم مع درجات الأشقر والبالياج. واكتمل التدرّج من الجذور الداكنة إلى الأطراف الفاتحة بمظهر أطول وأكثر امتلاءً.",
      "قبل التطبيق: شعر يتجاوز الكتفين بجذور داكنة وأطراف شقراء فاتحة.",
      "بعد التطبيق: تموجات طويلة تتدرّج من جذور داكنة إلى أطراف شقراء فاتحة.",
    ],
    [
      "بني داكن طبيعي",
      "أضافت الوصلات الدقيقة المتناغمة مع اللون البني الداكن الطبيعي وملمس الشعر طولاً وكثافة متوازنة. وكان الهدف مظهراً ينسجم مع الشعر الموجود.",
      "شعر قصير بني داكن قبل تركيب وصلات الشعر الدقيقة.",
      "بعد التطبيق: شعر بني داكن مموج يصل إلى الخصر.",
    ],
    [
      "بني طبيعي",
      "اختيرت الخصل وفق تناسق اللون والملمس للحصول على مظهر متناغم بدرجات البني الشوكولاتي. وخُطط للطول والكثافة المتوازنة معاً.",
      "قبل التطبيق: شعر بطول الكتفين مع جذور داكنة وأطراف أفتح.",
      "بعد التطبيق: شعر بني شوكولاتي طويل بتموجات ناعمة.",
    ],
    [
      "بني فاتح بخصل مضيئة",
      "اختيرت وصلات تنسجم مع درجات البني الفاتح لإضافة طول وامتلاء. وتمنح الخصل الأفتح انتقالات ناعمة مع حركة التموجات.",
      "قبل التطبيق: شعر بني مستقيم بطول الكتفين.",
      "بعد التطبيق: شعر بني فاتح طويل ومموج بخصل أفتح.",
    ],
    [
      "لمسات نحاسية دافئة",
      "اختيرت خصل تتناغم مع الانعكاسات النحاسية والبنية الدافئة لتكامل التدرّج اللوني. وأصبح المظهر بعد التطبيق أطول وأكثر امتلاءً وحيوية.",
      "قبل التطبيق: شعر بدرجات البني النحاسي يتجاوز الكتفين.",
      "بعد التطبيق: تموجات بنية طويلة بلمسات نحاسية دافئة.",
    ],
    [
      "درجات شقراء",
      "اختيرت الخصل لتنسجم مع درجات الأشقر الموجودة مع مراعاة تناسق اللون. وخُطط للتطبيق بهدف مظهر أطول وأكثر كثافة.",
      "شعر أشقر مستقيم بجذور داكنة قبل تركيب وصلات الشعر الدقيقة.",
      "بعد التطبيق: شعر أشقر مصفف بتموجات ممتلئة.",
    ],
  ],
};

export function getGalleryCases(locale: Locale): GalleryCase[] {
  return cases[locale].map(
    ([title, description, beforeAlt, afterAlt], index) => ({
      id: String(index + 1).padStart(2, "0"),
      title,
      description,
      beforeAlt,
      afterAlt,
    }),
  );
}
