"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-xl">
                369
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                {t("siteName")}
              </h1>
              <p className="text-xs lg:text-sm text-gray-600">{t("tagline")}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <a
              href="/"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              {t("home")}
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-rose-600 font-medium transition-colors flex items-center">
                {t("categories")}
                <svg
                  className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a
                  href="/dresses"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600"
                >
                  {t("categories")} - Dresses
                </a>
                <a
                  href="/abayas"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600"
                >
                  Abayas
                </a>
                <a
                  href="/accessories"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600"
                >
                  Accessories
                </a>
              </div>
            </div>
            <a
              href="/about"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              {t("about")}
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              {t("contact")}
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L7 13m0 0L5.4 5M7 13l-2.293 2.293a1 1 0 001.414 1.414L7 16m0-3v5a2 2 0 002 2h8a2 2 0 002-2v-5"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Account */}
            <button className="p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-rose-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <a
                href="/"
                className="block text-gray-700 hover:text-rose-600 font-medium"
              >
                {t("home")}
              </a>
              <a
                href="/categories"
                className="block text-gray-700 hover:text-rose-600 font-medium"
              >
                {t("categories")}
              </a>
              <a
                href="/about"
                className="block text-gray-700 hover:text-rose-600 font-medium"
              >
                {t("about")}
              </a>
              <a
                href="/contact"
                className="block text-gray-700 hover:text-rose-600 font-medium"
              >
                {t("contact")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
