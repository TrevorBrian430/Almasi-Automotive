"use client";

import { useParams } from "next/navigation";
import { getCarBySlug } from "@/data/cars";
import Gallery from "@/components/vehicle/gallery";
import SpecsPanel from "@/components/vehicle/specs-panel";
import MathWidget from "@/components/vehicle/math-widget";
import ConciergeBar from "@/components/vehicle/concierge-bar";
import BookingModal from "@/components/vehicle/booking-modal";
import GoldButton from "@/components/ui/gold-button";
import { useUIStore } from "@/store/ui-store";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VehiclePage() {
    const params = useParams();
    const slug = params.slug as string;
    const car = getCarBySlug(slug);
    const { setBookingModalOpen } = useUIStore();

    if (!car) {
        return (
            <div className="pt-28 pb-20 text-center">
                <div className="max-w-md mx-auto px-6 py-20">
                    <h1
                        className="text-3xl text-platinum mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Vehicle Not Found
                    </h1>
                    <p className="text-muted text-sm mb-8">
                        This vehicle may have been sold or the listing has been updated.
                    </p>
                    <GoldButton href="/collection">Back to Collection</GoldButton>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-24 pb-44 md:pb-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <Link
                            href="/collection"
                            className="inline-flex items-center gap-2 text-xs text-muted hover:text-gold tracking-wider uppercase transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                            Back to Collection
                        </Link>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
                        {/* Left: Gallery */}
                        <div className="lg:col-span-3">
                            <Gallery car={car} />

                            {/* Math Widget (below gallery on desktop) */}
                            <div className="mt-10">
                                <h3
                                    className="text-xs tracking-[0.3em] uppercase text-gold mb-6"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    The Math
                                </h3>
                                <MathWidget car={car} />
                            </div>
                        </div>

                        {/* Right: Specs + Actions */}
                        <div className="lg:col-span-2">
                            <SpecsPanel car={car} />

                            {/* Desktop CTA */}
                            <div className="hidden md:flex flex-col gap-3 mt-8">
                                <GoldButton
                                    onClick={() => setBookingModalOpen(true)}
                                    className="w-full"
                                    size="md"
                                >
                                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                                    Book a Private Viewing
                                </GoldButton>
                                <GoldButton
                                    href={`https://wa.me/254742577640?text=${encodeURIComponent(
                                        `Hi, I'm interested in the ${car.name}. I'd like to learn more.`
                                    )}`}
                                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                                    size="md"
                                >
                                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                                    WhatsApp Specialist
                                </GoldButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Concierge Bar */}
            <ConciergeBar carName={car.name} />

            {/* Booking Modal */}
            <BookingModal carName={car.name} />
        </>
    );
}
