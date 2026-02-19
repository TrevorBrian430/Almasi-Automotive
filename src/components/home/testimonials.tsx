"use client";

import SectionHeading from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonialsMock = [
    {
        name: "James Mwangi",
        role: "CEO, Capital Holdings",
        quote: "Almasi made importing my G63 completely effortless. From sourcing to clearing at the port, every detail was handled with precision. The car arrived exactly as described.",
        rating: 5,
    },
];

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
    const list = (testimonials && testimonials.length > 0) ? testimonials : testimonialsMock;
    return (
        <section className="relative py-20 sm:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-card/30 to-midnight" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                <SectionHeading
                    title="Client Voices"
                    subtitle="What our clients say about the Almasi experience."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {list.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1] as const,
                            }}
                            className="group relative bg-card/60 border border-white/[0.06] rounded-sm p-6 sm:p-8 hover:border-gold/20 transition-all duration-500"
                        >
                            {/* Gold accent top-left */}
                            <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-gold/40 to-transparent" />
                            <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-gold/40 to-transparent" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star
                                        key={j}
                                        className="w-3.5 h-3.5 text-gold fill-gold"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm sm:text-base text-platinum/80 leading-relaxed mb-6 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                                    <span
                                        className="text-sm text-gold"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {t.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-platinum font-medium">{t.name}</p>
                                    <p className="text-xs text-muted">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
