"use client";

import { motion } from "framer-motion";
import { serviceHistory } from "@/data/service";
import { History } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
    Completed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "In Progress": "text-gold bg-gold/10 border-gold/20",
    Scheduled: "text-blue-400 bg-blue-400/10 border-blue-400/20",
};

export default function ServiceHistory() {
    return (
        <div id="history">
            <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-gold" strokeWidth={1.2} />
                <h2
                    className="text-lg sm:text-xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Service History
                </h2>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {["Date", "Vehicle", "Reg.", "Service", "Mechanic", "Cost (KES)", "Status"].map(
                                    (header) => (
                                        <th
                                            key={header}
                                            className="text-left px-5 py-4 text-[10px] tracking-[0.2em] uppercase text-muted font-medium"
                                        >
                                            {header}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {serviceHistory.map((entry, i) => (
                                <motion.tr
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.05,
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
                                >
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {format(new Date(entry.date), "dd MMM yyyy")}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-platinum">
                                        {entry.vehicle}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-[11px] tracking-[0.1em] uppercase text-gold/70 bg-gold/[0.05] border border-gold/10 px-2 py-0.5 rounded-sm">
                                            {entry.registration}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {entry.serviceType}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {entry.mechanic}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-platinum">
                                        {entry.cost.toLocaleString("en-KE")}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={cn(
                                                "text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm border",
                                                statusColors[entry.status]
                                            )}
                                        >
                                            {entry.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
                {serviceHistory.map((entry, i) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: i * 0.05,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="bg-card/60 border border-white/[0.06] rounded-sm p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-platinum">{entry.vehicle}</span>
                            <span
                                className={cn(
                                    "text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm border",
                                    statusColors[entry.status]
                                )}
                            >
                                {entry.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted">
                            <span>{entry.serviceType}</span>
                            <span className="text-gold/70 bg-gold/[0.05] border border-gold/10 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider">
                                {entry.registration}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted border-t border-white/[0.04] pt-3">
                            <span>{format(new Date(entry.date), "dd MMM yyyy")}</span>
                            <span className="text-platinum">
                                KES {entry.cost.toLocaleString("en-KE")}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
