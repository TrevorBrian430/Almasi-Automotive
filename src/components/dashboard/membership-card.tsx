"use client";

import { motion } from "framer-motion";
import { QrCode, Crown, Sparkles } from "lucide-react";
import Code from "next/image"; // Assuming we might want to use an image for QR later, but lucide icon for now is fine or a generated one.

interface MembershipCardProps {
    name: string;
    memberId: string;
    memberSince: string;
    tier?: "Black" | "Gold" | "Platinum";
}

export default function MembershipCard({ name, memberId, memberSince, tier = "Black" }: MembershipCardProps) {
    return (
        <div className="perspective-1000 w-full max-w-sm mx-auto">
            <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative aspect-[1.586] rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Card Background - Matte Black with Texture */}
                <div className="absolute inset-0 bg-[#0A0A0A] border border-white/10 rounded-xl">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

                    {/* Gold Accents */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[60px] rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-900/10 blur-[60px] rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl text-platinum tracking-widest font-bold font-serif italic">
                                ALMASI
                            </h3>
                            <p className="text-[10px] text-gold uppercase tracking-[0.3em]">
                                {tier} Member
                            </p>
                        </div>
                        <Crown className="w-6 h-6 text-gold opacity-80" strokeWidth={1.5} />
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Member Name</p>
                            <p className="text-lg text-white font-medium tracking-wide uppercase" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                                {name}
                            </p>
                            <div className="flex gap-4 mt-2">
                                <div>
                                    <p className="text-[8px] text-muted uppercase tracking-wider">ID</p>
                                    <p className="text-xs text-platinum font-mono">{memberId}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-muted uppercase tracking-wider">Since</p>
                                    <p className="text-xs text-platinum font-mono">{memberSince}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-1 rounded-sm">
                            <QrCode className="w-12 h-12 text-black" />
                        </div>
                    </div>
                </div>

                {/* Shine Refection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
        </div>
    );
}
