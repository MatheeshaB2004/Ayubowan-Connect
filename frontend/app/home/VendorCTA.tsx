import Link from "next/link";

export default function VendorCTA() {
  return (
    <section className="py-16 bg-[#1a1a2e] text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3">Are You a Local Vendor?</h2>
          <p className="text-gray-300 text-sm mb-5 max-w-md">
            Join our community of artisans and cultural experts. Share your passion, connect with
            travelers, and grow your business.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Reach thousands of interested customers",
              "Easy to use vendor dashboard",
              "Secure and reliable payments",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#0d9488]">✓</span> {item}
              </li>
            ))}
          </ul>
          <Link
            href="/vendor/register"
            className="inline-block bg-[#0d9488] hover:bg-[#0b7a6e] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Become a Vendor
          </Link>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 text-center">
          {[
            { value: "250+", label: "Active Vendors" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "10K+", label: "Bookings Made" },
            { value: "4.9+", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[#21a17a]">{s.value}</p>
              <p className="text-xs text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}