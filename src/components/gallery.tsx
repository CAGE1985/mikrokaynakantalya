"use client";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Expand,
  Play,
  X,
} from "lucide-react";
import type { Content } from "@/content/types";
import type { GalleryCase } from "@/content/gallery-cases";
import type { Locale } from "@/i18n/routing";
import "./gallery.css";

const labels: Record<Locale, { all: string; browse: string }> = {
  tr: {
    all: "Tüm uygulama açıklamaları",
    browse: "Kaydırın veya okları kullanın",
  },
  en: { all: "All application details", browse: "Swipe or use the arrows" },
  ru: {
    all: "Подробнее обо всех работах",
    browse: "Листайте или используйте стрелки",
  },
  de: {
    all: "Alle Anwendungen im Detail",
    browse: "Wischen oder Pfeile verwenden",
  },
  ar: { all: "تفاصيل جميع التطبيقات", browse: "اسحبي أو استخدمي الأسهم" },
};

type SwipeStart = { x: number; y: number; vertical: boolean };

export function Gallery({
  copy,
  ui,
  cases,
  locale,
}: {
  copy: Content["gallery"];
  ui: Content["ui"];
  cases: GalleryCase[];
  locale: Locale;
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const swipe = useRef<SwipeStart | null>(null);
  const current = cases[index];
  const number = current.id;
  const rtl = locale === "ar";
  const total = String(cases.length).padStart(2, "0");

  const choose = (next: number) => {
    setIndex((next + cases.length) % cases.length);
    setMode("photo");
  };
  const step = (delta: number) => {
    setIndex((value) => (value + delta + cases.length) % cases.length);
    setMode("photo");
  };

  useEffect(() => {
    const thumb = activeThumb.current;
    const strip = thumb?.parentElement;
    if (thumb && strip) {
      const delta =
        thumb.getBoundingClientRect().left -
        strip.getBoundingClientRect().left -
        strip.clientWidth / 2 +
        thumb.clientWidth / 2;
      strip.scrollBy({
        left: delta,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [index]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const updateZoom = () => setZoomed((viewport?.scale ?? 1) > 1.01);
    updateZoom();
    viewport?.addEventListener("resize", updateZoom);
    return () => {
      viewport?.removeEventListener("resize", updateZoom);
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  const open = (event: MouseEvent<HTMLButtonElement>, next?: number) => {
    if (next !== undefined) choose(next);
    opener.current = event.currentTarget;
    if (!dialog.current?.open) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.current?.showModal();
    }
  };
  const finishClose = () => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    swipe.current = null;
    if (opener.current?.isConnected)
      opener.current.focus({ preventScroll: true });
  };
  const close = () => dialog.current?.close();
  const handleKeys = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      const physicalDirection = event.key === "ArrowRight" ? 1 : -1;
      step(rtl ? -physicalDirection : physicalDirection);
    }
  };
  const startSwipe = (event: TouchEvent<HTMLDivElement>) => {
    if (
      event.touches.length !== 1 ||
      (window.visualViewport?.scale ?? 1) > 1.01
    ) {
      swipe.current = null;
      return;
    }
    const touch = event.touches[0];
    swipe.current = { x: touch.clientX, y: touch.clientY, vertical: false };
  };
  const moveSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (!start) return;
    if (event.touches.length !== 1) {
      swipe.current = null;
      return;
    }
    const touch = event.touches[0];
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);
    if (dy > 14 && dy > dx) start.vertical = true;
  };
  const endSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (
      !start ||
      start.vertical ||
      event.touches.length ||
      !event.changedTouches[0]
    )
      return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const direction = dx < 0 ? 1 : -1;
    step(rtl ? -direction : direction);
  };

  return (
    <div className="gallery gallery-with-details">
      <div className="gallery-toolbar">
        <span className="case-label">
          {copy.application} <b>{number}</b>
          <span className="soft" dir="ltr">
            {" "}
            / {total}
          </span>
        </span>
        <div className="segmented" role="group" aria-label={copy.application}>
          <button
            aria-pressed={mode === "photo"}
            onClick={() => setMode("photo")}
          >
            {copy.photo}
          </button>
          <button
            aria-pressed={mode === "video"}
            onClick={() => setMode("video")}
          >
            <Play size={12} />
            {copy.video}
          </button>
        </div>
      </div>
      <div className={`gallery-stage ${mode === "video" ? "is-video" : ""}`}>
        {mode === "photo" ? (
          (["once", "sonra"] as const).map((kind, position) => (
            <button
              key={kind}
              className="comparison-photo"
              onClick={open}
              aria-label={`${copy.open} · ${current.title} · ${position ? copy.after : copy.before}`}
            >
              <Image
                key={`${kind}-${number}`}
                src={`/media/photos/uygulama-${number}-${kind}.jpg`}
                alt={position ? current.afterAlt : current.beforeAlt}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 46vw, 42vw"
              />
              <span className="image-label">
                {position ? copy.after : copy.before}
              </span>
              <Expand className="expand-icon" size={18} />
            </button>
          ))
        ) : (
          <video
            key={number}
            className="transformation-video"
            src={`/media/videos/uygulama-${number}.mp4`}
            poster={`/media/photos/uygulama-${number}-sonra.jpg`}
            controls
            playsInline
            autoPlay
            preload="metadata"
            aria-label={`${current.title} · ${copy.video}`}
          >
            <a href={`/media/videos/uygulama-${number}.mp4`}>
              {ui.videoUnsupported}
            </a>
          </video>
        )}
      </div>
      <div
        className="gallery-active-story"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="gallery-story-number" dir="ltr">
          {number} / {total}
        </span>
        <div>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
        </div>
      </div>
      <div className="gallery-bottom">
        <div
          className="gallery-thumbnails"
          role="group"
          aria-label={copy.title}
        >
          {cases.map((item, i) => (
            <button
              key={item.id}
              ref={i === index ? activeThumb : undefined}
              className={i === index ? "selected" : ""}
              aria-label={`${copy.application} ${item.id} · ${item.title}`}
              aria-pressed={i === index}
              onClick={() => choose(i)}
            >
              <Image
                src={`/media/photos/uygulama-${item.id}-sonra.jpg`}
                alt=""
                width={84}
                height={108}
                sizes="70px"
              />
              <span>{item.id}</span>
            </button>
          ))}
        </div>
        <div className="gallery-arrows">
          <button
            className="circle-button"
            aria-label={copy.previous}
            onClick={() => step(-1)}
          >
            {rtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </button>
          <button
            className="circle-button"
            aria-label={copy.next}
            onClick={() => step(1)}
          >
            {rtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      </div>
      <p className="caption gallery-note">{copy.note}</p>
      <details className="gallery-case-directory">
        <summary>
          <span>{labels[locale].all}</span>
          <span className="gallery-directory-count" dir="ltr">
            {total}
          </span>
          <ChevronDown size={17} />
        </summary>
        <ol className="gallery-case-list">
          {cases.map((item, i) => (
            <li key={item.id} id={`uygulama-${item.id}`}>
              <div className="gallery-directory-pair">
                {(["once", "sonra"] as const).map((kind, position) => (
                  <figure key={kind}>
                    <Image
                      src={`/media/photos/uygulama-${item.id}-${kind}.jpg`}
                      alt={position ? item.afterAlt : item.beforeAlt}
                      width={1320}
                      height={2340}
                      sizes="(max-width: 700px) 42vw, (max-width: 1000px) 22vw, 15vw"
                    />
                    <figcaption>
                      {position ? copy.after : copy.before}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <span className="gallery-story-number">
                {copy.application} {item.id}
              </span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <button
                className="text-link"
                onClick={(event) => open(event, i)}
                aria-label={`${copy.open} · ${item.title}`}
              >
                {copy.open}
                <Expand size={15} />
              </button>
            </li>
          ))}
        </ol>
      </details>
      <dialog
        ref={dialog}
        className="gallery-dialog gallery-detail-dialog"
        onClose={finishClose}
        onKeyDown={handleKeys}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-labelledby="gallery-dialog-title"
        aria-describedby="gallery-dialog-description"
      >
        <div className="gallery-detail-shell">
          <div className="gallery-detail-topbar">
            <span className="gallery-detail-brand">PLATİN ANTALYA</span>
            <span className="gallery-detail-counter" dir="ltr">
              {number} / {total}
            </span>
            <button
              className="dialog-close circle-button"
              onClick={close}
              aria-label={copy.close}
              autoFocus
            >
              <X size={22} />
            </button>
          </div>
          <div
            className={`gallery-detail-media${zoomed ? " gallery-detail-zoomed" : ""}`}
            onTouchStart={startSwipe}
            onTouchMove={moveSwipe}
            onTouchEnd={endSwipe}
            onTouchCancel={() => {
              swipe.current = null;
            }}
          >
            <div className="dialog-pair gallery-detail-pair" key={number}>
              {(["once", "sonra"] as const).map((kind, position) => (
                <figure key={kind}>
                  <Image
                    src={`/media/photos/uygulama-${number}-${kind}.jpg`}
                    alt={position ? current.afterAlt : current.beforeAlt}
                    width={1320}
                    height={2340}
                    sizes="(max-width: 700px) 48vw, 42vw"
                    draggable={false}
                  />
                  <figcaption className="image-label">
                    {position ? copy.after : copy.before}
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              className="gallery-detail-arrow gallery-detail-previous"
              aria-label={copy.previous}
              onClick={() => step(-1)}
            >
              {rtl ? <ArrowRight size={23} /> : <ArrowLeft size={23} />}
            </button>
            <button
              className="gallery-detail-arrow gallery-detail-next"
              aria-label={copy.next}
              onClick={() => step(1)}
            >
              {rtl ? <ArrowLeft size={23} /> : <ArrowRight size={23} />}
            </button>
          </div>
          <div
            className="gallery-detail-story"
            aria-live="polite"
            aria-atomic="true"
          >
            <h2 id="gallery-dialog-title">{current.title}</h2>
            <p id="gallery-dialog-description">{current.description}</p>
          </div>
          <p className="gallery-detail-hint">{labels[locale].browse}</p>
        </div>
      </dialog>
    </div>
  );
}
