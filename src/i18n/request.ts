import { getRequestConfig } from "next-intl/server";
import { isLocale } from "./routing";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  return {
    locale: requested && isLocale(requested) ? requested : "tr",
    messages: {},
  };
});
