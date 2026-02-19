"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useServiceStore } from "@/store/service-store";
import type { WorkshopVehicle, WorkshopStatus } from "@/types/service";
import VehicleCardModal from "@/components/admin/vehicle-card-modal";
import { cn } from "@/lib/utils";
import { Clock, Wrench, Settings, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const columns: { status: WorkshopStatus; label: string; icon: typeof Clock; color: string }[] = [
    { status: "Scheduled", label: "Scheduled", icon: Clock, color: "border-blue-400/30 text-blue-400" },
    { status: "In Bay", label: "In Bay (Diagnosing)", icon: Settings, color: "border-amber-400/30 text-amber-400" },
    { status: "Repairing", label: "Repairing / Detailing", icon: Wrench, color: "border-orange-400/30 text-orange-400" },
    { status: "Ready", label: "Ready for Collection", icon: CheckCircle, color: "border-emerald-400/30 text-emerald-400" },
];

const serviceBadgeColor: Record<string, string> = {
    "Minor Service": "bg-blue-400/10 text-blue-400 border-blue-400/20",
    "Major Service": "bg-orange-400/10 text-orange-400 border-orange-400/20",
    Diagnostics: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    "Detailing & Bodywork": "bg-pink-400/10 text-pink-400 border-pink-400/20",
};

export default function WorkshopKanban() {
    const { workshopVehicles } = useServiceStore();
    const [selectedVehicle, setSelectedVehicle] = useState<WorkshopVehicle | null>(null);

    function getVehiclesByStatus(status: WorkshopStatus) {
        return workshopVehicles.filter((v) => v.status === status);
    }

    return (
        <>
            {/* Stats Header */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {columns.map((col) => {
                    const count = getVehiclesByStatus(col.status).length;
                    return (
                        <motion.div
                            key={col.status}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-card/60 border border-white/[0.06] rounded-sm p-4 text-center"
                        >
                            <p
                                className="text-2xl text-platinum mb-1"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {count}
                            </p>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-muted">
                                {col.label}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {columns.map((col, colIndex) => {
                    const vehicles = getVehiclesByStatus(col.status);
                    return (
                        <motion.div
                            key={col.status}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: colIndex * 0.1,
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white/[0.01] border border-white/[0.06] rounded-sm overflow-hidden"
                        >
                            {/* Column header */}
                            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <col.icon
                                        className={cn("w-4 h-4", col.color.split(" ")[1])}
                                        strokeWidth={1.2}
                                    />
                                    <span className="text-xs tracking-[0.12em] uppercase text-platinum">
                                        {col.label}
                                    </span>
                                </div>
                                <span
                                    className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full border",
                                        col.color
                                    )}
                                >
                                    {vehicles.length}
                                </span>
                            </div>

                            {/* Cards */}
                            <div className="p-3 space-y-3 min-h-[200px]">
                                {vehicles.length === 0 && (
                                    <div className="flex items-center justify-center h-32 text-muted/30 text-xs tracking-wider">
                                        No vehicles
                                    </div>
                                )}
                                {vehicles.map((vehicle, i) => (
                                    <motion.button
                                        key={vehicle.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: colIndex * 0.1 + i * 0.05,
                                            duration: 0.4,
                                        }}
                                        onClick={() => setSelectedVehicle(vehicle)}
                                        className="w-full text-left bg-card/80 border border-white/[0.06] rounded-sm p-4 hover:border-gold/20 hover:bg-card transition-all duration-300 group cursor-pointer"
                                    >
                                        {/* Registration */}
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[11px] tracking-[0.15em] uppercase text-gold font-medium bg-gold/[0.06] border border-gold/10 px-2.5 py-0.5 rounded-sm">
                                                {vehicle.registration}
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm border",
                                                    serviceBadgeColor[vehicle.serviceType]
                                                )}
                                            >
                                                {vehicle.serviceType.replace("Detailing & Bodywork", "Detailing")}
                                            </span>
                                        </div>

                                        {/* Vehicle name */}
                                        <p
                                            className="text-sm text-platinum mb-1.5 group-hover:text-gold transition-colors duration-300"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {vehicle.vehicleName}
                                        </p>

                                        {/* Mechanic & date */}
                                        <div className="flex items-center justify-between text-[10px] text-muted">
                                            <span className="flex items-center gap-1">
                                                <Wrench className="w-3 h-3" strokeWidth={1.2} />
                                                {vehicle.assignedMechanic.split(" ")[0]}
                                            </span>
                                            <span>
                                                {format(new Date(vehicle.dateIn), "dd MMM")}
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Detail Modal */}
            <VehicleCardModal
                vehicle={selectedVehicle}
                onClose={() => setSelectedVehicle(null)}
            />
        </>
    );
}
