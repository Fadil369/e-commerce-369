import React from 'react';
import { useTranslation } from 'react-i18next';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">
            {t('auth.register.title')}
          </h2>
          <p className="mt-2 text-neutral-600">
            انضمي إلى {t('app.title')} وابدئي رحلة التسوق
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="text-center text-neutral-600">
            صفحة التسجيل - قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;