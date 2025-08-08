import { getRequestConfig } from "next-intl/server";

export const locales = ["ar", "en"] as const;
export const defaultLocale = "ar" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is supported
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "Asia/Riyadh",
    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 2,
        },
      },
    },
  };
});
