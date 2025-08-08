#!/bin/bash

# Cloudflare Deployment Script for E-Commerce 369
# This script deploys the Saudi women's e-commerce platform to Cloudflare

set -e

echo "🚀 Starting Cloudflare deployment for E-Commerce 369..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found. Installing...${NC}"
    npm install -g wrangler
fi

# Check authentication
echo -e "${BLUE}🔐 Checking Cloudflare authentication...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not authenticated with Cloudflare. Please run: wrangler login${NC}"
    exit 1
fi

# Build the Next.js application
echo -e "${BLUE}🔧 Building Next.js application...${NC}"
npm run build

# Create necessary directories
mkdir -p functions/api

# Deploy to Cloudflare Pages
echo -e "${BLUE}📦 Deploying to Cloudflare Pages...${NC}"

# Check if this is production deployment
if [ "$1" = "production" ]; then
    echo -e "${GREEN}🏭 Deploying to PRODUCTION environment...${NC}"
    wrangler pages deploy dist --project-name=e-commerce-369 --env=production
else
    echo -e "${YELLOW}🧪 Deploying to STAGING environment...${NC}"
    wrangler pages deploy dist --project-name=e-commerce-369 --env=staging
fi

# Create KV namespaces if they don't exist
echo -e "${BLUE}🗄️  Setting up KV namespaces...${NC}"

# Sessions KV namespace
if ! wrangler kv:namespace list | grep -q "e-commerce-sessions"; then
    echo -e "${YELLOW}Creating sessions KV namespace...${NC}"
    wrangler kv:namespace create "e-commerce-sessions"
    wrangler kv:namespace create "e-commerce-sessions" --preview
fi

# Cache KV namespace
if ! wrangler kv:namespace list | grep -q "e-commerce-cache"; then
    echo -e "${YELLOW}Creating cache KV namespace...${NC}"
    wrangler kv:namespace create "e-commerce-cache"
    wrangler kv:namespace create "e-commerce-cache" --preview
fi

# Create D1 database if it doesn't exist
echo -e "${BLUE}🗃️  Setting up D1 database...${NC}"
if [ "$1" = "production" ]; then
    DB_NAME="e-commerce-369-prod"
else
    DB_NAME="e-commerce-369-staging"
fi

if ! wrangler d1 list | grep -q "$DB_NAME"; then
    echo -e "${YELLOW}Creating D1 database: $DB_NAME${NC}"
    wrangler d1 create "$DB_NAME"
fi

# Create R2 bucket if it doesn't exist
echo -e "${BLUE}🪣 Setting up R2 bucket...${NC}"
if [ "$1" = "production" ]; then
    BUCKET_NAME="e-commerce-369-assets-prod"
else
    BUCKET_NAME="e-commerce-369-assets-staging"
fi

if ! wrangler r2 bucket list | grep -q "$BUCKET_NAME"; then
    echo -e "${YELLOW}Creating R2 bucket: $BUCKET_NAME${NC}"
    wrangler r2 bucket create "$BUCKET_NAME"
fi

# Set up database schema
echo -e "${BLUE}🏗️  Setting up database schema...${NC}"
cat << 'EOF' > schema.sql
-- E-Commerce 369 Database Schema for Saudi Women's Fashion Platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    preferred_language TEXT DEFAULT 'ar',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table with Arabic support
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    image_urls TEXT, -- JSON array of image URLs
    sizes TEXT, -- JSON array of available sizes
    colors TEXT, -- JSON array of available colors
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    shipping_address TEXT NOT NULL, -- JSON object
    billing_address TEXT NOT NULL, -- JSON object
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    size TEXT,
    color TEXT
);

-- Categories table with Arabic names
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    parent_id INTEGER REFERENCES categories(id),
    active BOOLEAN DEFAULT TRUE
);

-- Insert sample categories
INSERT OR IGNORE INTO categories (name_ar, name_en, description_ar, description_en) VALUES
('عبايات', 'Abayas', 'عبايات أنيقة للمرأة العصرية', 'Elegant abayas for modern women'),
('فساتين', 'Dresses', 'فساتين عصرية ومحتشمة', 'Modern and modest dresses'),
('بلوزات', 'Blouses', 'بلوزات أنيقة للعمل والمناسبات', 'Elegant blouses for work and occasions'),
('اكسسوارات', 'Accessories', 'اكسسوارات تكمل إطلالتك', 'Accessories to complete your look');

-- Insert sample products
INSERT OR IGNORE INTO products (name_ar, name_en, description_ar, description_en, price, category, sku, stock_quantity, image_urls, sizes, colors, featured) VALUES
('عباية سوداء كلاسيكية', 'Classic Black Abaya', 'عباية سوداء أنيقة مناسبة لجميع المناسبات', 'Elegant black abaya suitable for all occasions', 299.99, 'abayas', 'AB001', 50, '["https://example.com/abaya1.jpg"]', '["S","M","L","XL"]', '["أسود","كحلي"]', true),
('فستان أزرق محتشم', 'Modest Blue Dress', 'فستان أزرق جميل مناسب للمناسبات الرسمية', 'Beautiful blue dress suitable for formal occasions', 199.99, 'dresses', 'DR001', 30, '["https://example.com/dress1.jpg"]', '["S","M","L"]', '["أزرق","أخضر"]', true);
EOF

wrangler d1 execute "$DB_NAME" --file=schema.sql

# Clean up
rm schema.sql

# Deploy Workers (API functions)
echo -e "${BLUE}⚙️  Deploying Workers...${NC}"
if [ "$1" = "production" ]; then
    wrangler deploy --env=production
else
    wrangler deploy --env=staging
fi

# Final success message
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your Saudi women's e-commerce platform is now live on Cloudflare!${NC}"

if [ "$1" = "production" ]; then
    echo -e "${GREEN}📍 Production URL: https://e-commerce-369.pages.dev${NC}"
    echo -e "${GREEN}🔗 API URL: https://api.e-commerce-369.workers.dev${NC}"
else
    echo -e "${YELLOW}📍 Staging URL: https://e-commerce-369-staging.pages.dev${NC}"
    echo -e "${YELLOW}🔗 API URL: https://api-staging.e-commerce-369.workers.dev${NC}"
fi

echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Configure your custom domain in Cloudflare Pages"
echo -e "  2. Set up SSL/TLS encryption"
echo -e "  3. Configure Saudi payment gateways (MADA, STC Pay)"
echo -e "  4. Test Arabic/English language switching"
echo -e "  5. Upload product images to R2 bucket"
echo -e "${GREEN}🎉 Happy selling to the Saudi market!${NC}"
