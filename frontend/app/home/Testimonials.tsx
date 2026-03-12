const reviews = [
  {
    name: "Sarah Johnson",
    role: "Tourist, Australia",
    rating: 5,
    text: "The cooking class was absolutely incredible! The vendor was warm, knowledgeable and made us feel right at home. Best experience of our trip!",
  },
  {
    name: "Michael Chen",
    role: "Travel Blogger, Singapore",
    rating: 5,
    text: "The platform made it so easy to find and book authentic experiences. All pathways were seamless. Highly recommended!",
  },
  {
    name: "Diana Williams",
    role: "Solo Traveller, USA",
    rating: 5,
    text: "I found an amazing pottery class through Ayubowan Connect. The vendor was truly passionate about preserving Sri Lankan heritage.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-2">What Our Guests Say</h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          Real experiences from real travelers
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-4">&ldquo;{r.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm text-[#1a1a2e]">{r.name}</p>
                <p className="text-xs text-gray-400">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}