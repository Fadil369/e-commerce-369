import { Product } from '@/types'

// Mock product data - in a real app, this would come from a database
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and crystal-clear sound.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'AudioTech',
    inStock: true,
    stockQuantity: 50,
    rating: 4.8,
    reviewCount: 124,
    tags: ['wireless', 'noise-cancellation', 'premium'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3f436f25d4d1?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'FitTech',
    inStock: true,
    stockQuantity: 75,
    rating: 4.6,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'health'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support and adjustable height.',
    price: 449.99,
    originalPrice: 599.99,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop'
    ],
    category: 'Furniture',
    subcategory: 'Office',
    brand: 'ComfortSeating',
    inStock: true,
    stockQuantity: 25,
    rating: 4.7,
    reviewCount: 67,
    tags: ['ergonomic', 'office', 'comfortable'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '50mm f/1.8 portrait lens for professional photography with stunning bokeh.',
    price: 599.99,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop'
    ],
    category: 'Photography',
    subcategory: 'Lenses',
    brand: 'LensCraft',
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 203,
    tags: ['photography', 'professional', 'portrait'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '5',
    name: 'Premium Coffee Machine',
    description: 'Automatic espresso machine with built-in grinder and milk frother.',
    price: 899.99,
    originalPrice: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&h=500&fit=crop'
    ],
    category: 'Kitchen',
    subcategory: 'Appliances',
    brand: 'BrewMaster',
    inStock: false,
    stockQuantity: 0,
    rating: 4.5,
    reviewCount: 156,
    tags: ['coffee', 'espresso', 'automatic'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Gaming',
    brand: 'GamePro',
    inStock: true,
    stockQuantity: 100,
    rating: 4.4,
    reviewCount: 312,
    tags: ['gaming', 'wireless', 'rgb'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01')
  }
]

export function getProducts(): Product[] {
  return mockProducts
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}