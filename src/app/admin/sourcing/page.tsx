"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Circle, Clock, MapPin, Search, ChevronRight, Plane, Ship, Anchor, Truck } from "lucide-react";

export default function SourcingDeskPage() {
    const [activeTab, setActiveTab] = useState<"requests" | "tracker">("requests");

    // Mock incoming sourcing inquiries
    const sourcingRequests = [
        {
            id: "SRC-892",
            customer: "Michael B.",
            requestedVehicle: "2024 Porsche 911 GT3 RS",
            sourceImage: "/images/inventory/porsche.jpg",
            budget: "KES 55,000,000",
            status: "Searching UK",
            date: "2h ago"
        },
        {
            id: "SRC-891",
            customer: "Dr. Kamau",
            requestedVehicle: "Mercedes-Benz G63 AMG Magno",
            sourceImage: null,
            budget: "Open",
            status: "Found - Pending Client Approval",
            date: "1d ago"
        }
    ];

    // Mock active import trackers
    const activeImports = [
        {
            id: "TRK-001",
            vehicle: "2023 Range Rover Autobiography",
            customer: "Client #942",
            currentStage: 2, // 1 to 5
            stages: [
                { title: "Verified in UK", icon: CheckCircle2, date: "Oct 12, 10:00 AM" },
                { title: "Loaded on Vessel (Hoegh Target)", icon: Ship, date: "Oct 15, 08:30 AM", active: true },
                { title: "Arrived Mombasa Port", icon: Anchor, date: null },
                { title: "Customs Cleared", icon: CheckCircle2, date: null },
                { title: "En Route to Westlands", icon: Truck, date: null },
            ]
        },
        {
            id: "TRK-002",
            vehicle: "2024 Lexus LX600",
            customer: "Corporate Client A",
            currentStage: 4,
            stages: [
                { title: "Verified in Japan", icon: CheckCircle2, date: "Oct 01" },
                { title: "Loaded on Vessel", icon: Ship, date: "Oct 05" },
                { title: "Arrived Mombasa Port", icon: Anchor, date: "Oct 18" },
                { title: "Customs Cleared", icon: CheckCircle2, date: "Today, 14:00 PM", active: true },
                { title: "En Route to Westlands", icon: Truck, date: null },
            ]
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Sourcing Desk
                </h1>
                <p className="text-muted text-sm">
                    Manage Visual AI sourcing requests and track active vehicle imports in real-time.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.08]">
                <button
                    onClick={() => setActiveTab("requests")}
                    className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors relative ${activeTab === "requests" ? "text-gold" : "text-muted hover:text-platinum"}`}
                >
                    Visual Sourcing Requests
                    {activeTab === "requests" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
                <button
                    onClick={() => setActiveTab("tracker")}
                    className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors relative ${activeTab === "tracker" ? "text-gold" : "text-muted hover:text-platinum"}`}
                >
                    Live Import Tracker
                    {activeTab === "tracker" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
            </div>

            {/* Content: Sourcing Requests */}
            {activeTab === "requests" && (
                <div className="space-y-6">
                    {sourcingRequests.map((req) => (
                        <div key={req.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm p-6 flex flex-col md:flex-row gap-6 hover:border-white/20 transition-all">
                            {/* Visual Match */}
                            <div className="md:w-64 shrink-0 space-y-3 border-r border-white/[0.08] pr-6">
                                <p className="text-[10px] text-muted tracking-widest uppercase">Target Image</p>
                                <div className="aspect-[4/3] bg-card rounded-sm border border-white/5 flex items-center justify-center relative overflow-hidden">
                                    {req.sourceImage ? (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted text-xs">
                                            [Image Match]
                                        </div>
                                    ) : (
                                        <div className="text-muted text-xs mx-auto text-center px-4">AI Vision:<br />No image submitted</div>
                                    )}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] text-gold tracking-widest uppercase mb-1">{req.id} • {req.date}</p>
                                        <h3 className="text-xl text-platinum font-medium">{req.requestedVehicle}</h3>
                                        <p className="text-muted text-sm mt-1">Requested by: <span className="text-white">{req.customer}</span></p>
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-xs text-platinum">
                                        Budget: {req.budget}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-card/40 border border-white/[0.06] rounded-sm p-3">
                                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
                                    <p className="text-sm text-platinum flex-1">Status: <span className="text-gold">{req.status}</span></p>
                                    <button className="text-xs px-4 py-2 bg-white/5 hover:bg-white/10 rounded-sm text-platinum transition-colors">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Content: Live Import Tracker */}
            {activeTab === "tracker" && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeImports.map((trk) => (
                        <div key={trk.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm p-6 hover:border-gold/30 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] text-muted tracking-widest uppercase mb-1">{trk.id} • {trk.customer}</p>
                                    <h3 className="text-lg text-platinum font-medium">{trk.vehicle}</h3>
                                </div>
                                <button className="text-xs px-3 py-1.5 bg-gold text-black uppercase tracking-wider font-semibold rounded-sm hover:bg-gold/90 transition-colors">
                                    Advance Stage
                                </button>
                            </div>

                            {/* Pizza Tracker Timeline */}
                            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-4 before:w-[2px] before:bg-white/[0.06]">
                                {trk.stages.map((stage, idx) => {
                                    const isCompleted = idx < trk.currentStage - 1;
                                    const isActive = idx === trk.currentStage - 1;
                                    const Icon = stage.icon;

                                    return (
                                        <div key={idx} className={`relative flex items-center gap-4 ${isCompleted || isActive ? "opacity-100" : "opacity-40"}`}>
                                            {/* Node */}
                                            <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 z-10 ${isActive ? "bg-gold border-gold text-black shadow-[0_0_15px_rgba(201,160,80,0.4)]" :
                                                    isCompleted ? "bg-[#0A0A0A] border-gold text-gold" :
                                                        "bg-[#0A0A0A] border-white/20 text-muted"
                                                }`}>
                                                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3 h-3" />}
                                            </div>

                                            <div>
                                                <p className={`text-sm font-medium ${isActive ? "text-gold" : "text-platinum"}`}>
                                                    {stage.title}
                                                </p>
                                                {stage.date && (
                                                    <p className="text-xs text-muted mt-0.5">{stage.date}</p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Map Mock/Location Data */}
                            <div className="mt-8 bg-card/40 border border-white/[0.06] rounded-sm p-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-muted">Current Beacon Signal</p>
                                    <p className="text-sm text-platinum">Gulf of Aden (Lat 12.04, Long 45.02)</p>
                                </div>
                                <button className="text-xs text-gold border-b border-gold/30 hover:border-gold transition-colors">
                                    Update Map
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
