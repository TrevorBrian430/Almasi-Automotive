"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GoldButton from "@/components/ui/gold-button";
import { useServiceStore } from "@/store/service-store";
import { ChevronDown } from "lucide-react";

/* ─── Floating gold particles ─── */
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

export default function ServiceHero() {
    const { setBookingModalOpen } = useServiceStore();
    const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

    useEffect(() => {
        setParticles(generateParticles());
    }, []);

    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center noise-overlay vignette">
            {/* ─── Background Layers ─── */}
            <div className="absolute inset-0 z-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#0a0a0a]" />

                {/* Animated radial gradient orbs */}
                <div
                    className="absolute top-1/4 left-1/3 w-[300px] md:w-[700px] h-[300px] md:h-[700px] rounded-full animate-float-slow will-change-transform"
                    style={{
                        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
                        transform: "translateZ(0)",
                    }}
                />
                <div
                    className="absolute bottom-1/3 right-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] rounded-full animate-float will-change-transform"
                    style={{
                        background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)",
                        transform: "translateZ(0)",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[900px] h-[400px] md:h-[900px] rounded-full opacity-50"
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
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 max-w-4xl mx-auto w-full min-h-[100svh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold/70 font-medium">
                        <span className="w-8 sm:w-12 h-[1px] bg-gold/30" />
                        Almasi Care
                        <span className="w-8 sm:w-12 h-[1px] bg-gold/30" />
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-wide text-platinum mb-6 sm:mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Precision{" "}
                    <span className="text-gradient-gold">Care.</span>
                    <br />
                    Manufacturer{" "}
                    <span className="text-gradient-gold">Standards.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12"
                >
                    Factory-trained technicians. Official diagnostic systems. From
                    routine servicing to full paint correction, your vehicle receives
                    the meticulous attention it deserves.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <GoldButton onClick={() => setBookingModalOpen(true)} size="lg">
                        Book a Service
                    </GoldButton>
                    <GoldButton
                        href="#services"
                        size="lg"
                        className="border-white/10 text-platinum hover:bg-white/5 hover:border-white/20 hover:shadow-none"
                    >
                        Explore Services
                    </GoldButton>
                </motion.div>
            </div>

            {/* ─── Scroll indicator ─── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-10"
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
