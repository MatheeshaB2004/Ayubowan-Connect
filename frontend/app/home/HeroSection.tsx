"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    src: "/assets/home/mask.png",
    alt: "Traditional Mask making experience",
  },
  {
    id: 2,
    src: "/assets/home/pottery.png",
    alt: "Traditional pottery making experience",
  },
  {
    id: 3,
    src: "/assets/home/batik.png",
    alt: "Traditional batik art experience",
  },
  {
    id: 4,
    src: "/assets/home/cooking.png",
    alt: "Sri Lankan cooking experience",
  },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + heroSlides.length) % heroSlides.length);
      
      setTimeout(() => setIsTransitioning(false), 5000);
    },
    [isTransitioning]
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000); 
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-1 bg-[#f9fafb]">
      {/* Heading */}
      <div className="text-center pt-12 pb-6 px-4">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#0d9488]">
          Authentic Sri Lanka Awaits
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
          Welcome to <br />
          <span className="text-[#21a17a]">Authentic Experiences</span>
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
          Connect with local artisans and discover hands-on cultural experiences. From cooking
          classes to traditional crafts, explore the heart of Sri Lankan culture.
        </p>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-5xl px-4 relative">
        <div className="rounded-2xl overflow-hidden h-64 md:h-96 relative select-none">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              style={{ transitionDuration: '5000ms' }}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="w-full h-full object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            suppressHydrationWarning
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                suppressHydrationWarning
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-white w-6 h-2"
                    : "bg-white/50 hover:bg-white/75 w-2 h-2"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-auto max-w-3xl px-4 mt-6 mb-10">
        <div className="flex flex-col md:flex-row gap-3 bg-white shadow-lg rounded-xl p-3">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              suppressHydrationWarning
              placeholder="What do you want to experience?"
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-2">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              suppressHydrationWarning
              placeholder="Location"
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="button"
            suppressHydrationWarning
            className="bg-[#0d9488] hover:bg-[#0b7a6e] text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
