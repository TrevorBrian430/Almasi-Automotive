"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import GoldButton from "@/components/ui/gold-button";
import { MapPin, Phone, Mail, Clock, Shield, Truck, HeartHandshake, Award } from "lucide-react";

const stats = [
    { label: "Vehicles Delivered", value: "500+" },
    { label: "Years of Excellence", value: "12" },
    { label: "Satisfied Clients", value: "450+" },
    { label: "Countries Sourced", value: "15" },
];

const team = [
    { name: "Brian Njenga", role: "Founder & CEO", initial: "B" },
    { name: "Sarah Kimani", role: "Head of Acquisitions", initial: "S" },
    { name: "David Ochieng", role: "Finance Director", initial: "D" },
    { name: "Amina Hassan", role: "Client Concierge Lead", initial: "A" },
];

const values = [
    {
        icon: Shield,
        title: "Authenticity",
        desc: "Every vehicle verified with full provenance. No shortcuts, no compromises.",
    },
    {
        icon: Truck,
        title: "Transparency",
        desc: "Clear pricing, honest duty breakdowns, and real-time import tracking.",
    },
    {
        icon: HeartHandshake,
        title: "Relationship",
        desc: "We don't just sell cars, we build lasting partnerships with our clients.",
    },
    {
        icon: Award,
        title: "Excellence",
        desc: "From sourcing to delivery, every touchpoint reflects our pursuit of perfection.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

export default function AboutPage() {
    return (
        <div className="pt-24 sm:pt-28">
            {/* ─── Hero Section ─── */}
            <section className="relative py-16 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />

                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold/70 mb-4"
                    >
                        Our Story
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl sm:text-4xl md:text-6xl text-platinum tracking-wide mb-6"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Redefining Automotive
                        <br />
                        <span className="text-gradient-gold">Excellence in Kenya</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Born in Nairobi, Almasi Automotive was founded with a singular vision: to
                        bring the world&apos;s finest automobiles to East Africa&apos;s most discerning
                        individuals, with integrity, transparency, and unmatched service.
                    </motion.p>
                </div>
            </section>

            {/* ─── Stats Bar ─── */}
            <section className="py-12 sm:py-16 border-y border-white/[0.06]">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="text-center"
                            >
                                <p
                                    className="text-3xl sm:text-4xl text-gold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-xs sm:text-sm text-muted tracking-wider uppercase">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Our Values ─── */}
            <section className="py-20 sm:py-32">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                    <SectionHeading
                        title="Our Values"
                        subtitle="The principles that guide every transaction."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="group bg-card/60 border border-white/[0.06] rounded-sm p-6 sm:p-8 text-center hover:border-gold/20 transition-all duration-500 card-shine"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/20 bg-gold/[0.05] mb-5 group-hover:bg-gold/[0.10] transition-all duration-500">
                                    <v.icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                                </div>
                                <h3
                                    className="text-sm tracking-[0.15em] uppercase text-platinum mb-3"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {v.title}
                                </h3>
                                <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── The Team ─── */}
            <section className="py-20 sm:py-32 bg-gradient-to-b from-card/30 via-transparent to-transparent">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                    <SectionHeading
                        title="The Team"
                        subtitle="The people behind the Almasi experience."
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="group text-center"
                            >
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full bg-card border border-white/[0.06] group-hover:border-gold/30 transition-all duration-500 flex items-center justify-center overflow-hidden">
                                    <span
                                        className="text-3xl sm:text-4xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {member.initial}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <h3
                                    className="text-sm text-platinum tracking-wider mb-1"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {member.name}
                                </h3>
                                <p className="text-xs text-muted">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Showroom & Contact ─── */}
            <section className="py-20 sm:py-32">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                    <SectionHeading
                        title="Visit Our Showroom"
                        subtitle="Experience our collection in person."
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Google Maps Embed */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[4/3] lg:aspect-auto bg-card border border-white/[0.06] rounded-sm overflow-hidden"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.19!2d36.8!3d-1.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17001e4a1291%3A0x3e8c1f8d1f46!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1!5m2!1sen!2ske"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: 350 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Almasi Automotive Showroom - Westlands, Nairobi"
                            />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-card/60 border border-white/[0.06] rounded-sm p-8 sm:p-10 flex flex-col justify-center space-y-8"
                        >
                            <div>
                                <h3
                                    className="text-lg sm:text-xl text-platinum tracking-wider mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Almasi Automotive
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    Our Westlands showroom is open for private viewings by appointment.
                                    Walk-ins are welcome during business hours.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 mt-0.5 text-gold" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">Westlands, Nairobi</p>
                                        <p className="text-xs text-muted mt-0.5">Off Waiyaki Way, Kenya</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-gold" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">+254 742 577 640</p>
                                        <p className="text-xs text-muted mt-0.5">Call or WhatsApp</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-gold" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">concierge@almasi.co.ke</p>
                                        <p className="text-xs text-muted mt-0.5">For inquiries & appointments</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-gold" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">Mon – Sat: 9:00 AM – 6:00 PM</p>
                                        <p className="text-xs text-muted mt-0.5">Sunday by appointment only</p>
                                    </div>
                                </div>
                            </div>

                            <GoldButton
                                href="https://wa.me/254742577640?text=Hi%20Almasi!%20I'd%20like%20to%20schedule%20a%20showroom%20visit."
                                size="lg"
                                className="w-full justify-center"
                            >
                                Schedule a Visit
                            </GoldButton>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
