"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Menu, X } from "lucide-react";
import type { Content } from "@/content/types";
import { localePath, type Locale } from "@/i18n/routing";
import { links } from "@/lib/site";

export const sections = [
  "donusumler",
  "mikro-kaynak",
  "uygulama",
  "bakim",
  "fiyat",
  "sorular",
] as const;
const nativeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  ar: "العربية",
};
const flags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  ru: "🇷🇺",
  de: "🇩🇪",
  ar: "🇸🇦",
};
export function Header({
  locale,
  nav,
  actions,
}: {
  locale: Locale;
  nav: Content["nav"];
  actions: Content["actions"];
}) {
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState(false);
  const [active, setActive] = useState("");
  const [hash, setHash] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const languageButton = useRef<HTMLButtonElement>(null);
  const labels = [
    nav.results,
    nav.method,
    nav.process,
    nav.care,
    nav.price,
    nav.faq,
  ];
  useEffect(() => {
    const readHash = () => setHash(location.hash);
    readHash();
    window.addEventListener("hashchange", readHash);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    sections.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", readHash);
    };
  }, []);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (language) {
          setLanguage(false);
          languageButton.current?.focus();
        } else if (menu) {
          setMenu(false);
          menuButton.current?.focus();
        }
      }
      if (menu && event.key === "Tab") {
        const items = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".site-header a,.site-header button:not(.language-dismiss),.mobile-menu a",
          ),
        ).filter((el) => el.offsetParent !== null);
        const first = items[0],
          last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [menu, language]);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main,.site-footer,.mobile-actions",
      ),
    );
    background.forEach((el) => (el.inert = true));
    document.querySelector<HTMLAnchorElement>(".mobile-menu a")?.focus();
    const media = window.matchMedia("(max-width:850px)");
    const resize = () => {
      if (!media.matches) setMenu(false);
    };
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((el) => (el.inert = false));
      media.removeEventListener("change", resize);
    };
  }, [menu]);
  const visitSection = (id: string) => {
    setMenu(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const section = document.getElementById(id);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      }),
    );
  };
  return (
    <>
      <header className="site-header">
        <a
          href={localePath(locale)}
          className="brand"
          aria-label={`Platin Antalya · ${nav.home}`}
        >
          <Image
            src="/media/logo.png"
            alt="Platin Antalya"
            width={1200}
            height={400}
            loading="eager"
            sizes="(max-width: 600px) 135px, 164px"
          />
        </a>
        <nav className="desktop-nav" aria-label={nav.menu}>
          {sections.map((id, i) => (
            <a
              href={`#${id}`}
              className={active === id ? "active" : ""}
              key={id}
            >
              {labels[i]}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div className="language-control">
            <button
              ref={languageButton}
              className="language-toggle"
              aria-label={`${nav.language} (${locale.toUpperCase()})`}
              aria-expanded={language}
              aria-controls="language-list"
              onClick={() => setLanguage(!language)}
            >
              <span className="language-flag" aria-hidden="true">
                {flags[locale]}
              </span>
              {locale.toUpperCase()}
              <ChevronDown size={12} />
            </button>
            {language && (
              <>
                <button
                  className="language-dismiss"
                  aria-label={nav.close}
                  onClick={() => setLanguage(false)}
                />
                <div id="language-list" className="language-list">
                  {Object.entries(nativeNames).map(([key, name]) => (
                    <a
                      key={key}
                      href={`${localePath(key as Locale)}${hash}`}
                      lang={key}
                      dir={key === "ar" ? "rtl" : "ltr"}
                      hrefLang={key}
                      aria-current={key === locale ? "page" : undefined}
                    >
                      <span className="language-name">
                        <span className="language-flag" aria-hidden="true">
                          {flags[key as Locale]}
                        </span>
                        {name}
                      </span>
                      {key === locale && <Check size={14} />}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
          <a
            className="button button-small header-consult"
            href={links.consultation}
          >
            {actions.consult}
            <ArrowUpRight size={15} />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            onClick={() => {
              setMenu(!menu);
              setLanguage(false);
            }}
            aria-label={menu ? nav.close : nav.menu}
            aria-expanded={menu}
            aria-controls="mobile-menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav id="mobile-menu" className="mobile-menu" aria-label={nav.menu}>
          {sections.map((id, i) => (
            <a href={`#${id}`} key={id} onClick={() => visitSection(id)}>
              <span className="menu-number">0{i + 1}</span>
              {labels[i]}
              <ArrowUpRight />
            </a>
          ))}
          <a className="button" href={links.consultation}>
            {actions.consult}
            <ArrowUpRight size={18} />
          </a>
          <p>PLATİN ANTALYA · LARA</p>
        </nav>
      )}
      <div className="mobile-actions">
        <a href={links.consultation}>
          {actions.mobileConsult}
          <ArrowUpRight size={17} />
        </a>
        <a href="#fiyat">{actions.mobilePrice}</a>
      </div>
    </>
  );
}
