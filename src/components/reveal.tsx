"use client";
import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => {
      if (node.getBoundingClientRect().top > window.innerHeight) {
        node.classList.add("will-reveal");
        observer.observe(node);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
