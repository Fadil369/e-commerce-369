import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const AccountPage: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-600 py-20">
            يرجى تسجيل الدخول للوصول إلى صفحة الحساب
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          {t('account.profile')}
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">مرحباً، {state.user?.firstName}</h2>
          <p className="text-neutral-600">
            البريد الإلكتروني: {state.user?.email}
          </p>
          <p className="text-neutral-600">
            رقم الهاتف: {state.user?.phone}
          </p>
          <p className="text-center text-neutral-600 py-10">
            تفاصيل الحساب - قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;