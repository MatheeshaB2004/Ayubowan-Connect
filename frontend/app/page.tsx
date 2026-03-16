import HeroSection from "@/app/home/HeroSection";
import StatsBar from "@/app/home/StatsBar";
import CategorySection from "@/app/home/CategorySection";
import FeaturedExperiences from "@/app/home/FeaturedExperiences";
import HowItWorks from "@/app/home/HowItWorks";
import WhyChooseUs from "@/app/home/WhyChooseUs";
import Testimonials from "@/app/home/Testimonials";
import VendorCTA from "@/app/home/VendorCTA";
import ReadyToStart from "@/app/home/ReadyToStart";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <CategorySection />
      <FeaturedExperiences />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <VendorCTA />
      <ReadyToStart />
    </main>
  );
}
