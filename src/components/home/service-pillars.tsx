"use client";

import SectionHeading from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { Shield, Truck, HeartHandshake } from "lucide-react";

const pillars = [
    {
        icon: Shield,
        title: "Authenticated",
        description:
            "Every vehicle undergoes a 200-point inspection. Full provenance documentation with verified service history.",
    },
    {
        icon: Truck,
        title: "Direct Import",
        description:
            "Sourced directly from manufacturers and certified dealers worldwide. Fully cleared through KRA with transparent duty breakdown.",
    },
    {
        icon: HeartHandshake,
        title: "White-Glove Service",
        description:
            "From selection to delivery, your personal concierge handles every detail. Financing, insurance, registration — handled.",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function ServicePillars() {
    return (
        <section className="relative py-20 sm:py-32">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                <SectionHeading
                    title="The Almasi Difference"
                    subtitle="Three pillars that define every transaction."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
                >
                    {pillars.map((pillar) => (
                        <motion.div
                            key={pillar.title}
                            variants={itemVariants}
                            className="group relative bg-card/60 border border-white/[0.06] rounded-sm p-8 sm:p-10 text-center hover:border-gold/20 transition-all duration-500 card-shine"
                        >
                            {/* Decorative glow on hover */}
                            <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/20 bg-gold/[0.05] mb-6 group-hover:bg-gold/[0.10] group-hover:border-gold/30 transition-all duration-500 animate-pulse-gold">
                                    <pillar.icon
                                        className="w-6 h-6 text-gold"
                                        strokeWidth={1.2}
                                    />
                                </div>
                                <h3
                                    className="text-lg tracking-[0.15em] uppercase text-platinum mb-4 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {pillar.title}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
