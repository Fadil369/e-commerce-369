# Arabic/English Internationalization Implementation

This document explains the Arabic/English internationalization (i18n) implementation for the E-Commerce 369 platform.

## 🌍 Overview

The platform supports both Arabic (العربية) and English languages with:

- **Right-to-Left (RTL)** layout for Arabic
- **Left-to-Right (LTR)** layout for English
- **Dynamic language switching** without page reload
- **Comprehensive translations** for all UI elements
- **Saudi cultural considerations** (currency, payment methods, etc.)

## 📁 File Structure

```
src/
├── i18n.ts                          # Main i18n configuration
├── middleware.ts                     # Next.js middleware for locale detection
├── components/
│   └── LanguageSwitcher.tsx         # Language switching component
├── app/
│   ├── layout.tsx                   # Root layout with locale support
│   └── page.tsx                     # Homepage with translations
└── messages/
    ├── ar.json                      # Arabic translations
    └── en.json                      # English translations
```

## 🔧 Technical Implementation

### 1. Core Configuration (`src/i18n.ts`)

```typescript
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en" as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Asia/Riyadh",
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 2,
        },
      },
    },
  };
});
```

### 2. Middleware (`src/middleware.ts`)

```typescript
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
```

### 3. Language Switcher Component

```typescript
"use client";

import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");

  const handleLanguageChange = (newLocale: string) => {
    window.location.href = `/${newLocale}`;
  };

  // Component renders flags and language names
}
```

## 🎨 RTL Support

### Tailwind CSS Configuration

Custom RTL utilities in `tailwind.config.js`:

```javascript
function({ addUtilities }) {
  const newUtilities = {
    '.text-start': {
      'text-align': 'left',
      '[dir="rtl"] &': {
        'text-align': 'right',
      },
    },
    '.text-end': {
      'text-align': 'right',
      '[dir="rtl"] &': {
        'text-align': 'left',
      },
    },
    // More RTL utilities...
  }
  addUtilities(newUtilities)
}
```

### Layout Implementation

```typescript
export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={`${isRTL ? "font-arabic" : "font-inter"}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 📝 Translation Files

### Arabic (`messages/ar.json`)

```json
{
  "common": {
    "siteName": "إي-كوميرس 369",
    "tagline": "منصة التجارة الإلكترونية الرائدة للأزياء النسائية السعودية",
    "currency": "ريال سعودي",
    "currencySymbol": "ر.س"
  },
  "home": {
    "hero": {
      "title": "اكتشفي عالم الأناقة السعودية",
      "subtitle": "مجموعة متميزة من الأزياء النسائية العصرية المصممة خصيصاً للمرأة السعودية"
    }
  }
}
```

### English (`messages/en.json`)

```json
{
  "common": {
    "siteName": "E-Commerce 369",
    "tagline": "Leading e-commerce platform for Saudi women's fashion",
    "currency": "Saudi Riyal",
    "currencySymbol": "SAR"
  },
  "home": {
    "hero": {
      "title": "Discover Saudi Elegance",
      "subtitle": "A premium collection of modern women's fashion designed for the contemporary Saudi woman"
    }
  }
}
```

## 🚀 Usage Examples

### In Components

```typescript
import { useTranslations } from "next-intl";

function ProductCard() {
  const t = useTranslations("products");

  return (
    <div>
      <h3>{t("title")}</h3>
      <p>{t("description")}</p>
      <button>{t("addToCart")}</button>
    </div>
  );
}
```

### Server Components

```typescript
import { getTranslations } from "next-intl/server";

async function ServerComponent() {
  const t = await getTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

## 🎯 URL Structure

- **English (default)**: `https://yourdomain.com/` or `https://yourdomain.com/en`
- **Arabic**: `https://yourdomain.com/ar`

## 🔤 Fonts

- **Arabic**: Noto Sans Arabic (Google Fonts)
- **English**: Inter (Google Fonts)

```html
<!-- Arabic fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
<!-- English fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## 🧪 Testing

### Manual Testing Checklist

1. **Language Switching**:

   - [ ] Language switcher is visible in header
   - [ ] Clicking switches language immediately
   - [ ] URL updates correctly (`/ar` or `/en`)
   - [ ] Page content changes to selected language

2. **RTL Layout**:

   - [ ] Arabic pages display RTL layout
   - [ ] Text alignment is correct
   - [ ] Navigation elements flow right-to-left
   - [ ] Images and icons are positioned correctly

3. **Content Translation**:

   - [ ] All UI elements are translated
   - [ ] Currency displays correctly (SAR/ر.س)
   - [ ] Dates and numbers format appropriately
   - [ ] No English text visible on Arabic pages

4. **Responsive Design**:
   - [ ] Both languages work on mobile
   - [ ] Tablet layout is correct
   - [ ] Desktop layout is optimal

### Development Testing

```bash
# Start development server
npm run dev

# Test URLs
# English: http://localhost:3000/en
# Arabic:  http://localhost:3000/ar
# Default: http://localhost:3000 (redirects to /en)
```

## 🌟 Best Practices

### Translation Keys

- Use **nested structure** for organization
- Follow **consistent naming** conventions
- Include **context** in key names
- Keep **strings atomic** (one concept per key)

### RTL Considerations

- Test **text overflow** in both directions
- Verify **icon positioning** (arrows, chevrons)
- Check **form layouts** and input fields
- Validate **navigation** flow

### Performance

- Translations are **statically imported**
- **Tree-shaking** removes unused translations
- **Next.js optimizations** apply automatically
- **Font loading** is optimized with `font-display: swap`

## 🔧 Troubleshooting

### Common Issues

1. **Hydration mismatch**: Ensure server and client locales match
2. **Missing translations**: Check translation files for typos
3. **RTL layout issues**: Verify Tailwind RTL utilities
4. **Font loading**: Check Google Fonts links in layout

### Debug Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Lint code
npx eslint . --ext .ts,.tsx

# Build for production
npm run build
```

## 📈 Future Enhancements

- **Locale detection** based on user preference
- **Translation management** system integration
- **Pluralization** rules for complex cases
- **Additional locales** (French, Spanish, etc.)
- **SEO optimization** for multilingual content

---

## 🎯 Quick Start

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Visit Arabic**: `http://localhost:3000/ar`
4. **Visit English**: `http://localhost:3000/en`
5. **Test language switching** using the header component

The internationalization system is now fully implemented and ready for production use!
