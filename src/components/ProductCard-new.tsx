interface ProductCardProps {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly originalPrice?: number;
  readonly image: string;
  readonly category: string;
  readonly isNew?: boolean;
  readonly isSale?: boolean;
  readonly rating?: number;
  readonly reviews?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isSale = false,
  rating = 0,
  reviews = 0,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👗</span>
            </div>
            <p className="text-gray-500 text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-50 transition-colors"
            aria-label="Add to wishlist"
          >
            <svg
              className="w-4 h-4 text-gray-600 hover:text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-50 transition-colors"
            aria-label="Quick view"
          >
            <svg
              className="w-4 h-4 text-gray-600 hover:text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={`star-${id}-${i}`}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2 rtl:ml-0 rtl:mr-2">
              ({reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-lg font-bold text-gray-900">{price} SAR</span>
            {Boolean(originalPrice) && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice} SAR
              </span>
            )}
          </div>

          {Boolean(isSale && originalPrice) && (
            <span className="text-sm font-semibold text-red-600">
              -{Math.round(((originalPrice! - price) / originalPrice!) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
