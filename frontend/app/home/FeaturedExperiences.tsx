import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Traditional Sri Lankan Cooking Class",
    vendor: "Amara Local Kitchen",
    location: "Colombo",
    price: 2500,
    rating: 4.9,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Batik Art Workshop",
    vendor: "Dilani Craft Center",
    location: "Kandy",
    price: 1800,
    rating: 4.8,
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "Save 10%",
  },
  {
    id: 3,
    title: "Kandyan Dance Experience",
    vendor: "Cultural Dance Center",
    location: "Kandy",
    price: 3200,
    rating: 5.0,
    duration: "2.5 hours",
    image: "https://images.unsplash.com/photo-1613758947717-7e5bbf9c1b3d?w=400&q=80",
    badge: null,
  },
  {
    id: 4,
    title: "Pottery Making Workshop",
    vendor: "Artisan Village Galle",
    location: "Galle",
    price: 4200,
    rating: 4.7,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
    badge: "New",
  },
];

export default function FeaturedExperiences() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">Featured Experiences</h2>
            <p className="text-sm text-gray-400 mt-1">Handpicked authentic cultural activities</p>
          </div>
          <Link href="/marketplace" className="text-sm text-[#0d9488] font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/marketplace/${exp.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {exp.badge && (
                  <span className="absolute top-2 left-2 bg-[#0d9488] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {exp.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400">{exp.vendor}</p>
                <h3 className="text-sm font-semibold text-[#1a1a2e] mt-1 leading-snug">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <MapPin size={12} />
                  <span>{exp.location}</span>
                  <Clock size={12} className="ml-2" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-sm text-[#21a17a]">
                    Rs. {exp.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span>{exp.rating}</span>
                  </div>
                </div>
                <button className="mt-3 w-full bg-[#0d9488] hover:bg-[#0b7a6e] text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}