# Independent mobile browser QA

Status: the 10 menu-focus failures recorded in this baseline were fixed by the main agent. The targeted follow-up in [MOBILE-QA-RECHECK.md](./MOBILE-QA-RECHECK.md) passed all 250 checks. No unresolved functional bug remains from this audit.

The full baseline covered 598 checks across TR, EN, RU, DE and AR at 390×844 and 320×740. Apart from the subsequently fixed menu focus, checks passed for document width, section links, locale/hash switching, FAQ structure and keyboard interaction, cases 03/09 photo and video paths, video metadata loading, deferred video requests, dialog closing/focus/scroll restoration and existing external destinations. All 26 FAQ items were toggled in TR; every locale was checked for all 26 populated native details elements and representative keyboard toggles.

Current mobile and desktop screenshots were inspected visually. The fixed header, mobile action bar and RTL layout remain within the viewport. Earlier element screenshots were replaced by viewport screenshots to avoid sticky-header capture artifacts. External booking destinations were inspected without submitting forms.

Run: 2026-09-12T20:05:08.717Z
Base: http://localhost:3012
Command: `node tests/mobile-qa.mjs`

- tr-390: 102/103 checks passed
- en-390: 54/55 checks passed
- ru-390: 54/55 checks passed
- de-390: 54/55 checks passed
- ar-390: 54/55 checks passed
- tr-320: 54/55 checks passed
- en-320: 54/55 checks passed
- ru-320: 54/55 checks passed
- de-320: 54/55 checks passed
- ar-320: 54/55 checks passed

## Failed checks

- **tr-390: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **en-390: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **ru-390: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **de-390: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **ar-390: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **tr-320: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **en-320: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **ru-320: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **de-320: Escape restores menu trigger focus** — {"tag":"BODY","class":""}
- **ar-320: Escape restores menu trigger focus** — {"tag":"BODY","class":""}

Screenshots and full output: `tests/artifacts/mobile-qa/`. External links were inspected, not submitted.
