import Hero from "@/components/home/hero";
import CollectionSlider from "@/components/home/collection-slider";
import ServicePillars from "@/components/home/service-pillars";
import Testimonials from "@/components/home/testimonials";
import { getContent, getVehicles } from "@/lib/actions";

export default async function HomePage() {
  const [{ data: content }, { data: cars }] = await Promise.all([
    getContent(),
    getVehicles()
  ]);

  return (
    <>
      <Hero content={content?.hero} />
      <CollectionSlider cars={cars || []} />
      <ServicePillars services={content?.services} />
      <Testimonials testimonials={content?.testimonials} />
    </>
  );
}
