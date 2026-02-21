"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

/* ─── Floating gold particles (generated client-side to avoid hydration mismatch) ─── */
function generateParticles() {
    return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
    }));
}

export default function Hero({ content }: { content?: any }) {
    const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

    // Default connection
    const title = content?.title || "The Art of \nAcquisition";
    const subtitle = content?.subtitle || "We curate the world's most distinguished automobiles for East Africa's most discerning individuals. Direct imports. Exceptional financing. White-glove concierge.";
    const bgImage = content?.image; // Used for inline style if provided

    useEffect(() => {
        setParticles(generateParticles());
    }, []);

    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center noise-overlay vignette">
            {/* ─── Background Layers ─── */}
            <div className="absolute inset-0 z-0">
                {/* Base gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#0a0a0a]"
                    style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' } : undefined}
                />

                {/* Animated radial gradient orbs */}
                <div className="absolute top-1/4 left-1/3 w-[300px] md:w-[700px] h-[300px] md:h-[700px] rounded-full animate-float-slow"
                    style={{
                        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
                    }}
                />
                <div className="absolute bottom-1/3 right-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] rounded-full animate-float"
                    style={{
                        background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)",
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[900px] h-[400px] md:h-[900px] rounded-full opacity-50"
                    style={{
                        background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 50%)",
                    }}
                />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />

                {/* Floating gold particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-gold/30"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Decorative diamond ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full border border-gold/[0.04] animate-pulse-gold" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-gold/[0.06] rotate-45" />

                {/* Horizontal accent lines */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent origin-center"
                />
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent origin-center"
                />
            </div>

            {/* ─── Content ─── */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-20 w-full min-h-[100svh]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Top Label - Matching ServiceHero style */}
                    <div className="flex items-center justify-center gap-3 mb-4 sm:mb-8 opacity-80">
                        <div className="h-[1px] w-8 sm:w-12 bg-gold/50" />
                        <span className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase font-medium">
                            Est. Nairobi, Kenya
                        </span>
                        <div className="h-[1px] w-8 sm:w-12 bg-gold/50" />
                    </div>

                    {/* Main Title - Matching ServiceHero font/spacing */}
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-6 sm:mb-10 text-platinum"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {content?.title?.split(/\n|\\n/).map((line: string, i: number) => (
                            <span key={i} className={i === 1 ? "block text-gradient-gold mt-2" : "block text-white"}>
                                {line}
                            </span>
                        )) || (
                                <>
                                    <span className="block text-white">The Art of</span>
                                    <span className="block text-gradient-gold mt-1 sm:mt-2">Acquisition</span>
                                </>
                            )}
                    </h1>

                    {/* Subtitle */}
                    <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-platinum/80 leading-relaxed font-light mb-8 sm:mb-14 tracking-wide px-4">
                        {content?.subtitle ||
                            "We curate the world's most distinguished automobiles for East Africa's most discerning individuals. Direct imports. Exceptional financing. White-glove concierge."}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                        <GoldButton
                            href="/collection"
                            size="lg"
                            className="w-auto px-6 sm:px-10"
                        >
                            View Collection
                        </GoldButton>

                        <GoldButton
                            href="/contact"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/5 hover:border-white/50 hover:shadow-none w-auto px-6 sm:px-10"
                        >
                            Speak to a Specialist
                        </GoldButton>
                    </div>
                </motion.div>
            </div>

            {/* ─── Scroll indicator ─── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold/30">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-gold/40" strokeWidth={1} />
                </motion.div>
            </motion.div>
        </section>
    );
}
