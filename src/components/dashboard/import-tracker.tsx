"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Ship, MapPin, Truck, CheckCircle, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
    id: number;
    label: string;
    date: string | null;
    location: string;
    vessel?: string;
}

interface ImportTrackerProps {
    request: {
        id: string;
        detectedSpec: {
            make: string;
            model: string;
            year: number;
        };
        tracker: {
            currentStage: number;
            stages: Stage[];
            eta: string;
        };
    };
}

const icons = {
    1: CheckCircle2,
    2: Ship,
    3: Anchor, // Changed to Anchor for arrival/port
    4: CheckCircle,
    5: Truck,
};

export default function ImportTracker({ request }: ImportTrackerProps) {
    const { tracker, detectedSpec } = request;
    const currentStageIndex = tracker.currentStage;

    return (
        <div className="relative group overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A]">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="p-6 sm:p-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-medium">
                                Live Import Tracker
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl text-platinum tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                            {detectedSpec.year} <span className="text-white font-light">{detectedSpec.make} {detectedSpec.model}</span>
                        </h3>
                    </div>

                    <div className="flex gap-6 text-right">
                        <div>
                            <p className="text-[9px] text-muted uppercase tracking-wider mb-0.5">Estimated Arrival</p>
                            <p className="text-lg text-gold font-light" style={{ fontFamily: "var(--font-heading)" }}>
                                {tracker.eta}
                            </p>
                        </div>
                        {tracker.stages[1].vessel && (
                            <div className="hidden sm:block">
                                <p className="text-[9px] text-muted uppercase tracking-wider mb-0.5">Vessel Name</p>
                                <p className="text-lg text-platinum font-light" style={{ fontFamily: "var(--font-heading)" }}>
                                    {tracker.stages[1].vessel}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Stepper */}
                <div className="relative mx-2 sm:mx-4">
                    {/* Background Line */}
                    <div className="absolute top-[19px] left-0 w-full h-[1px] bg-white/10 hidden sm:block" />

                    {/* Active Gradient Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStageIndex - 1) / (tracker.stages.length - 1)) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-[19px] left-0 h-[1px] bg-gradient-to-r from-emerald-500/50 via-emerald-400 to-gold hidden sm:block"
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    </motion.div>

                    <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                        {tracker.stages.map((stage, index) => {
                            const StageIcon = icons[stage.id as keyof typeof icons] || Circle;
                            const isActive = stage.id === currentStageIndex;
                            const isCompleted = stage.id < currentStageIndex;

                            return (
                                <div key={stage.id} className="flex sm:flex-col items-center gap-5 sm:gap-0 group/stage relative">
                                    {/* Icon Container */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 relative z-10",
                                        isActive ? "bg-[#0A0A0A] border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-110" :
                                            isCompleted ? "bg-[#0A0A0A] border-emerald-500/30 text-emerald-500" :
                                                "bg-[#0A0A0A] border-white/5 text-white/20"
                                    )}>
                                        <StageIcon className={cn("w-4 h-4 transition-all duration-500", isActive && "animate-pulse")} strokeWidth={1.5} />

                                        {/* Active Ripple Effect */}
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
                                        )}
                                    </div>

                                    {/* Vertical Line for Mobile */}
                                    {index !== tracker.stages.length - 1 && (
                                        <div className={cn(
                                            "absolute left-[19px] top-10 bottom-[-32px] w-[1px] sm:hidden",
                                            isCompleted ? "bg-emerald-500/30" : "bg-white/5"
                                        )} />
                                    )}

                                    {/* Content */}
                                    <div className="sm:absolute sm:top-14 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-32 sm:text-center">
                                        <p className={cn(
                                            "text-[10px] uppercase tracking-widest font-medium mb-1 transition-colors duration-500",
                                            isActive ? "text-gold" :
                                                isCompleted ? "text-emerald-400" :
                                                    "text-muted/40"
                                        )}>
                                            {stage.label}
                                        </p>
                                        <p className={cn(
                                            "text-sm font-light transition-colors duration-500",
                                            isActive || isCompleted ? "text-platinum" : "text-muted/30"
                                        )}>
                                            {stage.location}
                                        </p>
                                        <p className="text-[10px] text-muted/50 mt-1 font-mono">
                                            {stage.date || "-- --- ----"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
