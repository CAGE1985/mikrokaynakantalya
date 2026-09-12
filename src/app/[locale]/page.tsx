import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Check,
  Plus,
  MapPin,
  Phone,
  Instagram,
  Youtube,
} from "lucide-react";
import { getContent } from "@/content";
import { isLocale, locales, localePath } from "@/i18n/routing";
import { links, address, phoneDisplay, SITE_URL } from "@/lib/site";
import { Header } from "@/components/header";
import { Gallery } from "@/components/gallery";
import { VideoCard } from "@/components/video-card";
import { Reveal } from "@/components/reveal";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = await getContent(locale);
  const canonical = `${SITE_URL}${localePath(locale)}`;
  const ogLocale = {
    tr: "tr_TR",
    en: "en_GB",
    ru: "ru_RU",
    de: "de_DE",
    ar: "ar_SA",
  };
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}${localePath(l)}`]),
        ),
        "x-default": SITE_URL + "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Platin Antalya",
      title: c.meta.title,
      description: c.meta.description,
      url: canonical,
      locale: ogLocale[locale],
      images: [
        {
          url: "/media/photos/uygulama-01-sonra.jpg",
          width: 1320,
          height: 2340,
          alt: c.hero.photoCaption,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
    },
    robots:
      process.env.VERCEL_ENV === "preview"
        ? { index: false, follow: false }
        : { index: true, follow: true, "max-image-preview": "large" },
  };
}
const eyebrow = (text: string) => (
  <p className="eyebrow">
    <span />
    {text}
  </p>
);
export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const c = await getContent(locale);
  const businessId = "https://www.platinantalya.com/#salon";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HairSalon",
        "@id": businessId,
        name: "Platin Antalya",
        url: "https://www.platinantalya.com",
        logo: `${SITE_URL}/media/logo.png`,
        telephone: "+905558923770",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Fener Mah. Bülent Ecevit Bulvarı, Bulvar Lara 43B",
          addressLocality: "Muratpaşa",
          addressRegion: "Antalya",
          addressCountry: "TR",
        },
        hasMap: links.directions,
        sameAs: [links.instagram, links.youtube],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "10:00",
            closes: "19:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL,
        name: "Mikro Kaynak Antalya",
        publisher: { "@id": businessId },
        inLanguage: locales,
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${localePath(locale)}#webpage`,
        url: `${SITE_URL}${localePath(locale)}`,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": SITE_URL + "/#website" },
        about: { "@id": businessId },
        hasPart: [
          { "@id": SITE_URL + "/#video-planlama" },
          { "@id": SITE_URL + "/#video-deneyim" },
        ],
      },
      ...[
        {
          key: "planlama",
          name: c.planning.videoTitle,
          description: c.planning.videoDescription,
          date: "2025-09-20T18:20:40+00:00",
          duration: "PT2M15S",
          source: "https://www.instagram.com/p/DO1XXtQCHuJ/",
        },
        {
          key: "deneyim",
          name: c.care.videoTitle,
          description: c.care.videoDescription,
          date: "2025-10-04T07:00:00+00:00",
          duration: "PT1M37S",
          source: "https://www.instagram.com/p/DPYM8X1iCyW/",
        },
      ].map((video) => ({
        "@type": "VideoObject",
        "@id": SITE_URL + "/#video-" + video.key,
        name: video.name,
        description: video.description,
        uploadDate: video.date,
        duration: video.duration,
        inLanguage: "tr",
        contentUrl: SITE_URL + "/media/videos/" + video.key + ".mp4",
        thumbnailUrl: SITE_URL + "/media/posters/" + video.key + ".jpg",
        sameAs: video.source,
        publisher: { "@id": businessId },
      })),
    ],
  };
  return (
    <>
      <a className="skip-link" href="#icerik">
        {c.ui.skip}
      </a>
      <Header locale={locale} nav={c.nav} actions={c.actions} />
      <main id="icerik">
        <section className="hero" id="baslangic">
          <div className="hero-copy">
            {eyebrow(c.hero.eyebrow)}
            <h1>
              {c.hero.title}
              <br />
              <span>{c.hero.accent}</span>
            </h1>
            <p className="hero-description">{c.hero.description}</p>
            <div className="hero-actions">
              <a className="button" href={links.consultation}>
                {c.actions.consult}
                <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#donusumler">
                {c.actions.discover}
                <ArrowDown size={16} />
              </a>
            </div>
            <p className="hero-note">{c.hero.note}</p>
            <div className="hero-proof">
              {c.hero.details.map((text, i) => (
                <span key={text}>
                  <span className="proof-index">0{i + 1}</span>
                  {text}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <Image
              className="hero-image"
              src="/media/photos/uygulama-01-sonra.jpg"
              alt={`${c.gallery.application} 01 · ${c.gallery.after} · Platin Antalya`}
              width={1320}
              height={2340}
              sizes="(max-width: 700px) 100vw, 52vw"
              priority
              quality={85}
            />
            <div className="hero-photo-shade" />
            <a className="hero-before" href="#donusumler">
              <Image
                src="/media/photos/uygulama-01-once.jpg"
                alt={`${c.gallery.application} 01 · ${c.gallery.before}`}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 94px, 130px"
              />
              <span>
                {c.gallery.before}
                <ArrowUpRight size={12} />
              </span>
            </a>
            <div className="hero-photo-caption">
              <span className="live-dot" />
              {c.hero.photoCaption}
              <span className="hero-photo-number">01 / 09</span>
            </div>
            <span className="vertical-word" aria-hidden="true">
              PLATİN ANTALYA
            </span>
          </div>
        </section>
        <div className="brand-strip" aria-hidden="true">
          <span>PLATİN ANTALYA</span>
          <span>•</span>
          <span>MIKRO KAYNAK</span>
          <span>•</span>
          <span>LARA, ANTALYA</span>
          <span>•</span>
          <span>PLATİN ANTALYA</span>
        </div>

        <section id="donusumler" className="section results-section">
          <div className="section-heading" data-reveal>
            <div>
              {eyebrow(c.gallery.eyebrow)}
              <h2>{c.gallery.title}</h2>
            </div>
            <p>{c.gallery.description}</p>
          </div>
          <Gallery copy={c.gallery} ui={c.ui} />
        </section>

        <section id="mikro-kaynak" className="section intro-section">
          <div className="intro-heading" data-reveal>
            {eyebrow(c.intro.eyebrow)}
            <h2>{c.intro.title}</h2>
          </div>
          <div className="intro-grid">
            <div className="intro-image" data-reveal>
              <Image
                src="/media/photos/uygulama-09-sonra.jpg"
                alt={`${c.gallery.application} 09 · ${c.gallery.after}`}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 90vw, 35vw"
              />
              <span className="image-label">PLATİN ANTALYA</span>
            </div>
            <div className="intro-body" data-reveal>
              <h3>{c.intro.lead}</h3>
              {c.intro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="match-points">
                {c.intro.points.map((p, i) => (
                  <div key={p.title}>
                    <span className="match-number">0{i + 1}</span>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.text}</p>
                    </div>
                    <Plus size={18} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="planning-section">
          <div className="section planning-grid">
            <div className="planning-copy" data-reveal>
              {eyebrow(c.planning.eyebrow)}
              <h2>{c.planning.title}</h2>
              <p className="lead">{c.planning.description}</p>
              <div className="weight-block">
                <p>{c.planning.weightsTitle}</p>
                <div className="weights" dir="ltr">
                  {["0,20", "0,40", "0,60", "0,80"].map((n) => (
                    <span key={n}>
                      {locale === "en" ? n.replace(",", ".") : n}
                      <small>g</small>
                    </span>
                  ))}
                </div>
                <p className="caption">{c.planning.weightsNote}</p>
              </div>
            </div>
            <div className="planning-video" data-reveal>
              <VideoCard
                name="planlama"
                title={c.planning.videoTitle}
                ui={c.ui}
                duration="2:15"
              />
              <p className="caption">{c.planning.videoDescription}</p>
            </div>
            <div className="planning-facts">
              {c.planning.facts.map((f, i) => (
                <div key={f.title} data-reveal>
                  <span>0{i + 1}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section suitability-section">
          <div data-reveal>
            {eyebrow(c.suitability.eyebrow)}
            <h2>{c.suitability.title}</h2>
            <p className="lead">{c.suitability.description}</p>
          </div>
          <div data-reveal>
            <ul className="check-list">
              {c.suitability.items.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="caption">{c.suitability.note}</p>
            <a className="text-link" href={links.consultation}>
              {c.actions.consult}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="hair-section">
          <div className="section">
            <div className="section-heading" data-reveal>
              <div>
                {eyebrow(c.hair.eyebrow)}
                <h2>{c.hair.title}</h2>
              </div>
              <p>{c.hair.description}</p>
            </div>
            <div className="hair-groups">
              {c.hair.groups.map((name, i) => (
                <div
                  className={`hair-group hair-group-${i}`}
                  key={name}
                  data-reveal
                >
                  <div className="hair-art" aria-hidden="true">
                    <svg viewBox="0 0 300 230" fill="none">
                      {Array.from({ length: 32 }, (_, n) => (
                        <path
                          key={n}
                          d={`M ${40 + n * 6} -20 C ${-40 + n * 7} 90, ${155 + n * 5} 150, ${95 + n * 7} 255`}
                          stroke="currentColor"
                          strokeWidth={1 + (n % 3) * 0.25}
                          opacity={0.25 + (n % 4) * 0.15}
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="hair-group-title">
                    <span>0{i + 1}</span>
                    <h3>{name}</h3>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              ))}
            </div>
            <p className="caption">{c.hair.note}</p>
          </div>
        </section>

        <section id="uygulama" className="section process-section">
          <div className="section-heading" data-reveal>
            <div>
              {eyebrow(c.process.eyebrow)}
              <h2>{c.process.title}</h2>
            </div>
            <a className="text-link" href={links.booking}>
              {c.actions.book}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="process-steps">
            {c.process.steps.map((step, i) => (
              <article key={step.title} data-reveal>
                <span className="step-number">
                  0{i + 1}
                  <span />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fiyat" className="price-section">
          <div className="section price-grid">
            <div data-reveal>
              {eyebrow(c.price.eyebrow)}
              <h2>{c.price.title}</h2>
              <p className="lead">{c.price.description}</p>
            </div>
            <div className="price-panel" data-reveal>
              <div className="price-symbol" aria-hidden="true">
                ✳
              </div>
              <ul>
                {c.price.factors.map((factor, i) => (
                  <li key={factor}>
                    <span>0{i + 1}</span>
                    {factor}
                    <Plus size={16} />
                  </li>
                ))}
              </ul>
              <a className="button" href={links.calculator}>
                {c.actions.calculate}
                <ArrowUpRight size={19} />
              </a>
              <p className="caption">{c.price.note}</p>
              <p className="caption calculator-languages">
                {c.price.calculatorLanguages}
              </p>
            </div>
          </div>
        </section>

        <section id="bakim" className="section care-section">
          <div className="section-heading" data-reveal>
            <div>
              {eyebrow(c.care.eyebrow)}
              <h2>{c.care.title}</h2>
            </div>
            <p>{c.care.description}</p>
          </div>
          <div className="care-grid">
            {c.care.items.map((item, i) => (
              <article key={item.title} data-reveal>
                <span className="care-index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="renewal-note" data-reveal>
            <div>
              <span className="eyebrow">PLATİN ANTALYA</span>
              <h3>{c.care.renewalTitle}</h3>
            </div>
            <div>
              <p>{c.care.renewalText}</p>
              <a className="text-link" href={links.whatsapp}>
                {c.actions.whatsapp}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="experience-grid">
            <div className="experience-video" data-reveal>
              <VideoCard
                name="deneyim"
                title={c.care.videoTitle}
                ui={c.ui}
                duration="1:37"
              />
            </div>
            <div className="experience-copy" data-reveal>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <h2>{c.care.videoTitle}</h2>
              <p className="lead">{c.care.videoDescription}</p>
              <p className="caption">{c.care.videoNote}</p>
              <span className="experience-signature">PLATİN ANTALYA</span>
            </div>
          </div>
        </section>

        <section id="sorular" className="faq-section">
          <div className="section faq-layout">
            <div className="faq-heading" data-reveal>
              {eyebrow(c.faq.eyebrow)}
              <h2>{c.faq.title}</h2>
              <p>{c.faq.description}</p>
              <nav className="faq-index" aria-label={c.faq.title}>
                {c.faq.groups.map((group, i) => (
                  <a key={group.title} href={`#soru-grubu-${i}`}>
                    <span>0{i + 1}</span>
                    {group.title}
                    <ArrowDown size={14} />
                  </a>
                ))}
              </nav>
            </div>
            <div className="faq-groups">
              {c.faq.groups.map((group, i) => (
                <div
                  className="faq-group"
                  id={`soru-grubu-${i}`}
                  key={group.title}
                >
                  <h3>
                    <span>0{i + 1}</span>
                    {group.title}
                  </h3>
                  {group.items.map((item) => (
                    <details key={item.q}>
                      <summary>
                        {item.q}
                        <Plus size={19} />
                      </summary>
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="iletisim" className="contact-section">
          <div className="section">
            <div className="contact-top" data-reveal>
              {eyebrow(c.contact.eyebrow)}
              <h2>{c.contact.title}</h2>
              <p>{c.contact.description}</p>
              <div className="contact-actions">
                <a className="button button-light" href={links.consultation}>
                  {c.actions.consult}
                  <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href={links.booking}>
                  {c.actions.book}
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <p className="caption">{c.contact.bookingNote}</p>
            </div>
            <div className="contact-details">
              <div>
                <h3>{c.contact.addressTitle}</h3>
                <p>
                  <bdi dir="ltr">{address}</bdi>
                </p>
                <a className="text-link" href={links.directions}>
                  <MapPin size={15} />
                  {c.actions.directions}
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div>
                <h3>{c.contact.hoursTitle}</h3>
                <p>
                  {c.contact.hours}
                  <br />
                  {c.contact.sunday}
                </p>
              </div>
              <div>
                <a className="contact-phone" href={links.phone} dir="ltr">
                  {phoneDisplay}
                </a>
                <a className="text-link" href={links.whatsapp}>
                  {c.actions.whatsapp}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <a href="#baslangic" aria-label={c.footer.backTop}>
            <Image
              src="/media/logo.png"
              alt="Platin Antalya"
              width={1200}
              height={400}
              sizes="200px"
            />
          </a>
          <p>{c.footer.tagline}</p>
          <div className="social-links" aria-label={c.footer.social}>
            <a href={links.instagram} aria-label="Instagram">
              <Instagram size={21} />
            </a>
            <a href={links.youtube} aria-label="YouTube">
              <Youtube size={23} />
            </a>
            <a href={links.phone} aria-label={c.actions.call}>
              <Phone size={19} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Platin Antalya. {c.footer.rights}
          </span>
          <a href={links.main}>
            {c.footer.source}
            <ArrowUpRight size={12} />
          </a>
          <a href="#baslangic">
            {c.footer.backTop}
            <ArrowUp size={14} />
          </a>
        </div>
      </footer>
      <Reveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
