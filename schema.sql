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

-- Shopping cart table (for persistent carts)
CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    size TEXT,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER REFERENCES orders(id),
    payment_method TEXT NOT NULL,
    transaction_id TEXT UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    provider_response TEXT, -- JSON object
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT OR IGNORE INTO categories (name_ar, name_en, description_ar, description_en) VALUES
('عبايات', 'Abayas', 'عبايات أنيقة للمرأة العصرية', 'Elegant abayas for modern women'),
('فساتين', 'Dresses', 'فساتين عصرية ومحتشمة', 'Modern and modest dresses'),
('بلوزات', 'Blouses', 'بلوزات أنيقة للعمل والمناسبات', 'Elegant blouses for work and occasions'),
('اكسسوارات', 'Accessories', 'اكسسوارات تكمل إطلالتك', 'Accessories to complete your look');

-- Insert sample products
INSERT OR IGNORE INTO products (name_ar, name_en, description_ar, description_en, price, category, sku, stock_quantity, image_urls, sizes, colors, featured) VALUES
('عباية سوداء كلاسيكية', 'Classic Black Abaya', 'عباية سوداء أنيقة مصنوعة من قماش عالي الجودة', 'Elegant black abaya made from high-quality fabric', 299.99, 'عبايات', 'AB001', 50, '["https://example.com/abaya1.jpg"]', '["S", "M", "L", "XL"]', '["أسود", "أزرق داكن"]', TRUE),
('فستان ورقي أنيق', 'Elegant Floral Dress', 'فستان بطبعة ورقية جميلة ومحتشم', 'Beautiful floral print modest dress', 189.99, 'فساتين', 'DR001', 30, '["https://example.com/dress1.jpg"]', '["S", "M", "L"]', '["وردي", "أزرق"]', TRUE),
('بلوزة حريرية', 'Silk Blouse', 'بلوزة حريرية فاخرة للمناسبات الخاصة', 'Luxurious silk blouse for special occasions', 159.99, 'بلوزات', 'BL001', 25, '["https://example.com/blouse1.jpg"]', '["S", "M", "L", "XL"]', '["أبيض", "كريمي", "ذهبي"]', FALSE);
