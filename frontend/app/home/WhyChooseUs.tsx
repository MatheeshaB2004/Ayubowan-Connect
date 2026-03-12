const features = [
  {
    icon: "✅",
    title: "Verified Local Vendors",
    description:
      "Every vendor is personally verified and reviewed. Connect with authentic local artisans, chefs, and cultural experts.",
    bullets: ["Background-checked vendors", "Genuine local artisans", "Quality-guaranteed experiences"],
  },
  {
    icon: "🌱",
    title: "Support Local Communities",
    description:
      "Your bookings directly support small Sri Lankan businesses and help preserve traditional crafts and cultural practices.",
    bullets: ["Direct payment to vendors", "Preserve cultural heritage", "Sustainable tourism"],
  },
  {
    icon: "📅",
    title: "Flexible Booking & Easy Management",
    description:
      "Book with confidence using our secure platform. Enjoy flexible cancellation, instant confirmation, and easy communication.",
    bullets: ["Instant booking confirmation", "Flexible cancellation", "24/7 customer support"],
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-2">
          Why Choose Ayubowan Connect
        </h2>
        <p className="text-center text-gray-400 text-sm mb-12">
          Experience Sri Lanka like never before
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-gray-100 rounded-2xl p-6 hover:border-[#0d9488] hover:shadow-md transition-all"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="text-base font-bold text-[#1a1a2e] mt-3 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{f.description}</p>
              <ul className="space-y-1">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-[#e8f5f2] text-[#0d9488] flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}