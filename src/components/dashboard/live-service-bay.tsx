"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Clock, AlertTriangle, CheckCircle, XCircle, Play, ChevronRight, X, User, Pause } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Update {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    media: string | null;
    comparison?: string;
    actionRequired?: boolean;
    status?: string;
}

interface LiveServiceBayProps {
    data: {
        vehicleId: string;
        advisor: string;
        bay: string;
        startTime: string;
        updates: Update[];
    };
    onClose: () => void;
    isPage?: boolean;
}

export default function LiveServiceBay({ data, onClose, isPage = false }: LiveServiceBayProps) {
    const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
    const [videoPlaying, setVideoPlaying] = useState(false);

    // Filter actionable item
    const actionItem = data.updates.find(u => u.actionRequired && u.status === "pending");

    return (
        <div className={cn(
            "flex items-center justify-center bg-black/80 backdrop-blur-md md:p-4",
            isPage ? "relative w-full h-auto md:h-full" : "fixed inset-0 z-50"
        )}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "w-full bg-[#0A0A0A] md:border border-white/10 md:rounded-sm flex flex-col md:flex-row relative",
                    // Mobile & isPage: Natural height, no overflow hidden (let page scroll)
                    // Desktop or Modal: Fixed height, overflow hidden (internal scroll)
                    isPage ? "h-auto md:h-full overflow-visible md:overflow-hidden" : "h-full md:h-auto md:max-h-[90vh] md:max-w-4xl overflow-hidden"
                )}
            >
                {/* Mobile Close Button (Top Right fixed) */}
                <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-sm">
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Live Feed */}
                {/* Mobile: Order 2 (below details if selected, or just list) - relying on natural flow/scroll */}
                <div className={cn(
                    "flex-1 flex flex-col md:border-r border-white/10 order-2 md:order-1",
                    isPage ? "overflow-visible md:overflow-y-auto" : "overflow-y-auto custom-scrollbar"
                )} data-lenis-prevent="true">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 sticky top-0 bg-[#0A0A0A] z-40 shadow-md">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <h3 className="text-sm text-platinum tracking-widest uppercase font-medium">
                                    Live Service Bay
                                </h3>
                            </div>
                            <p className="text-xs text-muted flex items-center gap-3">
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {data.advisor}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {data.startTime}</span>
                            </p>
                        </div>
                    </div>

                    {/* Timeline Feed */}
                    <div className="p-6 space-y-8 pb-20 md:pb-6">
                        {data.updates.map((update, index) => (
                            <div key={update.id} className="relative pl-8 group">
                                {/* Timeline Line */}
                                {index !== data.updates.length - 1 && (
                                    <div className="absolute left-[11px] top-8 bottom-[-32px] w-[1px] bg-white/10 group-hover:bg-gold/30 transition-colors" />
                                )}

                                {/* Timeline Dot */}
                                <div className={cn(
                                    "absolute left-0 top-1 w-6 h-6 rounded-full border flex items-center justify-center bg-[#0A0A0A] z-10 transition-colors",
                                    update.actionRequired ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" :
                                        update.type === "photo" || update.type === "video" ? "border-gold text-gold" :
                                            "border-white/20 text-muted"
                                )}>
                                    {update.type === "photo" ? <Camera className="w-3 h-3" /> :
                                        update.type === "video" ? <Play className="w-3 h-3" fill="currentColor" /> :
                                            <Clock className="w-3 h-3" />}
                                </div>

                                {/* Content */}
                                <div>
                                    <div className="flex items-start justify-between mb-1 gap-2">
                                        <p className={cn(
                                            "text-sm font-medium break-words min-w-0",
                                            update.actionRequired ? "text-red-400" : "text-platinum"
                                        )}>
                                            {update.title}
                                        </p>
                                        <span className="text-[10px] text-muted whitespace-nowrap shrink-0 mt-0.5">{update.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed mb-3">
                                        {update.description}
                                    </p>

                                    {/* Media Preview (Mobile: Click updates state, but view is above) */}
                                    {update.media && (
                                        <div
                                            onClick={() => {
                                                setSelectedUpdate(update);
                                                // Mobile: Scroll to top to see media
                                                if (window.innerWidth < 768) {
                                                    document.querySelector('.live-bay-media')?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                            className="relative h-32 w-full rounded-sm overflow-hidden border border-white/10 group/media cursor-pointer hover:border-gold/50 transition-all"
                                        >
                                            {/* Placeholder for Media */}
                                            <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                                                {update.type === "video" ? (
                                                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover/media:scale-110 transition-transform">
                                                        <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                                                    </div>
                                                ) : (
                                                    <Camera className="w-6 h-6 text-muted/50" />
                                                )}
                                            </div>
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/20 group-hover/media:bg-transparent transition-colors" />
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    {update.actionRequired && (
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedUpdate(update);
                                                    if (window.innerWidth < 768) {
                                                        document.querySelector('.live-bay-media')?.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }}
                                                className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] uppercase tracking-wider rounded-sm hover:bg-red-500/20 transition-colors flex items-center gap-2"
                                            >
                                                <AlertTriangle className="w-3 h-3" />
                                                Review Issue
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Media / Details View */}
                {/* Mobile: Order 1 (Top). Fixed height on mobile or flexible? */}
                <div className="live-bay-media w-full overflow-hidden flex-shrink-0 md:flex-[1.5] bg-[#050505] relative flex flex-col order-1 md:order-2 border-b md:border-b-0 border-white/10 md:h-auto min-h-[300px] md:min-h-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all hidden md:flex"
                    >
                        <X className="w-4 h-4" />
                    </button>


                    {selectedUpdate ? (
                        <div className="flex-1 flex flex-col h-full">
                            {/* Media Player Area */}
                            <div className="flex-1 relative bg-black flex items-center justify-center group/player">
                                {selectedUpdate.type === "video" ? (
                                    <div className="text-center">
                                        <div
                                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform mx-auto"
                                            onClick={() => setVideoPlaying(!videoPlaying)}
                                        >
                                            {videoPlaying ? (
                                                <Pause className="w-6 h-6 text-white" fill="currentColor" />
                                            ) : (
                                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted uppercase tracking-widest">
                                            {videoPlaying ? "Playing Clip..." : "Watch Technician's Report"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-muted text-sm flex flex-col items-center gap-2">
                                        <Camera className="w-8 h-8 opacity-50" />
                                        <span>Full Resolution Image</span>
                                    </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                            </div>

                            {/* Comparison / Action Area */}
                            <div className="p-4 sm:p-8 bg-[#0A0A0A] border-t border-white/10 min-h-[200px]">
                                {selectedUpdate.actionRequired ? (
                                    <div className="max-w-xl mx-auto">
                                        <div className="flex items-start gap-4 mb-6">
                                            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-lg text-platinum mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                                                    Technician Recommendation
                                                </h4>
                                                <p className="text-sm text-muted leading-relaxed">
                                                    {selectedUpdate.description}. The pads have worn down to the wear indicator.
                                                    Continuing to drive may damage the rotors.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 mb-8 sm:grid-cols-2">
                                            <div className="p-4 rounded-sm bg-white/5 border border-white/10 text-center">
                                                <p className="text-[10px] uppercase text-muted mb-1">Current Part</p>
                                                <p className="text-red-400 font-medium">3mm Thickness</p>
                                            </div>
                                            <div className="p-4 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-center">
                                                <p className="text-[10px] uppercase text-emerald-400 mb-1">New Part</p>
                                                <p className="text-emerald-400 font-medium">12mm Thickness</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <GoldButton className="flex-1 h-auto py-3 px-2 sm:px-6 justify-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                                    <div className="flex items-center">
                                                        <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                                                        <span>Approve</span>
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs tracking-wider opacity-90">(KES 45,000)</span>
                                                </div>
                                            </GoldButton>
                                            <button className="px-6 py-3 border border-white/10 text-muted hover:text-white rounded-sm text-xs uppercase tracking-wider transition-colors">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-left">
                                        <h4 className="text-lg text-platinum mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                                            {selectedUpdate.title}
                                        </h4>
                                        <p className="text-sm text-muted">{selectedUpdate.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted/50">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Play className="w-6 h-6 ml-1" />
                            </div>
                            <p className="text-sm">Select an update to view details</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
