import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function HomePage() {
  const t = useTranslations("common");
  const tHome = useTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">369</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t("siteName")}
                </h1>
                <p className="text-sm text-gray-600">{t("tagline")}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  {tHome("hero.title")}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {tHome("hero.subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {tHome("hero.shopNow")}
                </button>
                <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                  {tHome("hero.exploreCollection")}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 rtl:space-x-reverse pt-8">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-saudi-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {tHome("features.freeShipping")}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-saudi-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {tHome("features.authenticProducts")}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary-200 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 text-3xl">👗</span>
                    </div>
                    <p className="text-primary-600 font-medium">
                      {tHome("hero.comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-saudi-gold rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400 rounded-full opacity-30 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {tHome("features.title")}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tHome("features.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 text-2xl">🚚</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {tHome("features.freeShipping")}
              </h4>
              <p className="text-gray-600 text-sm">
                {tHome("features.freeShippingDesc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-secondary-600 text-2xl">💳</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {tHome("features.securePayment")}
              </h4>
              <p className="text-gray-600 text-sm">
                {tHome("features.securePaymentDesc")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {tHome("features.authenticProducts")}
              </h4>
              <p className="text-gray-600 text-sm">
                {tHome("features.authenticProductsDesc")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-2xl">📞</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {tHome("features.customerSupport")}
              </h4>
              <p className="text-gray-600 text-sm">
                {tHome("features.customerSupportDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {tHome("categories.title")}
            </h3>
            <p className="text-xl text-gray-600">
              {tHome("categories.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 - Dresses */}
            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">👗</span>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {tHome("categories.dresses")}
                    </h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Category 2 - Abayas */}
            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">🧕</span>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {tHome("categories.abayas")}
                    </h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Category 3 - Accessories */}
            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">👜</span>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {tHome("categories.accessories")}
                    </h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">369</span>
                </div>
                <span className="text-xl font-bold">{t("siteName")}</span>
              </div>
              <p className="text-gray-400 text-sm">{t("tagline")}</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t("quickLinks")}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    {t("home")}
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    {t("products")}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    {t("about")}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    {t("contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t("support")}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    {t("help")}
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="hover:text-white transition-colors"
                  >
                    {t("shipping")}
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="hover:text-white transition-colors"
                  >
                    {t("returns")}
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    {t("privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 {t("siteName")}. {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
