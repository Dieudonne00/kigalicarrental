import { Metadata } from "next";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Kigali Car Rentals Blog | Rwanda Travel Tips & Car Hire Guides",
  description:
    "Discover expert car rental tips, Rwanda travel guides, and insider advice from Kigali Car Rentals. Learn everything about self-drive adventures, safaris, road trips, and renting a car in Kigali.",
  keywords:
    "Kigali car rentals blog, Rwanda car rental tips, Kigali car hire guide, Rwanda travel tips, self drive Rwanda, car rental Kigali blog, Rwanda road trip guide, safari car hire Rwanda",
  openGraph: {
    title: "Kigali Car Rentals Blog | Travel Tips & Car Hire Guides in Rwanda",
    description:
      "Expert travel guides, car rental tips, and Rwanda road trip advice from Kigali Car Rentals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rentals Blog | Rwanda Travel & Car Hire Tips",
    description:
      "Smart tips and expert guides for renting cars and exploring Rwanda with confidence.",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section - Modern Design */}
      <section className="relative min-h-[500px] md:min-h-[650px] flex items-center justify-center overflow-hidden">
        
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A]/95 via-[#1E3A8A]/85 to-[#0B1F3A]/95 z-10"></div>
        
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dxn12qcje/image/upload/cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          {/* Animated Badge */}
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20 shadow-lg">
              ✨ Expert Travel Insights
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)] tracking-tight animate-fade-in-up animation-delay-100">
            Rwanda Car Rental Blog
            <span className="block text-[#1E3A8A] mt-2"> & Travel Insights</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Powerful travel guides, smart car rental tips, and local insights from
            <span className="text-[#1E3A8A] font-semibold"> Kigali Car Rentals </span>
            to help you explore Rwanda with confidence, comfort, and class.
          </p>

          {/* Decorative Elements */}
          <div className="mt-10 flex flex-col items-center gap-4 animate-fade-in-up animation-delay-300">
            {/* Modern Accent Line */}
            <div className="relative">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent rounded-full"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1E3A8A] rounded-full animate-pulse"></div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <span className="text-white/70 text-sm">Discover stories</span>
              <svg className="w-5 h-5 text-white/70 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="relative -mt-16 z-20">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#1E3A8A]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#0B1F3A]/5 rounded-full blur-3xl"></div>
        
        <BlogListing />
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </main>
  );
}
