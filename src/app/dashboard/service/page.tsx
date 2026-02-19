"use client";

import MyGarage from "@/components/dashboard/my-garage";
import Link from "next/link";
import { Wrench, History, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardServicePage() {
    return (
        <div className="space-y-8 sm:space-y-12">
            {/* Page Header */}
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Care
                </p>
                <h1
                    className="text-xl sm:text-2xl md:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Service Portal
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-2">
                    Manage your vehicles and access service features.
                </p>
            </div>

            <MyGarage />

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                    {
                        href: "/dashboard/service/book",
                        icon: Wrench,
                        title: "Book a Service",
                        desc: "Schedule an appointment",
                    },
                    {
                        href: "/dashboard/service/history",
                        icon: History,
                        title: "Service History",
                        desc: "View past appointments",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            href={item.href}
                            className="group flex items-center gap-3 sm:gap-4 bg-card border border-white/[0.06] hover:border-gold/20 rounded-sm p-4 sm:p-6 transition-all duration-300"
                        >
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gold/[0.06] border border-gold/15 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="text-sm text-platinum tracking-wider truncate"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-xs text-muted mt-0.5 truncate">{item.desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 shrink-0 text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
