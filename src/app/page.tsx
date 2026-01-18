import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedFleet from "@/components/FeaturedFleet";
import ServicesSection from "@/components/ServicesSection";
import FeaturedBlogs from "@/components/FeaturedBlogs";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedFleet />
      <ServicesSection />
      <FeaturedBlogs />
    </main>
  );
}
