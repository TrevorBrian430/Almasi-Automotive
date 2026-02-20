"use client";

import { motion } from "framer-motion";
import { Coffee, Car, MapPin, Calendar, ArrowRight, Star } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

interface Perk {
    id: string;
    partner: string;
    benefit: string;
    icon: any;
    color: string;
}

const perks: Perk[] = [
    { id: "p1", partner: "Villa Rosa Kempinski", benefit: "Valet Parking & Welcome Drink", icon: MapPin, color: "text-red-400" },
    { id: "p2", partner: "Caramel Lounge", benefit: "Priority Seating Access", icon: Coffee, color: "text-amber-400" },
    { id: "p3", partner: "K1 Klubhouse", benefit: "VIP Entrance (Fast Track)", icon: Star, color: "text-purple-400" },
];

export default function PerksSection() {
    return (
        <div className="space-y-6">
            <h3 className="text-sm text-platinum tracking-wider uppercase opacity-80 pl-1">
                Member Privileges
            </h3>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {perks.map((perk, i) => (
                    <motion.div
                        key={perk.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card/40 border border-white/5 p-4 rounded-sm flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${perk.color} group-hover:scale-110 transition-transform`}>
                            <perk.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gold uppercase tracking-wider mb-0.5">{perk.partner}</p>
                            <p className="text-sm text-platinum font-light">{perk.benefit}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Exclusive Event Card */}
            <div className="relative rounded-sm overflow-hidden border border-gold/20 group">
                <div className="absolute inset-0 bg-[url('/events/sunday-drive.jpg')] bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 bg-gold/20 border border-gold/30 text-gold text-[10px] uppercase tracking-wider rounded-sm">
                                Exclusive Event
                            </div>
                            <span className="text-[10px] text-muted flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Sunday, Feb 25
                            </span>
                        </div>
                        <h3 className="text-2xl text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                            The Great Rift Valley Run
                        </h3>
                        <p className="text-sm text-platinum/80 leading-relaxed font-light">
                            Join 20+ Almasi members for a sunrise convoy to Naivasha. Breakfast at Enashipai Resort included.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="text-center mb-2">
                            <span className="text-3xl text-gold font-light">4</span>
                            <span className="text-xs text-muted block uppercase tracking-wider">Slots Left</span>
                        </div>
                        <GoldButton className="w-full md:w-auto">
                            Reserve Slot (Free)
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </GoldButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
