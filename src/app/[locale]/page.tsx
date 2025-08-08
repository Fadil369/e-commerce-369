import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage(props: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Suspense fallback={<div className="h-screen bg-gray-50 animate-pulse"></div>}>
          <HeroSection />
        </Suspense>

        {/* Product Showcase */}
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
          <ProductShowcase />
        </Suspense>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Why Choose Us?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the perfect blend of tradition and innovation in Saudi women's fashion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Free Shipping",
                  description: "Free delivery across Saudi Arabia for orders above 200 SAR",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: "🔄",
                  title: "Easy Returns",
                  description: "30-day hassle-free return policy for your peace of mind",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: "⭐",
                  title: "Premium Quality",
                  description: "Handpicked fabrics and materials for lasting elegance",
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  icon: "🎨",
                  title: "Custom Designs",
                  description: "Exclusive designs tailored for the modern Saudi woman",
                  color: "from-rose-500 to-pink-500"
                },
                {
                  icon: "💳",
                  title: "Secure Payments",
                  description: "Multiple payment options including MADA, STC Pay, and more",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: "📞",
                  title: "24/7 Support",
                  description: "Round-the-clock customer service in Arabic and English",
                  color: "from-teal-500 to-cyan-500"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from satisfied customers across Saudi Arabia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "فاطمة الأحمد",
                  location: "الرياض",
                  rating: 5,
                  comment: "أجمل التصاميم وجودة عالية جداً. خدمة العملاء ممتازة والتوصيل سريع.",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b8d5?q=80&w=150"
                },
                {
                  name: "نورا السالم",
                  location: "جدة",
                  rating: 5,
                  comment: "منتجات رائعة تجمع بين الأناقة والراحة. أنصح بها بشدة لكل امرأة سعودية.",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                },
                {
                  name: "سارة المطيري",
                  location: "الدمام",
                  rating: 5,
                  comment: "تجربة تسوق مميزة ومنتجات عالية الجودة. سأستمر في الشراء من هنا.",
                  image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=150"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-right">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Ready to Transform Your Style?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover your perfect look today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  Start Shopping Now
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Browse Collections
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
