"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
    Car, DollarSign, CalendarCheck, Star, Clock, TrendingUp,
    Wrench, Users, Package, ShoppingCart, Tag,
} from "lucide-react";
import {
    monthlyRevenue, serviceBreakdown, weeklyBookings,
    topMechanics, recentCustomerActivity, adminKpis,
    inventoryBreakdown, monthlySales, recentSales,
} from "@/data/admin";
import { cars } from "@/data/cars";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

const statusColors: Record<string, string> = {
    Scheduled: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "In Bay": "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Repairing: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    Ready: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Processing: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const carStatusColors: Record<string, string> = {
    Available: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Reserved: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Importing: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Sold: "text-red-400 bg-red-400/10 border-red-400/20",
};

function GoldTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
    if (!active || !payload) return null;
    return (
        <div className="bg-[#111] border border-white/[0.08] rounded-sm px-3 py-2 shadow-xl">
            <p className="text-[10px] text-muted tracking-wider mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="text-xs text-platinum">
                    {entry.name}: <span className="text-gold">{entry.value.toLocaleString("en-KE")}</span>
                </p>
            ))}
        </div>
    );
}

export default function AdminDashboardPage() {
    /* ─── Top KPIs ─── */
    const kpiCards = [
        { label: "Total Inventory", value: adminKpis.totalInventory.toString(), icon: Package, change: `${adminKpis.availableVehicles} available`, positive: true },
        { label: "Inventory Value", value: `${(adminKpis.inventoryValue / 1000000).toFixed(0)}M`, icon: Tag, change: "KES", positive: true },
        { label: "Sales Revenue", value: `${(adminKpis.monthlySalesRevenue / 1000000).toFixed(1)}M`, icon: ShoppingCart, change: "This month", positive: true },
        { label: "Vehicles Serviced", value: adminKpis.totalVehiclesServiced.toString(), icon: Car, change: "+12%", positive: true },
        { label: "Service Revenue", value: `${(adminKpis.serviceRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, change: "+18%", positive: true },
        { label: "Customer Rating", value: adminKpis.customerSatisfaction.toString(), icon: Star, change: "4.8/5", positive: true },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Automotive
                </p>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Admin Dashboard
                </h1>
                <p className="text-sm text-muted mt-2">
                    Inventory, sales & workshop overview
                </p>
            </div>

            {/* ─── KPI Row ─── */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                {kpiCards.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="bg-card/60 border border-white/[0.06] rounded-sm p-3 sm:p-5 hover:border-gold/15 transition-all duration-500 card-shine group"
                    >
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/15 bg-gold/[0.04] flex items-center justify-center group-hover:bg-gold/[0.08] transition-all duration-500">
                                <kpi.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" strokeWidth={1.2} />
                            </div>
                            <span className="text-[9px] sm:text-[10px] tracking-wider text-emerald-400 flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" />
                                {kpi.change}
                            </span>
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

            {/* ═══ INVENTORY SECTION ═══ */}
            <div>
                <h2
                    className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-4 flex items-center gap-2"
                >
                    <Package className="w-3.5 h-3.5" strokeWidth={1.2} />
                    Inventory & Sales
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Revenue Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-2 bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                    >
                        <div className="flex items-center justify-between mb-5 sm:mb-6">
                            <div>
                                <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                                    Vehicle Sales
                                </h3>
                                <p className="text-[10px] text-muted tracking-wider mt-1">Monthly sales revenue (KES)</p>
                            </div>
                            <ShoppingCart className="w-4 h-4 text-gold/40" strokeWidth={1.2} />
                        </div>
                        <div className="h-48 sm:h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlySales}>
                                    <defs>
                                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                                    <Tooltip content={<GoldTooltip />} />
                                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#34d399" strokeWidth={2} fill="url(#salesGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Inventory Status Pie */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                    >
                        <h3 className="text-sm text-platinum tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                            Inventory Status
                        </h3>
                        <p className="text-[10px] text-muted tracking-wider mb-4 sm:mb-6">Vehicle availability</p>
                        <div className="h-40 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={inventoryBreakdown} cx="50%" cy="50%" outerRadius={65} innerRadius={35} paddingAngle={3} dataKey="value" strokeWidth={0}>
                                        {inventoryBreakdown.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<GoldTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {inventoryBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] text-muted truncate">{item.name}</span>
                                    <span className="text-[10px] text-platinum ml-auto">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Showroom Inventory ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                        Current Inventory
                    </h3>
                    <span className="text-[10px] text-muted tracking-wider">{cars.length} vehicles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cars.slice(0, 4).map((car, i) => (
                        <motion.div
                            key={car.id}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden hover:border-gold/15 transition-all duration-500 card-shine group"
                        >
                            <div className="relative h-32 sm:h-36 overflow-hidden">
                                <Image
                                    src={car.images.hero}
                                    alt={car.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                                <span className={cn(
                                    "absolute top-2 right-2 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm border backdrop-blur-sm",
                                    carStatusColors[car.status] || carStatusColors.Available
                                )}>
                                    {car.status}
                                </span>
                            </div>
                            <div className="p-3 sm:p-4">
                                <p className="text-xs text-platinum truncate group-hover:text-gold transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>
                                    {car.name}
                                </p>
                                <p className="text-[10px] text-gold mt-1">
                                    KES {formatPrice(car.price.kes, "KES")}
                                </p>
                                <p className="text-[10px] text-muted mt-0.5">{car.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ─── Recent Sales ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden"
            >
                <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                        Recent Sales
                    </h3>
                    <p className="text-[10px] text-muted tracking-wider mt-1">Latest vehicle transactions</p>
                </div>
                {/* Desktop */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {["Vehicle", "Buyer", "Date", "Price (KES)", "Status"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.15em] uppercase text-muted font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.map((s) => (
                                <tr key={s.vehicle} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-8 rounded-sm overflow-hidden flex-shrink-0">
                                                <Image src={`/cars/${s.slug}/hero.jpg`} alt={s.vehicle} fill className="object-cover" sizes="48px" />
                                            </div>
                                            <span className="text-sm text-platinum">{s.vehicle}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-muted">{s.buyer}</td>
                                    <td className="px-5 py-3.5 text-xs text-muted">{format(new Date(s.date), "dd MMM yyyy")}</td>
                                    <td className="px-5 py-3.5 text-sm text-gold">{s.price.toLocaleString("en-KE")}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm border", statusColors[s.status])}>{s.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Mobile */}
                <div className="sm:hidden p-3 space-y-3">
                    {recentSales.map((s) => (
                        <div key={s.vehicle} className="bg-white/[0.02] border border-white/[0.04] rounded-sm overflow-hidden">
                            <div className="relative h-28">
                                <Image src={`/cars/${s.slug}/hero.jpg`} alt={s.vehicle} fill className="object-cover" sizes="100vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                                <span className={cn("absolute top-2 right-2 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm border backdrop-blur-sm", statusColors[s.status])}>{s.status}</span>
                            </div>
                            <div className="p-3 space-y-1.5">
                                <p className="text-sm text-platinum">{s.vehicle}</p>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted">{s.buyer}</span>
                                    <span className="text-gold">KES {s.price.toLocaleString("en-KE")}</span>
                                </div>
                                <p className="text-[10px] text-muted">{format(new Date(s.date), "dd MMM yyyy")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ═══ SERVICE SECTION ═══ */}
            <div>
                <h2 className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-4 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" strokeWidth={1.2} />
                    Workshop & Service
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Service Revenue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        className="lg:col-span-2 bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                    >
                        <div className="flex items-center justify-between mb-5 sm:mb-6">
                            <div>
                                <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Service Revenue</h3>
                                <p className="text-[10px] text-muted tracking-wider mt-1">Monthly workshop revenue (KES)</p>
                            </div>
                            <DollarSign className="w-4 h-4 text-gold/40" strokeWidth={1.2} />
                        </div>
                        <div className="h-48 sm:h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyRevenue}>
                                    <defs>
                                        <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                                    <Tooltip content={<GoldTooltip />} />
                                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#goldGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Service Mix */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                    >
                        <h3 className="text-sm text-platinum tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Service Mix</h3>
                        <p className="text-[10px] text-muted tracking-wider mb-4 sm:mb-6">By category</p>
                        <div className="h-40 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={serviceBreakdown} cx="50%" cy="50%" outerRadius={65} innerRadius={35} paddingAngle={3} dataKey="value" strokeWidth={0}>
                                        {serviceBreakdown.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<GoldTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {serviceBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] text-muted truncate">{item.name}</span>
                                    <span className="text-[10px] text-platinum ml-auto">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Bookings + Mechanics ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Bookings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                >
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div>
                            <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Weekly Bookings</h3>
                            <p className="text-[10px] text-muted tracking-wider mt-1">Booked vs completed</p>
                        </div>
                        <CalendarCheck className="w-4 h-4 text-gold/40" strokeWidth={1.2} />
                    </div>
                    <div className="h-44 sm:h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyBookings} barSize={14} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                                <Tooltip content={<GoldTooltip />} />
                                <Bar dataKey="bookings" name="Booked" fill="#D4AF37" radius={[2, 2, 0, 0]} opacity={0.4} />
                                <Bar dataKey="completed" name="Completed" fill="#D4AF37" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Top Mechanics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6"
                >
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div>
                            <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Top Mechanics</h3>
                            <p className="text-[10px] text-muted tracking-wider mt-1">Performance leaderboard</p>
                        </div>
                        <Users className="w-4 h-4 text-gold/40" strokeWidth={1.2} />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        {topMechanics.map((m, i) => (
                            <div key={m.name} className="flex items-center gap-3 sm:gap-4 bg-white/[0.02] border border-white/[0.04] rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 hover:border-gold/10 transition-all duration-300">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/[0.08] border border-gold/15 flex items-center justify-center text-xs text-gold font-medium flex-shrink-0">{i + 1}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-platinum truncate">{m.name}</p>
                                    <p className="text-[9px] sm:text-[10px] text-muted">{m.specialty}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs sm:text-sm text-platinum">{m.vehicles}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-gold fill-gold" strokeWidth={0} />
                                        <span className="text-[10px] text-gold">{m.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ─── Recent Activity ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden"
            >
                <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm text-platinum tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Workshop Activity</h3>
                    <p className="text-[10px] text-muted tracking-wider mt-1">Latest service interactions</p>
                </div>
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {["Customer", "Vehicle", "Action", "Time", "Status"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.15em] uppercase text-muted font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recentCustomerActivity.map((a) => (
                                <tr key={a.name} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3.5 text-sm text-platinum">{a.name}</td>
                                    <td className="px-5 py-3.5 text-sm text-muted">{a.vehicle}</td>
                                    <td className="px-5 py-3.5 text-sm text-muted">{a.action}</td>
                                    <td className="px-5 py-3.5 text-xs text-muted">{a.time}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm border", statusColors[a.status])}>{a.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="sm:hidden p-3 space-y-3">
                    {recentCustomerActivity.map((a) => (
                        <div key={a.name} className="bg-white/[0.02] border border-white/[0.04] rounded-sm p-3 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-platinum">{a.name}</span>
                                <span className={cn("text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm border", statusColors[a.status])}>{a.status}</span>
                            </div>
                            <p className="text-xs text-muted">{a.vehicle} — {a.action}</p>
                            <p className="text-[10px] text-muted/60">{a.time}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
