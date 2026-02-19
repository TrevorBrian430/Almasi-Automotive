"use client";

import { useServiceStore } from "@/store/service-store";
import { Users, Phone, Car, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminCustomersPage() {
    const { workshopVehicles, bookings } = useServiceStore();

    /* Build unique customer list from workshop vehicles */
    const workshopCustomers = workshopVehicles.map((v) => ({
        name: v.customerName,
        phone: v.customerPhone,
        vehicle: v.vehicleName,
        registration: v.registration,
        lastService: v.serviceType,
        status: v.status,
    }));

    /* De-duplicate by name + phone */
    const seen = new Set<string>();
    const customers = workshopCustomers.filter((c) => {
        const key = `${c.name}-${c.phone}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Admin
                </p>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Customer Directory
                </h1>
                <p className="text-sm text-muted mt-2">
                    View all customers who have used our workshop services.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                    { label: "Total Customers", value: customers.length, icon: Users },
                    { label: "Active Vehicles", value: workshopVehicles.length, icon: Car },
                    { label: "New Bookings", value: bookings.length, icon: Phone },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-card border border-white/[0.06] rounded-sm p-4 sm:p-5"
                    >
                        <s.icon className="w-4 h-4 text-gold/60 mb-3" strokeWidth={1.2} />
                        <p className="text-xl sm:text-2xl text-platinum font-medium">{s.value}</p>
                        <p className="text-[10px] sm:text-xs text-muted tracking-wider uppercase mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Customer List */}
            {customers.length === 0 ? (
                <div className="bg-card border border-white/[0.06] rounded-sm p-10 text-center">
                    <AlertCircle className="w-8 h-8 text-muted mx-auto mb-3" strokeWidth={1} />
                    <p className="text-sm text-muted">No customer records yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers.map((c, i) => (
                        <motion.div
                            key={`${c.name}-${i}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-card border border-white/[0.06] rounded-sm p-5 hover:border-gold/15 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gold/[0.06] border border-gold/15 flex items-center justify-center shrink-0">
                                    <span className="text-sm text-gold font-medium">
                                        {c.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm text-platinum truncate">{c.name}</p>
                                    <p className="text-[10px] text-muted tracking-wider">{c.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-muted">
                                <div className="flex justify-between">
                                    <span className="text-muted/60">Vehicle</span>
                                    <span className="text-platinum text-right">{c.vehicle}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted/60">Reg</span>
                                    <span className="uppercase">{c.registration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted/60">Service</span>
                                    <span>{c.lastService}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
