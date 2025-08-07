import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          {t('navigation.products')}
        </h1>
        <p className="text-center text-neutral-600 py-20">
          صفحة المنتجات - قيد التطوير
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;