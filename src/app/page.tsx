"use client";

import Hero from "@/components/home/hero";
import CollectionSlider from "@/components/home/collection-slider";
import ServicePillars from "@/components/home/service-pillars";
import Testimonials from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionSlider />
      <ServicePillars />
      <Testimonials />
    </>
  );
}
