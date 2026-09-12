"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, Play, X } from "lucide-react";
import type { Content } from "@/content/types";

const numbers = Array.from({ length: 9 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
export function Gallery({
  copy,
  ui,
}: {
  copy: Content["gallery"];
  ui: Content["ui"];
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const dialog = useRef<HTMLDialogElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const number = numbers[index];
  const choose = (next: number) => {
    setIndex((next + 9) % 9);
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
      strip.scrollBy({ left: delta, behavior: "smooth" });
    }
  }, [index]);
  const open = () => {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
  };
  return (
    <div className="gallery">
      <div className="gallery-toolbar">
        <span className="case-label">
          {copy.application} <b>{number}</b>
          <span className="soft"> / 09</span>
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
          <>
            <button
              className="comparison-photo"
              onClick={open}
              aria-label={`${copy.open} · ${copy.application} ${number} · ${copy.before}`}
            >
              <Image
                key={`before-${number}`}
                src={`/media/photos/uygulama-${number}-once.jpg`}
                alt={`${copy.application} ${number} — ${copy.before}`}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 46vw, 42vw"
              />
              <span className="image-label">{copy.before}</span>
              <Expand className="expand-icon" size={18} />
            </button>
            <button
              className="comparison-photo"
              onClick={open}
              aria-label={`${copy.open} · ${copy.application} ${number} · ${copy.after}`}
            >
              <Image
                key={`after-${number}`}
                src={`/media/photos/uygulama-${number}-sonra.jpg`}
                alt={`${copy.application} ${number} — ${copy.after}`}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 46vw, 42vw"
              />
              <span className="image-label">{copy.after}</span>
              <Expand className="expand-icon" size={18} />
            </button>
          </>
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
            aria-label={`${copy.application} ${number} · ${copy.video}`}
          >
            <a href={`/media/videos/uygulama-${number}.mp4`}>
              {ui.videoUnsupported}
            </a>
          </video>
        )}
      </div>
      <div className="gallery-bottom">
        <div className="gallery-thumbnails" aria-label={copy.title}>
          {numbers.map((n, i) => (
            <button
              key={n}
              ref={i === index ? activeThumb : undefined}
              className={i === index ? "selected" : ""}
              aria-label={`${copy.application} ${n}`}
              aria-pressed={i === index}
              onClick={() => choose(i)}
            >
              <Image
                src={`/media/photos/uygulama-${n}-sonra.jpg`}
                alt=""
                width={84}
                height={108}
                sizes="70px"
              />
              <span>{n}</span>
            </button>
          ))}
        </div>
        <div className="gallery-arrows">
          <button
            className="circle-button"
            aria-label={copy.previous}
            onClick={() => choose(index - 1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="circle-button"
            aria-label={copy.next}
            onClick={() => choose(index + 1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <p className="caption gallery-note">{copy.note}</p>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={`${copy.application} ${number}`}
      >
        <button
          className="dialog-close circle-button"
          onClick={close}
          aria-label={copy.close}
        >
          <X />
        </button>
        <div className="dialog-pair">
          {(["once", "sonra"] as const).map((kind, i) => (
            <figure key={kind}>
              <Image
                src={`/media/photos/uygulama-${number}-${kind}.jpg`}
                alt={`${copy.application} ${number} — ${i ? copy.after : copy.before}`}
                width={1320}
                height={2340}
                sizes="(max-width: 700px) 45vw, 40vw"
              />
              <figcaption className="image-label">
                {i ? copy.after : copy.before}
              </figcaption>
            </figure>
          ))}
        </div>
      </dialog>
    </div>
  );
}
