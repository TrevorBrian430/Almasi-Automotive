"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    AreaChart, Area,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
    Car, DollarSign, CalendarCheck, Award, Clock,
    ArrowRight, Wrench, Phone, ChevronRight, Eye,
    ShoppingCart,
} from "lucide-react";
import { ownerMonthlySpend, ownerKpis, nextServiceInfo, vehicleHealth } from "@/data/admin";
import { AlmasiCar } from "@/types/car";
import { useServiceStore } from "@/store/service-store";
import GoldButton from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { useAuthStore } from "@/store/auth-store";
import { formatPrice } from "@/lib/utils";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

const healthColors: Record<string, { bg: string, border: string, text: string, label: string }> = {
    good: { bg: "bg-emerald-400/10", border: "border-emerald-400/20", text: "text-emerald-400", label: "Good" },
    "due-soon": { bg: "bg-amber-400/10", border: "border-amber-400/20", text: "text-amber-400", label: "Due Soon" },
    overdue: { bg: "bg-red-400/10", border: "border-red-400/20", text: "text-red-400", label: "Overdue" },
};

function GoldTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
    if (!active || !payload) return null;
    return (
        <div className="bg-[#111] border border-white/[0.08] rounded-sm px-3 py-2 shadow-xl">
            <p className="text-[10px] text-muted tracking-wider mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="text-xs text-platinum">
                    KES <span className="text-gold">{entry.value.toLocaleString("en-KE")}</span>
                </p>
            ))}
        </div>
    );
}

