import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const featuredProducts = [
    {
      id: '1',
      name: { ar: 'عباءة أنيقة', en: 'Elegant Abaya' },
      price: 299,
      image: 'https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=عباءة+أنيقة',
      category: 'abayas'
    },
    {
      id: '2',
      name: { ar: 'حجاب حريري', en: 'Silk Hijab' },
      price: 89,
      image: 'https://via.placeholder.com/300x400/EC4899/FFFFFF?text=حجاب+حريري',
      category: 'hijabs'
    },
    {
      id: '3',
      name: { ar: 'فستان محتشم', en: 'Modest Dress' },
      price: 199,
      image: 'https://via.placeholder.com/300x400/10B981/FFFFFF?text=فستان+محتشم',
      category: 'dresses'
    },
    {
      id: '4',
      name: { ar: 'حقيبة يد فاخرة', en: 'Luxury Handbag' },
      price: 450,
      image: 'https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=حقيبة+فاخرة',
      category: 'bags'
    }
  ];

  const categories = [
    { key: 'abayas', image: 'https://via.placeholder.com/250x250/8B5CF6/FFFFFF?text=عباءات' },
    { key: 'dresses', image: 'https://via.placeholder.com/250x250/EC4899/FFFFFF?text=فساتين' },
    { key: 'hijabs', image: 'https://via.placeholder.com/250x250/10B981/FFFFFF?text=حجاب' },
    { key: 'accessories', image: 'https://via.placeholder.com/250x250/F59E0B/FFFFFF?text=إكسسوارات' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('app.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              {t('app.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {t('navigation.products')}
              </Link>
              <Link
                to="/products?category=abayas"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('categories.abayas')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('navigation.categories')}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              اكتشفي مجموعتنا المتنوعة من الأزياء النسائية المصممة خصيصاً للمرأة السعودية العصرية
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.key}
                to={`/products?category=${category.key}`}
                className="group bg-neutral-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={category.image}
                  alt={t(`categories.${category.key}`)}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-neutral-900">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-neutral-600">
              أحدث التصاميم والموضة النسائية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name.ar}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    {product.name.ar}
                  </h3>
                  <p className="text-primary-600 font-bold">
                    {product.price} {t('currency.sar')}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                شحن مجاني
              </h3>
              <p className="text-neutral-600">
                شحن مجاني للطلبات فوق 200 ريال سعودي
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary-600 text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                دفع آمن
              </h3>
              <p className="text-neutral-600">
                طرق دفع متنوعة وآمنة: مدى، STC Pay، بطاقات ائتمان
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                دعم على مدار الساعة
              </h3>
              <p className="text-neutral-600">
                فريق خدمة العملاء متاح لمساعدتك في أي وقت
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;