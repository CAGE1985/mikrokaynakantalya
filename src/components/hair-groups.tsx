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
          <span>0{index + 1}</span>
          <div className="hair-group-copy">
            <h3 id={`hair-card-${group.id}`}>{group.name}</h3>
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
              <Plus size={16} aria-hidden="true" />
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
            <X size={22} />
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
