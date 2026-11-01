import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedStudios, {
  FeaturedStudiosSkeleton,
} from "@/components/home/FeaturedStudios";
import StudioCategories from "@/components/home/StudioCategories";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import HostGuarantee from "@/components/home/HostGuarantee";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-[70vh] min-h-[520px]" />}>
        <HeroSlider />
      </Suspense>

      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      
      <StudioCategories />

       <HowBookingWorks />

       <HostGuarantee />

       <AboutSection />
    </main>
  );
}