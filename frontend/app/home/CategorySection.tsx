import Link from "next/link";

const categories = [
  { icon: "🍳", label: "Cooking", href: "/marketplace?cat=cooking" },
  { icon: "🎨", label: "Arts & Crafts", href: "/marketplace?cat=arts" },
  { icon: "🎵", label: "Cultural", href: "/marketplace?cat=cultural" },
  { icon: "🍵", label: "Food & Beverage", href: "/marketplace?cat=food" },
  { icon: "📸", label: "Photography", href: "/marketplace?cat=photography" },
  { icon: "🧘", label: "Workshops", href: "/marketplace?cat=workshops" },
];

export default function CategorySection() {
  return (
    <section className="py-14 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-2">
          Explore by Category
        </h2>
        <p className="text-center text-gray-400 text-sm mb-8">
          Find the perfect cultural experience for you
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group border border-transparent hover:border-[#0d9488]"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-medium text-gray-600 text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}