"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Circle, Clock, MapPin, Search, ChevronRight, Plane, Ship, Anchor, Truck } from "lucide-react";
import ImportTracker from "@/components/dashboard/import-tracker";

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
                            <div className="w-full md:w-64 shrink-0 space-y-3 md:border-r border-b md:border-b-0 border-white/[0.08] pb-6 md:pb-0 md:pr-6">
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

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-card/40 border border-white/[0.06] rounded-sm p-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
                                        <p className="text-sm text-platinum truncate">Status: <span className="text-gold">{req.status}</span></p>
                                    </div>
                                    <button className="w-full sm:w-auto text-xs px-4 py-2 bg-white/5 hover:bg-white/10 rounded-sm text-platinum transition-colors whitespace-nowrap">
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
                <div className="grid grid-cols-1 gap-6">
                    {activeImports.map((trk) => {
                        // Parse the vehicle string for the ImportTracker props
                        const parts = trk.vehicle.split(" ");
                        let year = 2024;
                        if (!isNaN(parseInt(parts[0]))) {
                            year = parseInt(parts[0]);
                            parts.shift();
                        }
                        const make = parts[0];
                        const model = parts.slice(1).join(" ");

                        return (
                            <div key={trk.id} className="relative">
                                <ImportTracker
                                    actions={
                                        <>
                                            <button className="w-full sm:w-auto text-xs px-3 py-2 sm:py-1.5 bg-white/5 border border-white/10 text-platinum uppercase tracking-wider font-semibold rounded-sm hover:bg-white/10 transition-colors">
                                                Edit Schedule
                                            </button>
                                            <button className="w-full sm:w-auto text-xs px-3 py-2 sm:py-1.5 bg-gold text-black uppercase tracking-wider font-semibold rounded-sm hover:bg-gold/90 transition-colors">
                                                Advance Stage
                                            </button>
                                        </>
                                    }
                                    request={{
                                        id: trk.id,
                                        detectedSpec: {
                                            make,
                                            model,
                                            year
                                        },
                                        tracker: {
                                            currentStage: trk.currentStage,
                                            eta: "Next Week",
                                            stages: trk.stages.map((s, idx) => ({
                                                id: idx + 1,
                                                label: s.title,
                                                location: idx < trk.currentStage ? "Completed" : "Pending",
                                                date: s.date
                                            }))
                                        }
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
