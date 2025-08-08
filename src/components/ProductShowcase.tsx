"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations("common");

  const categories = [
    { id: "all", name: "All", icon: "✨" },
    { id: "dresses", name: "Dresses", icon: "👗" },
    { id: "abayas", name: "Abayas", icon: "🧥" },
    { id: "hijabs", name: "Hijabs", icon: "🧕" },
    { id: "accessories", name: "Accessories", icon: "💎" }
  ];

  const products = [
    {
      id: 1,
      name: "Elegant Rose Dress",
      price: "299 SAR",
      originalPrice: "399 SAR",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba02fe4?q=80&w=800",
      category: "dresses",
      badge: "New",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "Premium Black Abaya",
      price: "449 SAR",
      originalPrice: "549 SAR", 
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800",
      category: "abayas",
      badge: "Bestseller",
      rating: 4.9,
      reviews: 156
    },
    {
      id: 3,
      name: "Silk Hijab Collection",
      price: "89 SAR",
      originalPrice: "120 SAR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
      category: "hijabs",
      badge: "Sale",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: "Special Occasion Dress",
      price: "599 SAR",
      originalPrice: "799 SAR",
      image: "https://images.unsplash.com/photo-1566479179817-0d95bef17c60?q=80&w=800",
      category: "dresses",
      badge: "Limited",
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      name: "Designer Abaya",
      price: "699 SAR",
      originalPrice: "899 SAR",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800",
      category: "abayas",
      badge: "Premium",
      rating: 4.8,
      reviews: 43
    },
    {
      id: 6,
      name: "Gold Jewelry Set",
      price: "199 SAR",
      originalPrice: "299 SAR",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
      category: "accessories",
      badge: "New",
      rating: 4.6,
      reviews: 78
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const getBadgeColor = (badge) => {
    const colors = {
      "New": "bg-gradient-to-r from-emerald-500 to-teal-500",
      "Bestseller": "bg-gradient-to-r from-rose-500 to-pink-500",
      "Sale": "bg-gradient-to-r from-orange-500 to-red-500",
      "Limited": "bg-gradient-to-r from-purple-500 to-indigo-500",
      "Premium": "bg-gradient-to-r from-yellow-500 to-amber-500"
    };
    return colors[badge] || "bg-gray-500";
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-purple-50 rounded-full border border-rose-200">
            <span className="text-sm font-medium text-gray-700">Featured Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            <span className="block">Discover Our</span>
            <span className="block bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Latest Collection
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked designs that blend traditional elegance with modern sophistication
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg mr-2">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 ${getBadgeColor(product.badge)} text-white text-xs font-semibold rounded-full`}>
                  {product.badge}
                </div>
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                  <svg className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[1,2,3,4,5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Save {Math.round((parseInt(product.originalPrice) - parseInt(product.price)) / parseInt(product.originalPrice) * 100)}%
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L7 13m0 0L5.4 5M7 13l-2.293 2.293a1 1 0 001.414 1.414L7 16m0-3v5a2 2 0 002 2h8a2 2 0 002-2v-5" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto">
            <span>View All Products</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
