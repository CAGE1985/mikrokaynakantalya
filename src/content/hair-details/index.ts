import type { Locale } from "@/i18n/routing";
import type { HairDetails } from "./types";
import { tr } from "./tr";
import { en } from "./en";
import { de } from "./de";
import { ru } from "./ru";
import { ar } from "./ar";

const content: Record<Locale, HairDetails> = { tr, en, de, ru, ar };

export async function getHairDetails(locale: Locale): Promise<HairDetails> {
  return content[locale];
}
