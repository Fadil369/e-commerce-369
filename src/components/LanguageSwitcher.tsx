"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { locales, type Locale } from "../i18n";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({
  className = "",
}: Readonly<LanguageSwitcherProps>) {
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // Simple page reload with new locale
    window.location.href = `/${newLocale}`;
  };

  const getLanguageName = (locale: Locale) => {
    const names = {
      ar: "العربية",
      en: "English",
    };
    return names[locale];
  };

  const getCurrentLanguageFlag = (locale: Locale) => {
    const flags = {
      ar: "🇸🇦",
      en: "🇺🇸",
    };
    return flags[locale];
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        dir="ltr"
      >
        <span className="mr-2">{getCurrentLanguageFlag(currentLocale)}</span>
        <span>{getLanguageName(currentLocale)}</span>
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  locale === currentLocale
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
                role="menuitem"
                dir="ltr"
              >
                <span className="mr-3">{getCurrentLanguageFlag(locale)}</span>
                <span>{getLanguageName(locale)}</span>
                {locale === currentLocale && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
