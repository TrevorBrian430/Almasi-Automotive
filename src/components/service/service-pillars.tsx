"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import {
    Cpu,
    Gauge,
    Sparkles,
    Car,
} from "lucide-react";

const pillars = [
    {
        icon: Cpu,
        title: "Advanced Diagnostics",
        description:
            "Official ISTA, XENTRY, and PIWIS systems. We speak the digital language of BMW, Mercedes, and Porsche — identifying faults your local garage simply cannot.",
        accent: "from-blue-500/20 to-gold/20",
        image: "/cars/2024-bmw-x7-m60i/hero.jpg",
    },
    {
        icon: Gauge,
        title: "Performance & Suspension",
        description:
            "Air strut replacements, engine remapping, and suspension geometry. Restoring factory ride quality — or elevating it beyond.",
        accent: "from-red-500/20 to-gold/20",
        image: "/cars/2024-porsche-cayenne-turbo-gt/hero.jpg",
    },
    {
        icon: Sparkles,
        title: "Almasi Detailing",
        description:
            "Ceramic coatings, multi-stage paint correction, and full leather restoration. Your vehicle returns looking better than the day it left the showroom.",
        accent: "from-amber-400/20 to-gold/20",
        image: "/cars/2024-mercedes-g63-amg/hero.jpg",
    },
    {
        icon: Car,
        title: "Concierge Service",
        description:
            "We collect your vehicle from your home or office in Nairobi and return it pristine. No trips to the workshop — just a call away.",
        accent: "from-emerald-500/20 to-gold/20",
        image: "/cars/2024-range-rover-autobiography/hero.jpg",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

export default function ServicePillarsSection() {
    return (
        <section id="services" className="py-16 sm:py-24 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                <SectionHeading
                    title="Our Service Pillars"
                    subtitle="Four pillars of automotive excellence, each backed by factory-trained expertise."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={pillar.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="group relative bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden hover:border-gold/20 transition-all duration-500 card-shine"
                        >
                            {/* Car image */}
                            <div className="relative h-32 sm:h-36 overflow-hidden">
                                <Image
                                    src={pillar.image}
                                    alt={pillar.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <div className="w-9 h-9 rounded-full border border-gold/20 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/[0.15] group-hover:border-gold/30 transition-all duration-500">
                                        <pillar.icon
                                            className="w-4 h-4 text-gold"
                                            strokeWidth={1.2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-4 sm:p-5 lg:p-6">
                                <h3
                                    className="text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-platinum mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {pillar.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>

                            {/* Background gradient on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
