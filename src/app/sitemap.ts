import type { MetadataRoute } from "next";
import { locales, localePath } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: SITE_URL + localePath(locale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, SITE_URL + localePath(l)]),
      ),
    },
  }));
}
