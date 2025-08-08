import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          {t('cart.title')}
        </h1>
        
        {state.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-xl mb-4">
              {t('cart.empty')}
            </p>
            <p className="text-neutral-500">
              ابدئي التسوق لإضافة منتجات إلى سلتك
            </p>
          </div>
        ) : (
          <div>
            <p className="text-neutral-600">
              عدد العناصر: {state.itemCount} | المجموع: {state.total} {t('currency.sar')}
            </p>
            <p className="text-center text-neutral-600 py-10">
              محتويات السلة - قيد التطوير
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;