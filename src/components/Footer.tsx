"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">369</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t("siteName")}</h3>
                <p className="text-gray-400 text-sm">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your premier destination for authentic Saudi women's fashion. We blend traditional elegance with contemporary style.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: "Instagram", icon: "📷", href: "#" },
                { name: "WhatsApp", icon: "💬", href: "#" },
                { name: "Twitter", icon: "🐦", href: "#" },
                { name: "TikTok", icon: "🎵", href: "#" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-rose-500 hover:to-purple-500 rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Story", href: "/story" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns", href: "/returns" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                >
                  <span className="border-b border-transparent group-hover:border-rose-400">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Categories</h4>
            <div className="space-y-3">
              {[
                { name: "Elegant Dresses", href: "/dresses", icon: "👗" },
                { name: "Luxury Abayas", href: "/abayas", icon: "🧥" },
                { name: "Designer Hijabs", href: "/hijabs", icon: "🧕" },
                { name: "Accessories", href: "/accessories", icon: "💎" },
                { name: "Special Events", href: "/special", icon: "✨" },
                { name: "New Arrivals", href: "/new", icon: "🆕" }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="border-b border-transparent group-hover:border-rose-400">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-300">Get the latest fashion updates and exclusive offers.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
                <button className="absolute right-2 top-2 px-4 py-1.5 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-300">We Accept</h5>
              <div className="flex space-x-2">
                {[
                  { name: "MADA", color: "from-green-500 to-emerald-500" },
                  { name: "STC", color: "from-purple-500 to-indigo-500" },
                  { name: "VISA", color: "from-blue-500 to-cyan-500" },
                  { name: "MC", color: "from-red-500 to-pink-500" }
                ].map((payment) => (
                  <div
                    key={payment.name}
                    className={`px-3 py-1.5 bg-gradient-to-r ${payment.color} text-white text-xs font-semibold rounded-lg`}
                  >
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 E-Commerce 369. Made with ❤️ in Saudi Arabia. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" }
              ].map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                  {index < 2 && <span className="ml-6 text-gray-600">|</span>}
                </span>
              ))}
            </div>

            {/* Language & Currency */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>🌍</span>
                <span>العربية / English</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>💰</span>
                <span>SAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
      </div>
    </footer>
  );
}
