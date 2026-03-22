const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Find what calls to you",
    description:
      "Browse hundreds of authentic Sri Lankan experiences. Filter by category, location, or price to find something perfect.",
  },
  {
    number: "02",
    icon: "🤝",
    title: "Connect with local vendors",
    description:
      "Message and connect directly with authentic local artisans, chefs, and cultural experts sharing their heritage.",
  },
  {
    number: "03",
    icon: "🎉",
    title: "Book & experience",
    description:
      "Secure your spot with easy booking and flexible cancellation. Create lasting memories and support local communities.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#e8f5f2]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-2">How It Works</h2>
        <p className="text-center text-gray-500 text-sm mb-12">
          Simple steps to your authentic Sri Lankan experience
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#e8f5f2] rounded-full text-2xl mb-4">
                {step.icon}
              </div>
              <span className="text-xs font-bold text-[#0d9488] uppercase tracking-widest">
                Step {step.number}
              </span>
              <h3 className="text-base font-bold text-[#1a1a2e] mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}