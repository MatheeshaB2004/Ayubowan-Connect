import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { getApiUrl } from "@/lib/api";

type MarketplaceListing = {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  rating: number;
  imageUrl: string | null;
  category: string;
  type: "experience" | "product";
  shortDescription: string;
};

type MarketplaceResponse = {
  total: number;
  items: MarketplaceListing[];
};

const FALLBACK_IMAGE = "/assets/photos/B4.webp";
const FEATURED_LIMIT = 4;

function shuffleListings(listings: MarketplaceListing[]) {
  const shuffled = [...listings];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

async function getFeaturedExperiences() {
  try {
    const params = new URLSearchParams({
      type: "EXPERIENCE",
      limit: "24",
    });

    const url = getApiUrl(`/marketplace?${params.toString()}`);

    if (!url) {
      return [];
    }

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to load marketplace listings: ${response.status}`);
    }

    const data = (await response.json()) as MarketplaceResponse;

    return shuffleListings(
      (data.items ?? []).filter((item) => item.type === "experience"),
    ).slice(0, FEATURED_LIMIT);
  } catch (error) {
    console.error("Failed to load featured marketplace experiences", error);
    return [];
  }
}

export default async function FeaturedExperiences() {
  const experiences = await getFeaturedExperiences();

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">Featured Experiences</h2>
            <p className="mt-1 text-sm text-gray-400">
              Random picks from our live marketplace
            </p>
          </div>
          <Link href="/marketplace" className="text-sm font-semibold text-[#0d9488] hover:underline">
            View All
          </Link>
        </div>

        {experiences.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
            {experiences.map((experience) => {
              const detailHref = `/marketplace/experiences/${experience.id}`;
              const imageSrc = experience.imageUrl || FALLBACK_IMAGE;
              const locationLabel = experience.location || experience.district || "Sri Lanka";
              const ratingLabel = experience.rating > 0 ? experience.rating.toFixed(1) : "New";

              return (
                <article
                  key={experience.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={detailHref} className="block">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={experience.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-[#0d9488] px-2 py-1 text-xs font-semibold text-white">
                        {experience.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-3">
                    <p className="line-clamp-2 min-h-[2.5rem] text-xs text-gray-500">
                      {experience.shortDescription}
                    </p>

                    <Link href={detailHref} className="mt-2 block">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1a1a2e] transition-colors group-hover:text-[#0d9488]">
                        {experience.title}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={12} />
                      <span>{locationLabel}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#21a17a]">
                        Rs. {experience.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span>{ratingLabel}</span>
                      </div>
                    </div>

                    <Link
                      href={detailHref}
                      className="mt-3 block w-full rounded-lg bg-[#0d9488] py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-[#0b7a6e]"
                    >
                      Book Now
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
            <h3 className="text-lg font-semibold text-[#1a1a2e]">
              No marketplace experiences to feature yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              As soon as vendors publish experiences, they&apos;ll appear here automatically.
            </p>
            <Link
              href="/marketplace"
              className="mt-4 inline-flex rounded-lg bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b7a6e]"
            >
              Browse Marketplace
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
