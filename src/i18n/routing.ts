import { defineRouting } from "next-intl/routing";
export const locales = ["tr", "en", "ru", "de", "ar"] as const;
export type Locale = (typeof locales)[number];
export const routing = defineRouting({
  locales,
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,
  // The page metadata supplies canonical-domain alternates for every locale.
  alternateLinks: false,
});
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const localePath = (locale: Locale) =>
  locale === "tr" ? "/" : `/${locale}`;
