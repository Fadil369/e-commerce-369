import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-primary-400 mb-4">
              {t('app.title')}
            </div>
            <p className="text-neutral-300 mb-4 max-w-md">
              {t('app.subtitle')} - منصة رائدة للأزياء النسائية في المملكة العربية السعودية
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons - placeholder */}
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm">ف</span>
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm">ت</span>
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm">إ</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('navigation.categories')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=abayas" className="text-neutral-300 hover:text-primary-400">
                  {t('categories.abayas')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=dresses" className="text-neutral-300 hover:text-primary-400">
                  {t('categories.dresses')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=hijabs" className="text-neutral-300 hover:text-primary-400">
                  {t('categories.hijabs')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-neutral-300 hover:text-primary-400">
                  {t('categories.accessories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-400">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-primary-400">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-primary-400">
                  {t('footer.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm font-semibold text-neutral-400 mb-2">طرق الدفع المتاحة</h4>
              <div className="flex space-x-4">
                <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">MADA</span>
                </div>
                <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">VISA</span>
                </div>
                <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">MC</span>
                </div>
                <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">STC</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-neutral-400 text-sm">
                © 2025 {t('app.title')}. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;