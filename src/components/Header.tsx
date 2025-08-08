"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
                <span className="text-white font-bold text-lg lg:text-xl">369</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-rose-800 to-purple-800 bg-clip-text text-transparent">
                {t("siteName")}
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 font-medium">{t("tagline")}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <a
              href="/"
              className="relative text-gray-700 hover:text-rose-600 font-medium transition-all duration-200 group py-2"
            >
              {t("home")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <div className="relative group">
              <button className="text-gray-700 hover:text-rose-600 font-medium transition-colors flex items-center py-2">
                {t("categories")}
                <svg
                  className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 transform group-hover:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shop by Category</p>
                </div>
                {[
                  { name: "Elegant Dresses", icon: "👗", href: "/dresses", desc: "Modern & Traditional" },
                  { name: "Luxury Abayas", icon: "🧥", href: "/abayas", desc: "Premium Collection" },
                  { name: "Hijabs & Scarves", icon: "🧕", href: "/hijabs", desc: "Designer Pieces" },
                  { name: "Accessories", icon: "💎", href: "/accessories", desc: "Complete Your Look" },
                  { name: "Special Occasions", icon: "✨", href: "/special", desc: "Exclusive Events" }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 hover:text-rose-600 transition-all duration-200 group/item"
                  >
                    <span className="text-xl mr-3 rtl:mr-0 rtl:ml-3">{item.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium block">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.desc}</span>
                    </div>
                    <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <a href="/collections" className="relative text-gray-700 hover:text-rose-600 font-medium transition-all duration-200 group py-2">
              New Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <a href="/about" className="relative text-gray-700 hover:text-rose-600 font-medium transition-all duration-200 group py-2">
              {t("about")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 lg:space-x-3 rtl:space-x-reverse">
            
            {/* Search */}
            <button className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
            </button>

            {/* Wishlist */}
            <button className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">2</span>
            </button>

            {/* Cart */}
            <button className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L7 13m0 0L5.4 5M7 13l-2.293 2.293a1 1 0 001.414 1.414L7 16m0-3v5a2 2 0 002 2h8a2 2 0 002-2v-5" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
            </button>

            {/* Account */}
            <button className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            <div className="space-y-1">
              {[
                { name: t("home"), href: "/" },
                { name: t("categories"), href: "/categories" },
                { name: "New Collections", href: "/collections" },
                { name: t("about"), href: "/about" },
                { name: t("contact"), href: "/contact" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 hover:text-rose-600 font-medium rounded-xl mx-2 transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 px-4 border-t border-gray-200 mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
