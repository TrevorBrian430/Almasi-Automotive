"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-4">
                        Get in Touch
                    </p>
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl text-platinum mb-6"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Speak to a Specialist
                    </h1>
                    <p className="text-muted/80 max-w-2xl mx-auto leading-relaxed">
                        Whether you're looking to acquire a specific vehicle or need assistance with your
                        current collection, our team is ready to provide the white-glove service expected
                        of Almasi Automotive.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <ContactCard
                        icon={<Phone className="w-6 h-6 text-gold" strokeWidth={1.5} />}
                        title="Call Us"
                        content="+254 742 577 640"
                        subContent="Mon-Fri, 8am - 6pm"
                        href="tel:+254742577640"
                    />
                    <ContactCard
                        icon={<Mail className="w-6 h-6 text-gold" strokeWidth={1.5} />}
                        title="Email Us"
                        content="concierge@almasi.co.ke"
                        subContent="We reply within 2 hours"
                        href="mailto:concierge@almasi.co.ke"
                    />
                    <ContactCard
                        icon={<MapPin className="w-6 h-6 text-gold" strokeWidth={1.5} />}
                        title="Visit Showroom"
                        content="Westlands, Nairobi"
                        subContent="By appointment only"
                        href="https://maps.google.com"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-sm p-8 md:p-12 text-center"
                >
                    <h2
                        className="text-2xl sm:text-3xl text-platinum mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Ready to begin your journey?
                    </h2>
                    <p className="text-muted/70 mb-8 max-w-lg mx-auto">
                        Schedule a private viewing or consultation with our automotive experts.
                    </p>
                    <GoldButton href="https://wa.me/254742577640?text=Hello,%20I%20am%20interested%20in%20scheduling%20a%20private%20viewing" size="lg">
                        Schedule Viewing
                    </GoldButton>
                </motion.div>
            </div>
        </main>
    );
}

function ContactCard({
    icon,
    title,
    content,
    subContent,
    href,
}: {
    icon: React.ReactNode;
    title: string;
    content: string;
    subContent: string;
    href: string;
}) {
    return (
        <motion.a
            href={href}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-8 bg-white/[0.02] border border-white/[0.06] hover:border-gold/30 rounded-sm transition-colors duration-300 group"
        >
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-lg text-platinum mb-2 font-medium">{title}</h3>
            <p className="text-gold text-lg mb-1">{content}</p>
            <p className="text-xs text-muted/50 uppercase tracking-wider">{subContent}</p>
        </motion.a>
    );
}
