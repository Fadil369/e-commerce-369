# Cloudflare Deployment Guide for E-Commerce 369

This guide will help you deploy your Saudi women's e-commerce platform to Cloudflare Pages and Workers.

## 🚀 Quick Start

### Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Node.js**: Version 18 or higher

### One-Command Deployment

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## 📋 Step-by-Step Setup

### 1. Authentication

```bash
# Login to Cloudflare
wrangler login

# Verify authentication
wrangler whoami
```

### 2. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Cloudflare credentials:
   ```bash
   # Get your account ID from Cloudflare dashboard
   CLOUDFLARE_ACCOUNT_ID=your-account-id
   
   # Create API token with appropriate permissions
   CLOUDFLARE_API_TOKEN=your-api-token
   ```

### 3. Configure wrangler.toml

Update the following IDs in `wrangler.toml` after creating resources:

```toml
# Replace with your actual IDs
[[env.production.kv_namespaces]]
binding = "SESSIONS"
id = "your-actual-kv-namespace-id"

[[env.production.d1_databases]]
binding = "DB"
database_id = "your-actual-d1-database-id"
```

### 4. Saudi Payment Gateway Setup

#### MADA Configuration
1. Register with MADA payment gateway
2. Obtain merchant credentials
3. Update environment variables:
   ```bash
   MADA_MERCHANT_ID=your-mada-merchant-id
   MADA_API_KEY=your-mada-api-key
   MADA_SECRET_KEY=your-mada-secret-key
   ```

#### STC Pay Configuration
1. Register with STC Pay
2. Get API credentials
3. Configure in environment:
   ```bash
   STC_PAY_MERCHANT_ID=your-stc-pay-merchant-id
   STC_PAY_API_KEY=your-stc-pay-api-key
   ```

### 5. Database Setup

The deployment script automatically creates and configures:
- D1 database with Arabic-friendly schema
- Sample product categories in Arabic and English
- User management tables
- Order processing tables

### 6. Custom Domain (Optional)

1. Add your domain to Cloudflare Pages
2. Configure DNS records
3. Enable SSL/TLS

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Cloudflare     │    │  Cloudflare      │    │  Cloudflare     │
│  Pages          │◄──►│  Workers         │◄──►│  D1 Database    │
│  (Frontend)     │    │  (API)           │    │  (Data)         │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Cloudflare     │    │  Cloudflare      │    │  External       │
│  R2 Storage     │    │  KV Store        │    │  Payment APIs   │
│  (Images)       │    │  (Sessions)      │    │  (MADA/STC)     │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📊 Performance Features

- **Global CDN**: Cloudflare's 300+ edge locations
- **Edge Caching**: Automatic caching of static assets
- **Image Optimization**: Cloudflare Images for product photos
- **Arabic Font Loading**: Optimized for RTL text rendering
- **Mobile Optimization**: Perfect for Saudi mobile users

## 🔒 Security Features

- **DDoS Protection**: Built-in Cloudflare security
- **SSL/TLS**: Automatic HTTPS encryption
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Sanitized user inputs
- **CORS Protection**: Controlled cross-origin requests

## 🛠️ Development Workflow

### Local Development
```bash
# Start local development
npm run dev

# Test with Wrangler locally
wrangler pages dev dist --compatibility-date=2024-12-01
```

### Staging Deployment
```bash
# Deploy to staging environment
npm run deploy:staging

# View staging logs
wrangler tail --env=staging
```

### Production Deployment
```bash
# Deploy to production
npm run deploy:production

# Monitor production
wrangler tail --env=production
```

## 📱 Saudi Market Optimization

### Language Support
- **Arabic RTL**: Right-to-left text layout
- **Dual Language**: Arabic and English support
- **Font Loading**: Optimized Arabic fonts
- **URL Structure**: Arabic-friendly URLs

### Payment Integration
- **MADA**: Saudi national payment system
- **STC Pay**: Mobile wallet integration
- **Stripe**: International card payments
- **PayPal**: Global payment option

### Local Features
- **SAR Currency**: Saudi Riyal pricing
- **VAT Calculation**: 15% Saudi VAT
- **Shipping Zones**: Major Saudi cities
- **Mobile First**: Optimized for Saudi mobile usage

## 🔧 Troubleshooting

### Common Issues

1. **Authentication Failed**
   ```bash
   wrangler logout
   wrangler login
   ```

2. **KV Namespace Not Found**
   ```bash
   wrangler kv:namespace create "e-commerce-sessions"
   # Update wrangler.toml with the returned ID
   ```

3. **D1 Database Issues**
   ```bash
   wrangler d1 list
   wrangler d1 execute your-db-name --file=schema.sql
   ```

4. **Build Errors**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### Support Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## 📈 Monitoring and Analytics

### Built-in Monitoring
```bash
# View real-time logs
wrangler tail

# Check analytics
wrangler analytics

# View KV usage
wrangler kv:namespace list
```

### Performance Monitoring
- **Core Web Vitals**: Lighthouse integration
- **Real User Monitoring**: Cloudflare Analytics
- **Error Tracking**: Worker exception logging
- **API Performance**: Response time monitoring

## 🎯 Next Steps

1. **Custom Domain**: Set up your branded domain
2. **Payment Testing**: Test all payment methods
3. **Content Upload**: Add your product catalog
4. **SEO Optimization**: Configure meta tags and sitemaps
5. **Marketing**: Set up analytics and tracking
6. **Mobile App**: Consider React Native companion app

---

Built with ❤️ for the Saudi market using Cloudflare's edge computing platform.
