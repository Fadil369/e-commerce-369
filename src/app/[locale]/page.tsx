import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage(props: HomePageProps) {
  const t = useTranslations("common");
  const tHome = useTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">
                  369
                </span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t("siteName")}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  {t("tagline")}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-rose-200 to-purple-200 rounded-full transform translate-x-16 -translate-y-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full transform -translate-x-12 translate-y-12 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                    {tHome("hero.title")}
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {tHome("hero.subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
                  {tHome("hero.shopNow")}
                </button>
                <button className="border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 active:scale-95">
                  {tHome("hero.exploreCollection")}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 rtl:space-x-reverse pt-6 lg:pt-8">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    {tHome("features.freeShipping")}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    {tHome("features.authenticProducts")}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-purple-400/20 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-rose-100 via-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 bg-gradient-to-br from-rose-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl lg:text-4xl">
                        👗
                      </span>
                    </div>
                    <p className="text-rose-600 font-medium text-sm sm:text-base">
                      {tHome("hero.comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              {tHome("features.title")}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              {tHome("features.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 lg:p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-blue-600 text-2xl sm:text-3xl">🚚</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                {tHome("features.freeShipping")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {tHome("features.freeShippingDesc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 lg:p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-green-600 text-2xl sm:text-3xl">💳</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                {tHome("features.securePayment")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {tHome("features.securePaymentDesc")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 lg:p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-purple-600 text-2xl sm:text-3xl">✨</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                {tHome("features.authenticProducts")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {tHome("features.authenticProductsDesc")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 lg:p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-orange-600 text-2xl sm:text-3xl">📞</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                {tHome("features.customerSupport")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {tHome("features.customerSupportDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              {tHome("categories.title")}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              {tHome("categories.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Category 1 - Dresses */}
            <div className="group cursor-pointer">
              <div className="relative h-48 sm:h-64 lg:h-80 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="w-full h-full bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center z-10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">
                      👗
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                      {tHome("categories.dresses")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2 - Abayas */}
            <div className="group cursor-pointer">
              <div className="relative h-48 sm:h-64 lg:h-80 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center z-10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">
                      🧕
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                      {tHome("categories.abayas")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3 - Accessories */}
            <div className="group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="relative h-48 sm:h-64 lg:h-80 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center z-10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">
                      👜
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                      {tHome("categories.accessories")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 rtl:space-x-reverse mb-4 lg:mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">369</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold">
                  {t("siteName")}
                </span>
              </div>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-sm mx-auto sm:mx-0">
                {t("tagline")}
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h5 className="font-bold text-lg mb-4 lg:mb-6">
                {t("quickLinks")}
              </h5>
              <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("home")}
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("products")}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("about")}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h5 className="font-bold text-lg mb-4 lg:mb-6">{t("support")}</h5>
              <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-400">
                <li>
                  <a
                    href="/help"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("help")}
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("shipping")}
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("returns")}
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {t("privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center">
            <p className="text-gray-400 text-sm lg:text-base">
              © 2025 {t("siteName")}. {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
