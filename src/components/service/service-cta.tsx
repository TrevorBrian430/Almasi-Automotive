"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import GoldButton from "@/components/ui/gold-button";
import { useServiceStore } from "@/store/service-store";
import { Phone, ArrowRight, Shield, Clock, Star, Users } from "lucide-react";

const stats = [
    { value: "150+", label: "Vehicles Serviced", icon: Shield },
    { value: "4.8", label: "Customer Rating", icon: Star },
    { value: "24h", label: "Avg Turnaround", icon: Clock },
    { value: "500+", label: "Happy Clients", icon: Users },
];

export default function ServiceCTA() {
    const { setBookingModalOpen } = useServiceStore();

    return (
        <section className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 lg:pb-32 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-gold/[0.03] blur-[100px] sm:blur-[120px]" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
                {/* Trust Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6 text-center hover:border-gold/15 transition-all duration-500 card-shine group"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/[0.08] transition-all duration-500">
                                <stat.icon className="w-4 h-4 text-gold" strokeWidth={1.2} />
                            </div>
                            <p
                                className="text-xl sm:text-2xl text-platinum mb-1"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-muted">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Card */}
                <SectionHeading
                    title="Ready to Book?"
                    subtitle="Schedule your service online or speak directly with our team."
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-card/60 border border-white/[0.06] rounded-sm p-6 sm:p-8 lg:p-10 text-center card-shine">
                        <p className="text-sm text-muted leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto px-2">
                            Whether it&apos;s a routine oil change or a full ceramic coating,
                            our factory-trained technicians ensure your vehicle receives the
                            precise care it deserves. Concierge pick-up available within Nairobi.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <GoldButton
                                onClick={() => setBookingModalOpen(true)}
                                size="lg"
                            >
                                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                                Book a Service
                            </GoldButton>
                            <GoldButton
                                href="tel:+254742577640"
                                size="lg"
                                className="border-white/10 text-platinum hover:bg-white/5 hover:border-white/20 hover:shadow-none"
                            >
                                <Phone className="w-4 h-4" strokeWidth={1.5} />
                                Call Us Directly
                            </GoldButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
