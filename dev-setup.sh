#!/bin/bash

# Development setup and testing script for E-Commerce 369
# This script sets up the development environment and tests the internationalization

echo "🚀 Starting E-Commerce 369 Development Setup..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for required environment files
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Database Configuration
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Payment Gateways
STRIPE_PUBLIC_KEY="pk_test_your_stripe_public_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
PAYPAL_CLIENT_ID="your_paypal_client_id"

# Saudi Payment Gateways
MADA_MERCHANT_ID="your_mada_merchant_id"
STC_PAY_API_KEY="your_stc_pay_api_key"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"

# Cloudflare (for production)
CLOUDFLARE_ACCOUNT_ID="your_cloudflare_account_id"
CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"

# Next.js Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
    echo "✅ Created .env.local with default values. Please update with your actual credentials."
fi

# Run type checking
echo "🔍 Running TypeScript type check..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found. Please fix them before continuing."
    exit 1
fi

# Run linting
echo "🧹 Running ESLint..."
npx eslint . --ext .ts,.tsx --fix

# Build the project to check for any build issues
echo "🏗️  Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"

# Test internationalization
echo "🌍 Testing internationalization..."
echo "  - Arabic (ar) locale: http://localhost:3000/ar"
echo "  - English (en) locale: http://localhost:3000/en"
echo "  - Default locale: http://localhost:3000"

# Start development server
echo "🚀 Starting development server..."
echo "📱 Open your browser and navigate to:"
echo "   • English: http://localhost:3000/en"
echo "   • Arabic:  http://localhost:3000/ar"
echo ""
echo "🧪 To test language switching:"
echo "   1. Visit the homepage"
echo "   2. Click the language switcher in the header"
echo "   3. Verify that the content changes between Arabic and English"
echo "   4. Check that Arabic pages display RTL layout"
echo ""
echo "🛑 Press Ctrl+C to stop the development server"
echo ""

npm run dev
