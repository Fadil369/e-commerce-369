export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  brand?: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image?: string
  parentId?: string
  children?: Category[]
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'customer' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
  user: Pick<User, 'firstName' | 'lastName'>
}