import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    return stars
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                E-Commerce 369
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-primary-600">
                Products
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-primary-600">
                Categories
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-primary-600">
                Cart (0)
              </Link>
              <Link 
                href="/login" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
                  SALE
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">Out of Stock</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-white">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-lg text-gray-600">by {product.brand}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-lg font-medium text-gray-900">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Category</dt>
                  <dd className="text-gray-700">{product.category}</dd>
                </div>
                {product.subcategory && (
                  <div>
                    <dt className="font-medium text-gray-900">Subcategory</dt>
                    <dd className="text-gray-700">{product.subcategory}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium text-gray-900">Stock</dt>
                  <dd className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">SKU</dt>
                  <dd className="text-gray-700">#{product.id.toUpperCase()}</dd>
                </div>
              </dl>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  disabled={!product.inStock}
                >
                  {Array.from({ length: Math.min(10, product.stockQuantity) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    product.inStock
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="mt-12">
          <Link
            href="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
      </main>
    </div>
  )
}