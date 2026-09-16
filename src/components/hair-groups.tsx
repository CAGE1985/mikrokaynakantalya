"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import type { HairDetail, HairDetails } from "@/content/hair-details/types";
import { links } from "@/lib/site";
import "./hair-groups.css";

function HairGroup({
  group,
  index,
  detailsLabel,
  closeLabel,
  note,
  consult,
}: {
  group: HairDetail;
  index: number;
  detailsLabel: string;
  closeLabel: string;
  note: string;
  consult: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const restoreScroll = () => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  };
  useEffect(
    () => () => {
      if (previousOverflow.current !== null)
        document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  const open = () => {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    dialog.current.querySelector(".hair-dialog-body")?.scrollTo(0, 0);
  };
  return (
    <>
      <article
        className={`hair-group hair-group-${index} hair-group-interactive`}
        data-reveal
      >
        <div className="hair-art" aria-hidden="true">
          <span className="hair-art-index">0{index + 1}</span>
          <svg viewBox="0 0 360 220" fill="none" focusable="false">
            <defs>
              <linearGradient
                id={`hair-shade-${group.id}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="0.5" stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {Array.from({ length: 52 }, (_, n) => (
              <path
                key={n}
                d={`M ${135 + n * 0.75} -24 C ${100 + n * 1.4} 54, ${225 + n * 1.15} 90, ${148 + n * 1.8} 158 S ${84 + n * 2.9} 218, ${73 + n * 3.3} 258`}
                stroke={`url(#hair-shade-${group.id})`}
                strokeWidth={0.8 + (n % 4) * 0.3}
                opacity={0.35 + (n % 5) * 0.13}
              />
            ))}
          </svg>
        </div>
        <div className="hair-group-title">
          <div className="hair-group-copy">
            <h3 id={`hair-card-${group.id}`}>{group.name}</h3>
            <p className="hair-group-description">{group.closingTitle}</p>
            <button
              ref={opener}
              type="button"
              className="hair-detail-trigger"
              onClick={open}
              aria-haspopup="dialog"
              aria-controls={`hair-dialog-${group.id}`}
              aria-labelledby={`hair-card-${group.id} hair-detail-${group.id}`}
            >
              <span id={`hair-detail-${group.id}`}>{detailsLabel}</span>
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
      <dialog
        ref={dialog}
        id={`hair-dialog-${group.id}`}
        className="hair-dialog"
        aria-labelledby={`hair-title-${group.id}`}
        onClose={() => {
          restoreScroll();
          opener.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            dialog.current?.close();
        }}
      >
        <div className="hair-dialog-header">
          <div>
            <p className="hair-dialog-brand">
              PLATİN ANTALYA <span>·</span> 0{index + 1}
            </p>
            <h2 id={`hair-title-${group.id}`}>{group.name}</h2>
          </div>
          <button
            type="button"
            className="circle-button hair-dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label={closeLabel}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="hair-dialog-body">
          <h3 className="hair-dialog-intro-title">{group.title}</h3>
          {group.intro.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <h3 className="hair-features-heading">{group.featuresTitle}</h3>
          <ol className="hair-features">
            {group.features.map((feature, i) => (
              <li key={feature.title}>
                <span className="hair-feature-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{feature.title}</h4>
                  {feature.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <div className="hair-dialog-summary">
            <h3>{group.closingTitle}</h3>
            {group.closing.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className="hair-dialog-footer">
            <p>{note}</p>
            <a href={links.consultation} className="button">
              {consult}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function HairGroups({
  details,
  note,
  consult,
}: {
  details: HairDetails;
  note: string;
  consult: string;
}) {
  return (
    <div className="hair-groups">
      {details.groups.map((group, index) => (
        <HairGroup
          key={group.id}
          group={group}
          index={index}
          detailsLabel={details.detailsLabel}
          closeLabel={details.closeLabel}
          note={note}
          consult={consult}
        />
      ))}
    </div>
  );
}
