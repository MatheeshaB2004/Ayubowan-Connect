import Link from "next/link";

export default function ReadyToStart() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Ready to Start Your Journey?</h2>
        <p className="text-gray-400 text-sm mb-8">
          Discover authentic Sri Lankan experiences and create memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/marketplace"
            className="bg-[#0d9488] hover:bg-[#0b7a6e] text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Explore Experiences
          </Link>
          <Link
            href="/events"
            className="border border-[#0d9488] text-[#0d9488] hover:bg-[#e8f5f2] font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}