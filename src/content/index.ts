import { tr } from "./tr";
import type { Content } from "./types";
import type { Locale } from "@/i18n/routing";
export async function getContent(locale: Locale): Promise<Content> {
  if (locale === "tr") return tr;
  const content = await import(`./${locale}`);
  return content[locale];
}
