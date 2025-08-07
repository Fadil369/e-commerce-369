import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { state: authState, logout } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isRTL = i18n.language === 'ar';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-primary-600">
                {t('app.title')}
              </div>
              <div className={`text-sm text-neutral-600 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                {t('app.subtitle')}
              </div>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('navigation.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <MagnifyingGlassIcon 
                  className={`absolute top-2.5 w-5 h-5 text-neutral-400 ${
                    isRTL ? 'right-3' : 'left-3'
                  }`} 
                />
              </div>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              {t('navigation.products')}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" />
              {i18n.language === 'ar' ? 'English' : 'العربية'}
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative text-neutral-700 hover:text-primary-600 p-2"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {authState.isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  <UserIcon className="w-5 h-5 mr-1" />
                  {authState.user?.firstName}
                </button>
                {/* User dropdown would go here */}
                <button
                  onClick={handleLogout}
                  className="ml-2 text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {t('navigation.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('navigation.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <MagnifyingGlassIcon 
                    className={`absolute top-2.5 w-5 h-5 text-neutral-400 ${
                      isRTL ? 'right-3' : 'left-3'
                    }`} 
                  />
                </div>
              </form>

              <Link 
                to="/products" 
                className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.products')}
              </Link>

              <Link 
                to="/cart" 
                className="flex items-center px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                {t('navigation.cart')} ({cartState.itemCount})
              </Link>

              <button
                onClick={toggleLanguage}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
              >
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>

              {authState.isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.account')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
                  >
                    {t('navigation.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 text-base font-medium bg-primary-600 text-white rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;