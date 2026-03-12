export default function StatsBar() {
  const stats = [
    { value: "500+", label: "Experiences" },
    { value: "350+", label: "Local Vendors" },
    { value: "10,000+", label: "Happy Visitors" },
    { value: "4.9", label: "Average Rating" },
    { value: "250+", label: "Verified Artisans" },
  ];

  return (
    <section className="bg-white py-8 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-extrabold text-[#21a17a]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}