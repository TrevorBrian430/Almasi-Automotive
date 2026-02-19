"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkshopVehicle, WorkshopStatus } from "@/types/service";
import { useServiceStore } from "@/store/service-store";
import { X, Phone, User, Wrench, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statusFlow: WorkshopStatus[] = ["Scheduled", "In Bay", "Repairing", "Ready"];

const statusLabels: Record<WorkshopStatus, string> = {
    Scheduled: "Scheduled",
    "In Bay": "In Bay (Diagnosing)",
    Repairing: "Repairing / Detailing",
    Ready: "Ready for Collection",
};

interface VehicleCardModalProps {
    vehicle: WorkshopVehicle | null;
    onClose: () => void;
}

export default function VehicleCardModal({ vehicle, onClose }: VehicleCardModalProps) {
    const { moveVehicle } = useServiceStore();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (vehicle) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [vehicle, onClose]);

    const currentIndex = vehicle ? statusFlow.indexOf(vehicle.status) : -1;
    const canMoveNext = currentIndex < statusFlow.length - 1;
    const canMovePrev = currentIndex > 0;

    function handleMove(direction: "next" | "prev") {
        if (!vehicle) return;
        const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < statusFlow.length) {
            moveVehicle(vehicle.id, statusFlow[newIndex]);
        }
    }

    return (
        <AnimatePresence>
            {vehicle && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === overlayRef.current) onClose();
                    }}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/[0.08] rounded-sm overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between">
                            <div>
                                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-1">
                                    Workshop Detail
                                </p>
                                <h2
                                    className="text-lg text-platinum tracking-wider"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {vehicle.registration}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-muted hover:text-platinum transition-colors p-1"
                            >
                                <X className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Vehicle info */}
                            <div className="bg-white/[0.02] border border-white/[0.06] rounded-sm p-4">
                                <h3
                                    className="text-base text-platinum mb-1 tracking-wider"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {vehicle.vehicleName}
                                </h3>
                                <p className="text-xs text-gold/70">{vehicle.serviceType}</p>
                            </div>

                            {/* Customer info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-gold/60" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">
                                            {vehicle.customerName}
                                        </p>
                                        <p className="text-[11px] text-muted">Customer</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-gold/60" strokeWidth={1.2} />
                                    <p className="text-sm text-platinum">
                                        {vehicle.customerPhone}
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Wrench className="w-4 h-4 text-gold/60 mt-0.5" strokeWidth={1.2} />
                                    <div>
                                        <p className="text-sm text-platinum">
                                            {vehicle.assignedMechanic}
                                        </p>
                                        <p className="text-[11px] text-muted">
                                            Assigned Mechanic
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-gold/60" strokeWidth={1.2} />
                                    <p className="text-xs text-muted">
                                        Est. completion:{" "}
                                        <span className="text-platinum">
                                            {format(new Date(vehicle.estimatedCompletion), "dd MMM yyyy")}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Reported issue */}
                            <div>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
                                    Reported Issue
                                </p>
                                <div className="bg-white/[0.02] border border-white/[0.06] rounded-sm p-4">
                                    <p className="text-sm text-platinum/80 leading-relaxed">
                                        {vehicle.reportedIssue}
                                    </p>
                                </div>
                            </div>

                            {/* Status flow */}
                            <div>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                                    Current Status
                                </p>
                                <div className="flex items-center gap-1">
                                    {statusFlow.map((status, i) => (
                                        <div key={status} className="flex items-center gap-1 flex-1">
                                            <div
                                                className={cn(
                                                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                                                    i <= currentIndex
                                                        ? "bg-gold"
                                                        : "bg-white/[0.06]"
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gold mt-2">
                                    {statusLabels[vehicle.status]}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                {canMovePrev && (
                                    <GoldButton
                                        onClick={() => handleMove("prev")}
                                        className="flex-1 justify-center border-white/10 text-platinum hover:bg-white/5 hover:border-white/20 hover:shadow-none"
                                    >
                                        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                                        {statusLabels[statusFlow[currentIndex - 1]]}
                                    </GoldButton>
                                )}
                                {canMoveNext && (
                                    <GoldButton
                                        onClick={() => handleMove("next")}
                                        className="flex-1 justify-center"
                                    >
                                        {statusLabels[statusFlow[currentIndex + 1]]}
                                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                                    </GoldButton>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
