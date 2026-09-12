# Accessibility and initial resource audit

Run: 2026-09-12T20:13:56.712Z
Base: http://localhost:3013

Production Chrome audit at 390px Turkish/Arabic and 1280px Turkish. All reveal sections were scrolled into view and FAQ answers expanded before axe WCAG 2 A/AA and 2.1 AA analysis. No forms were submitted. Videos remained unplayed during resource measurements; a separate Enter-key check subsequently started and paused the first instructional video.

| Variant | Violation rules | Initial transfer | Transfer after scrolling | Initial / after-scroll video requests |
|---|---:|---:|---:|---:|
| tr-mobile-390 | 0 | 673 KiB | 706 KiB | 0 / 0 |
| ar-mobile-390 | 0 | 1028 KiB | 1060 KiB | 0 / 0 |
| tr-desktop-1280 | 0 | 700 KiB | 794 KiB | 0 / 0 |

## Automated violations

None detected by this automated audit.

## Keyboard video focus

- TR mobile 390: Enter activates the instructional video and transfers focus to its native VIDEO controls — **PASS**. Verified source: `/media/videos/planlama.mp4`.

## Manual review and scope

- Automated axe checks do not establish full WCAG compliance. Incomplete color-contrast checks involving images/gradients and audio/video accessibility require human review.
- Instructional videos contain original Turkish burned-in text. The audit records caption track presence but does not claim that visible text fully transcribes dialogue and non-speech audio.
- Transfer sizes are observed cold-context local production loading without network/CPU throttling; they are not a Lighthouse performance score or field Core Web Vitals.
- Full resource lists, selectors, contrast measurements and manual-review candidates are in `tests/accessibility-qa-report.json`.