export default function OwnerDashboardClient({ cars }: { cars: AlmasiCar[] }) {
    const { user } = useAuthStore();
    const { setBookingModalOpen } = useServiceStore();
    const daysUntilService = differenceInDays(new Date(nextServiceInfo.date), new Date());

    /* Suggested vehicles filtered from the full cars catalog (available only) */
    const suggestedCars = cars.filter(c => c.status === "Available").slice(0, 3);

    const kpis = [
        { label: "My Vehicles", value: ownerKpis.totalVehicles.toString(), icon: Car },
        { label: "Upcoming Services", value: ownerKpis.upcomingServices.toString(), icon: CalendarCheck },
        { label: "Total Spent (KES)", value: `${(ownerKpis.totalSpent / 1000).toFixed(0)}K`, icon: DollarSign },
        { label: "Loyalty Points", value: ownerKpis.loyaltyPoints.toLocaleString("en-KE"), icon: Award },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Welcome Back
                </p>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {user?.name || "Vehicle Owner"}
                </h1>
                <p className="text-sm text-muted mt-2">
                    Your vehicles, services & the latest from the showroom.
                </p>
            </div>

            {/* ─── KPI Row ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="bg-card/60 border border-white/[0.06] rounded-sm p-3 sm:p-5 hover:border-gold/15 transition-all duration-500 card-shine group"
                    >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-gold/[0.08] transition-all duration-500">
                            <kpi.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" strokeWidth={1.2} />
                        </div>
                        <p
                            className="text-lg sm:text-2xl text-platinum mb-0.5 sm:mb-1"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {kpi.value}
                        </p>
                        <p className="text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-muted">
                            {kpi.label}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* ─── Next Service + Spend Chart ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                {/* Next Service Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="lg:col-span-2 bg-card/60 border border-gold/15 rounded-sm overflow-hidden relative"
                >
                    {/* Car image background */}
                    <div className="relative h-36 sm:h-44">
                        <Image
                            src={`/cars/${nextServiceInfo.imageSlug}/hero.jpg`}
                            alt={nextServiceInfo.vehicle}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
                        <div className="absolute top-3 right-3 opacity-[0.15]">
                            <Clock className="w-12 h-12 text-gold" strokeWidth={0.5} />
                        </div>
                    </div>
                    <div className="p-4 sm:p-6">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-3">
                            Next Service
                        </p>
                        <div className="flex items-end gap-3 mb-4">
                            <p
                                className="text-3xl sm:text-4xl text-gold leading-none"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {daysUntilService > 0 ? daysUntilService : 0}
                            </p>
                            <p className="text-xs text-muted tracking-wider pb-1">
                                {daysUntilService > 0 ? "days remaining" : "Service due"}
                            </p>
                        </div>
                        <div className="space-y-1.5 mb-4">
                            <p className="text-sm text-platinum">{nextServiceInfo.vehicle}</p>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] tracking-[0.12em] uppercase text-gold/70 bg-gold/[0.06] border border-gold/10 px-2 py-0.5 rounded-sm">
                                    {nextServiceInfo.registration}
                                </span>
                                <span className="text-xs text-muted">{nextServiceInfo.serviceType}</span>
                            </div>
                            <p className="text-xs text-muted flex items-center gap-1.5">
                                <Wrench className="w-3 h-3 text-gold/50" strokeWidth={1.2} />
                                {nextServiceInfo.mechanic}
                            </p>
                            <p className="text-xs text-muted">
                                {format(new Date(nextServiceInfo.date), "EEEE, dd MMMM yyyy")}
                            </p>
                        </div>
                        <GoldButton href="/dashboard/service#booking" size="sm">
                            Manage Booking
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </GoldButton>
                    </div>
                </motion.div>

                {/* Monthly Spend Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="lg:col-span-3 bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                >
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div>
                            <h3
                                className="text-sm text-platinum tracking-wider"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Service Spend
                            </h3>
                            <p className="text-[10px] text-muted tracking-wider mt-1">
                                Monthly spending (KES)
                            </p>
                        </div>
                        <DollarSign className="w-4 h-4 text-gold/40" strokeWidth={1.2} />
                    </div>
                    <div className="h-48 sm:h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ownerMonthlySpend}>
                                <defs>
                                    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                                />
                                <Tooltip content={<GoldTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    name="Spend"
                                    stroke="#D4AF37"
                                    strokeWidth={2}
                                    fill="url(#spendGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* ─── Vehicle Health Cards with Images ─── */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h3
                        className="text-sm text-platinum tracking-wider"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        My Vehicles
                    </h3>
                    <GoldButton href="/dashboard/service" size="sm" className="text-xs">
                        Service Portal <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                    </GoldButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicleHealth.map((v, i) => {
                        const health = healthColors[v.serviceStatus];
                        const daysUntil = differenceInDays(new Date(v.nextService), new Date());
                        return (
                            <motion.div
                                key={v.id}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                className="bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden hover:border-gold/15 transition-all duration-500 card-shine group"
                            >
                                {/* Car Image */}
                                <div className="relative h-32 sm:h-36 overflow-hidden">
                                    <Image
                                        src={`/cars/${v.imageSlug}/hero.jpg`}
                                        alt={v.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                                    <span
                                        className={cn(
                                            "absolute top-2 right-2 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm border backdrop-blur-sm",
                                            health.bg, health.border, health.text
                                        )}
                                    >
                                        {health.label}
                                    </span>
                                </div>
                                <div className="p-4 sm:p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[11px] tracking-[0.12em] uppercase text-gold/70 bg-gold/[0.06] border border-gold/10 px-2 py-0.5 rounded-sm">
                                            {v.registration}
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm text-platinum mb-3 group-hover:text-gold transition-colors duration-300"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {v.name}
                                    </p>
                                    <div className="space-y-1.5 text-[11px] text-muted">
                                        <div className="flex justify-between">
                                            <span>Last service</span>
                                            <span className="text-platinum">{format(new Date(v.lastService), "dd MMM yyyy")}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Next service</span>
                                            <span className={cn("font-medium", health.text)}>
                                                {daysUntil > 0 ? `${daysUntil} days` : "Due now"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Mileage</span>
                                            <span className="text-platinum">{v.mileage.toLocaleString("en-KE")} km</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Showroom / Browse More Cars ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3
                            className="text-sm text-platinum tracking-wider"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            From the Showroom
                        </h3>
                        <p className="text-[10px] text-muted tracking-wider mt-1">Available vehicles you may like</p>
                    </div>
                    <GoldButton href="/collection" size="sm" className="text-xs">
                        Browse All <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                    </GoldButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedCars.map((car, i) => (
                        <motion.div
                            key={car.id}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                        >
                            <Link
                                href={`/collection/${car.slug}`}
                                className="block bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden hover:border-gold/15 transition-all duration-500 card-shine group"
                            >
                                <div className="relative h-36 sm:h-40 overflow-hidden">
                                    <Image
                                        src={car.images.hero}
                                        alt={car.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <Eye className="w-8 h-8 text-gold/60" strokeWidth={1} />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5">
                                    <p className="text-sm text-platinum group-hover:text-gold transition-colors duration-300 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                                        {car.name}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gold">
                                            KES {formatPrice(car.price.kes, "KES")}
                                        </span>
                                        <span className="text-[10px] text-muted">{car.specs.engine}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[10px] text-muted">{car.specs.drive_train}</span>
                                        <span className="text-white/10">·</span>
                                        <span className="text-[10px] text-muted">{car.specs.transmission}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ─── Quick Actions ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <h3
                    className="text-sm text-platinum tracking-wider mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <button
                        onClick={() => setBookingModalOpen(true)}
                        className="flex items-center gap-3 sm:gap-4 bg-card/60 border border-white/[0.06] rounded-sm px-4 sm:px-5 py-3 sm:py-4 hover:border-gold/20 transition-all duration-300 group text-left"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center group-hover:bg-gold/[0.08] transition-all duration-500 flex-shrink-0">
                            <Wrench className="w-4 h-4 text-gold" strokeWidth={1.2} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-platinum group-hover:text-gold transition-colors">Book a Service</p>
                            <p className="text-[10px] text-muted truncate">Schedule your next appointment</p>
                        </div>
                    </button>
                    <Link
                        href="/dashboard/service#history"
                        className="flex items-center gap-3 sm:gap-4 bg-card/60 border border-white/[0.06] rounded-sm px-4 sm:px-5 py-3 sm:py-4 hover:border-gold/20 transition-all duration-300 group"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center group-hover:bg-gold/[0.08] transition-all duration-500 flex-shrink-0">
                            <CalendarCheck className="w-4 h-4 text-gold" strokeWidth={1.2} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-platinum group-hover:text-gold transition-colors">View History</p>
                            <p className="text-[10px] text-muted truncate">Past services and invoices</p>
                        </div>
                    </Link>
                    <Link
                        href="/collection"
                        className="flex items-center gap-3 sm:gap-4 bg-card/60 border border-white/[0.06] rounded-sm px-4 sm:px-5 py-3 sm:py-4 hover:border-gold/20 transition-all duration-300 group"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center group-hover:bg-gold/[0.08] transition-all duration-500 flex-shrink-0">
                            <ShoppingCart className="w-4 h-4 text-gold" strokeWidth={1.2} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-platinum group-hover:text-gold transition-colors">Browse Showroom</p>
                            <p className="text-[10px] text-muted truncate">Explore latest vehicles</p>
                        </div>
                    </Link>
                    <a
                        href="tel:+254742577640"
                        className="flex items-center gap-3 sm:gap-4 bg-card/60 border border-white/[0.06] rounded-sm px-4 sm:px-5 py-3 sm:py-4 hover:border-gold/20 transition-all duration-300 group"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center group-hover:bg-gold/[0.08] transition-all duration-500 flex-shrink-0">
                            <Phone className="w-4 h-4 text-gold" strokeWidth={1.2} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-platinum group-hover:text-gold transition-colors">Contact Us</p>
                            <p className="text-[10px] text-muted truncate">Speak with our team</p>
                        </div>
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
