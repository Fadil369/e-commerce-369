"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const heroSlides = [
    {
      title: "Elegant Saudi Fashion",
      subtitle: "Discover the latest collection designed for the modern Saudi woman",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba02fe4?q=80&w=2070",
      cta: "Shop Now",
      accent: "from-rose-500 to-pink-500"
    },
    {
      title: "Premium Abayas",
      subtitle: "Luxury meets tradition in our exclusive abaya collection",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2070",
      cta: "Explore Collection",
      accent: "from-purple-500 to-indigo-500"
    },
    {
      title: "Special Occasions",
      subtitle: "Perfect outfits for your most important moments",
      image: "https://images.unsplash.com/photo-1566479179817-0d95bef17c60?q=80&w=2070",
      cta: "View Dresses",
      accent: "from-emerald-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-14 h-14 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-50 animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-purple-50 rounded-full border border-rose-200">
              <span className="w-2 h-2 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">New Collection 2025</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-rose-800 to-purple-800 bg-clip-text text-transparent">
                  {t("heroTitle")}
                </span>
                <span className={`block bg-gradient-to-r ${heroSlides[currentSlide].accent} bg-clip-text text-transparent`}>
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium max-w-2xl">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className={`group relative px-8 py-4 bg-gradient-to-r ${heroSlides[currentSlide].accent} text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
                <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300 flex items-center justify-center">
                <span>View Catalog</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Products" },
                { number: "4.9", label: "Customer Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent`}></div>
                </div>
              ))}
              
              {/* Image Overlay Elements */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Free Shipping</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">2.5K+ Reviews</div>
                    <div className="flex items-center">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? `bg-gradient-to-r ${heroSlides[currentSlide].accent}` 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
