"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Menu, X } from "lucide-react";
import type { Content } from "@/content/types";
import { localePath, type Locale } from "@/i18n/routing";
import { links } from "@/lib/site";
import "./header.css";

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
  const menuDialog = useRef<HTMLDialogElement>(null);
  const languageButton = useRef<HTMLButtonElement>(null);
  const languageList = useRef<HTMLElement>(null);
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
    if (!language) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguage(false);
        languageButton.current?.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [language]);

  useEffect(() => {
    if (!menu) return;
    const dialog = menuDialog.current;
    if (!dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(max-width:1120px)");
    const resize = () => {
      if (!media.matches) setMenu(false);
    };
    media.addEventListener("change", resize);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", resize);
    };
  }, [menu]);

  const closeMenu = () => {
    setMenu(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  };
  const visitSection = (id: string) => {
    setMenu(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const section = document.getElementById(id);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      });
    });
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
            sizes="(max-width: 700px) 142px, 154px"
          />
        </a>
        <nav className="desktop-nav" aria-label={nav.menu}>
          {sections.map((id, i) => (
            <a
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              key={id}
            >
              {labels[i]}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div
            className="language-control"
            onBlur={(event) => {
              if (
                event.relatedTarget instanceof Node &&
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                setLanguage(false);
              }
            }}
          >
            <button
              ref={languageButton}
              className="language-toggle"
              type="button"
              aria-label={`${nav.language} (${locale.toUpperCase()})`}
              aria-expanded={language}
              aria-controls="language-list"
              onClick={() => setLanguage(!language)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setLanguage(true);
                  requestAnimationFrame(() =>
                    languageList.current?.querySelector("a")?.focus(),
                  );
                }
              }}
            >
              <span className="language-flag" aria-hidden="true">
                {flags[locale]}
              </span>
              <span>{locale.toUpperCase()}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {language && (
              <>
                <button
                  type="button"
                  className="language-dismiss"
                  aria-label={nav.close}
                  tabIndex={-1}
                  onClick={() => setLanguage(false)}
                />
                <nav
                  ref={languageList}
                  id="language-list"
                  className="language-list"
                  aria-label={nav.language}
                >
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
                      {key === locale && <Check size={16} aria-hidden="true" />}
                    </a>
                  ))}
                </nav>
              </>
            )}
          </div>
          <a className="button header-consult" href={links.consultation}>
            {actions.consult}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            onClick={() => {
              setMenu(true);
              setLanguage(false);
            }}
            aria-label={nav.menu}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            <Menu size={23} aria-hidden="true" />
          </button>
        </div>
      </header>

      {menu && (
        <dialog
          ref={menuDialog}
          id="mobile-menu"
          className="mobile-menu"
          aria-label={nav.menu}
          onCancel={(event) => {
            event.preventDefault();
            closeMenu();
          }}
        >
          <div className="mobile-menu-masthead">
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
                sizes="142px"
              />
            </a>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label={nav.close}
              onClick={closeMenu}
              autoFocus
            >
              <X size={23} aria-hidden="true" />
            </button>
          </div>
          <div className="mobile-menu-content">
            <p className="mobile-menu-eyebrow">PLATİN ANTALYA · LARA</p>
            <nav className="mobile-menu-links" aria-label={nav.menu}>
              {sections.map((id, i) => (
                <a
                  href={`#${id}`}
                  key={id}
                  onClick={() => visitSection(id)}
                  aria-current={active === id ? "location" : undefined}
                >
                  <span className="menu-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>{labels[i]}</span>
                  <ArrowUpRight size={23} aria-hidden="true" />
                </a>
              ))}
            </nav>
            <nav className="mobile-menu-languages" aria-label={nav.language}>
              {Object.entries(nativeNames).map(([key, name]) => (
                <a
                  key={key}
                  href={`${localePath(key as Locale)}${hash}`}
                  lang={key}
                  dir={key === "ar" ? "rtl" : "ltr"}
                  hrefLang={key}
                  aria-current={key === locale ? "page" : undefined}
                >
                  <span className="language-flag" aria-hidden="true">
                    {flags[key as Locale]}
                  </span>
                  {name}
                </a>
              ))}
            </nav>
            <a className="button mobile-menu-consult" href={links.consultation}>
              {actions.consult}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </dialog>
      )}

      <div className="mobile-actions">
        <a href={links.consultation}>
          <span>{actions.mobileConsult}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a href="#fiyat">{actions.mobilePrice}</a>
      </div>
    </>
  );
}
