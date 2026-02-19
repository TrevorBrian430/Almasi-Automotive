"use client";

import ServiceHero from "@/components/service/service-hero";
import ServicePillarsSection from "@/components/service/service-pillars";
import ServiceCTA from "@/components/service/service-cta";
import ServiceBookingModal from "@/components/service/service-booking-modal";

export default function ServicePage() {
    return (
        <>
            <ServiceHero />
            <ServicePillarsSection />
            <ServiceCTA />
            <ServiceBookingModal />
        </>
    );
}
