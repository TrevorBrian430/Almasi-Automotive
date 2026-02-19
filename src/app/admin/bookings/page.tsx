"use client";

import { useServiceStore } from "@/store/service-store";
import { ClipboardList, Calendar, Car, Truck, AlertCircle, Phone, User } from "lucide-react";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
    Scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "In Bay": "bg-gold/10 text-gold border-gold/30",
    Repairing: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Ready: "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function AdminBookingsPage() {
    const { bookings, workshopVehicles } = useServiceStore();

    const allItems = [
        ...workshopVehicles.map((v) => ({
            id: v.id,
            vehicle: v.vehicleName,
            registration: v.registration,
            type: v.serviceType,
            date: v.dateIn,
            status: v.status,
            customer: v.customerName,
            contact: v.customerPhone,
            concierge: false,
        })),
        ...bookings.map((b) => ({
            id: b.id,
            vehicle: b.vehicleMakeModel,
            registration: b.registrationNumber,
            type: b.serviceCategory,
            date: b.preferredDate,
            status: b.status,
            customer: "—",
            contact: "—",
            concierge: b.requiresConcierge,
        })),
    ];

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Admin
                </p>
                <h1
                    className="text-xl sm:text-2xl md:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    All Bookings
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-2">
                    Manage all service bookings and workshop reservations.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {[
                    { label: "Total", value: allItems.length, icon: ClipboardList },
                    { label: "Scheduled", value: allItems.filter((i) => i.status === "Scheduled").length, icon: Calendar },
                    { label: "In Progress", value: allItems.filter((i) => i.status === "In Bay" || i.status === "Repairing").length, icon: Car },
                    { label: "Ready", value: allItems.filter((i) => i.status === "Ready").length, icon: Truck },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-card border border-white/[0.06] rounded-sm p-3 sm:p-5"
                    >
                        <s.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gold/60 mb-2 sm:mb-3" strokeWidth={1.2} />
                        <p className="text-lg sm:text-2xl text-platinum font-medium">{s.value}</p>
                        <p className="text-[9px] sm:text-xs text-muted tracking-wider uppercase mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {allItems.length === 0 ? (
                <div className="bg-card border border-white/[0.06] rounded-sm p-8 sm:p-10 text-center">
                    <AlertCircle className="w-8 h-8 text-muted mx-auto mb-3" strokeWidth={1} />
                    <p className="text-sm text-muted">No bookings yet.</p>
                </div>
            ) : (
                <>
                    {/* Mobile: Card view */}
                    <div className="space-y-3 md:hidden">
                        {allItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-card border border-white/[0.06] rounded-sm p-4 space-y-3"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm text-platinum font-medium truncate">{item.vehicle}</p>
                                        <p className="text-[10px] tracking-wider uppercase text-gold/60 mt-0.5">{item.registration}</p>
                                    </div>
                                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[9px] tracking-wider uppercase border rounded-full ${statusColors[item.status] || ""}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-muted/50 block text-[10px] uppercase tracking-wider">Service</span>
                                        <span className="text-muted">{item.type}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted/50 block text-[10px] uppercase tracking-wider">Date</span>
                                        <span className="text-muted">{item.date}</span>
                                    </div>
                                </div>
                                {item.customer !== "—" && (
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                                        <User className="w-3 h-3 text-muted/40" strokeWidth={1.5} />
                                        <span className="text-xs text-muted">{item.customer}</span>
                                        {item.contact !== "—" && (
                                            <>
                                                <Phone className="w-3 h-3 text-muted/40 ml-2" strokeWidth={1.5} />
                                                <span className="text-xs text-muted">{item.contact}</span>
                                            </>
                                        )}
                                    </div>
                                )}
                                {item.concierge && (
                                    <span className="inline-flex text-[9px] tracking-wider uppercase text-gold/60 bg-gold/[0.05] border border-gold/15 px-1.5 py-0.5 rounded">
                                        Concierge
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block bg-card border border-white/[0.06] rounded-sm overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-white/[0.06]">
                                    {["Vehicle", "Reg.", "Service", "Date", "Status", "Customer", "Contact"].map((h) => (
                                        <th key={h} className="px-4 py-3 text-[10px] tracking-[0.3em] uppercase text-muted font-normal whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allItems.map((item) => (
                                    <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                                        <td className="px-4 py-3 text-platinum">{item.vehicle}</td>
                                        <td className="px-4 py-3 text-muted uppercase">{item.registration}</td>
                                        <td className="px-4 py-3 text-muted">{item.type}</td>
                                        <td className="px-4 py-3 text-muted whitespace-nowrap">{item.date}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2.5 py-1 text-[10px] tracking-wider uppercase border rounded-full whitespace-nowrap ${statusColors[item.status] || ""}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted">
                                            {item.customer}
                                            {item.concierge && (
                                                <span className="ml-2 text-[9px] tracking-wider uppercase text-gold/60 bg-gold/[0.05] border border-gold/15 px-1.5 py-0.5 rounded">
                                                    Concierge
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-muted whitespace-nowrap">{item.contact}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
