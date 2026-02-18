"use client";

import { cars } from "@/data/cars";
import { formatPrice } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import SectionHeading from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const featured = cars.filter((c) => c.status === "Available").slice(0, 4);

export default function CollectionSlider() {
    const { currency } = useUIStore();

    return (
        <section className="relative py-20 sm:py-32 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                <SectionHeading
                    title="Featured Vehicles"
                    subtitle="Hand-selected from our current collection."
                />

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10">
                    <div className="flex gap-5 sm:gap-6 snap-x snap-mandatory">
                        {featured.map((car, i) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.1,
                                    ease: [0.16, 1, 0.3, 1] as const,
                                }}
                                className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
                            >
                                <Link href={`/collection/${car.slug}`}>
                                    <div className="group relative bg-card border border-white/[0.06] rounded-sm overflow-hidden card-shine transition-all duration-500 hover:border-gold/20">
                                        {/* Real image */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={car.images.hero}
                                                alt={car.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                                            />
                                            {/* Bottom gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
                                        </div>

                                        {/* Info */}
                                        <div className="p-5 sm:p-6">
                                            <p className="text-[10px] text-gold/50 tracking-[0.2em] uppercase mb-1">
                                                {car.year} · {car.make}
                                            </p>
                                            <h3
                                                className="text-base sm:text-lg text-platinum tracking-wide group-hover:text-gold transition-colors duration-300"
                                                style={{
                                                    fontFamily: "var(--font-heading)",
                                                }}
                                            >
                                                {car.model}
                                            </h3>
                                            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                                                <p className="text-sm text-gold font-medium tracking-wide">
                                                    {formatPrice(
                                                        currency === "KES"
                                                            ? car.price.kes
                                                            : car.price.usd,
                                                        currency
                                                    )}
                                                </p>
                                                <ArrowRight className="w-4 h-4 text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
