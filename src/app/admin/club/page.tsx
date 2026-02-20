"use client";

import { useState } from "react";
import { Plus, Users, Calendar, MapPin, Search, Edit2, Trash2, ShieldCheck, Ticket } from "lucide-react";

export default function AlmasiClubAdminPage() {
    const [activeTab, setActiveTab] = useState<"events" | "perks">("events");

    // Mock data for exclusive events
    const clubEvents = [
        {
            id: "EVT-001",
            title: "Sunday Morning Drive: Rift Valley",
            date: "Oct 22, 2026",
            location: "Nairobi to Naivasha",
            status: "Upcoming",
            slots: { total: 15, booked: 12 },
            image: "landscape"
        },
        {
            id: "EVT-002",
            title: "Track Day Experience",
            date: "Nov 05, 2026",
            location: "Whistling Morans",
            status: "Planning",
            slots: { total: 20, booked: 5 },
            image: "track"
        }
    ];

    // Mock data for partner network
    const partnerPerks = [
        {
            id: "PRK-001",
            partner: "Villa Rosa Kempinski",
            perk: "VIP Valet & Complimentary Concierge Lounge Access",
            category: "Hospitality",
            activeUsers: 45
        },
        {
            id: "PRK-002",
            partner: "Sankara Nairobi",
            perk: "15% off Sarabi Rooftop & Priority Booking",
            category: "Dining",
            activeUsers: 82
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                        Lifestyle & Community
                    </p>
                    <h1
                        className="text-2xl sm:text-3xl text-platinum tracking-wider"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Almasi Club Manager
                    </h1>
                    <p className="text-muted text-sm mt-2">
                        Curate the ownership experience. Manage exclusive events and partner network perks.
                    </p>
                </div>
                <button
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-black text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-gold/90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    {activeTab === "events" ? "Create Event" : "Add Partner"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.08]">
                <button
                    onClick={() => setActiveTab("events")}
                    className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors relative ${activeTab === "events" ? "text-gold" : "text-muted hover:text-platinum"}`}
                >
                    Club Events
                    {activeTab === "events" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
                <button
                    onClick={() => setActiveTab("perks")}
                    className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors relative ${activeTab === "perks" ? "text-gold" : "text-muted hover:text-platinum"}`}
                >
                    Partner Perks (Black Card)
                    {activeTab === "perks" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
            </div>

            {/* Content: Events */}
            {activeTab === "events" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clubEvents.map((evt) => (
                            <div key={evt.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm overflow-hidden hover:border-gold/30 transition-all group">
                                <div className="h-40 bg-white/5 relative border-b border-white/[0.08] flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80 z-10" />
                                    <Calendar className="w-12 h-12 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-gold">
                                        {evt.status}
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <h3 className="text-lg text-platinum font-medium">{evt.title}</h3>

                                    <div className="space-y-2 text-sm text-muted">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> {evt.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> {evt.location}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/[0.06]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-muted flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gold" /> RSVPs</span>
                                            <span className="text-xs text-platinum font-medium">{evt.slots.booked} / {evt.slots.total}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gold rounded-full"
                                                style={{ width: `${(evt.slots.booked / evt.slots.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-sm text-xs text-platinum transition-colors flex justify-center items-center gap-2">
                                            <Ticket className="w-3.5 h-3.5" /> Manage
                                        </button>
                                        <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-sm text-xs text-muted transition-colors">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Content: Perks */}
            {activeTab === "perks" && (
                <div className="space-y-4">
                    {partnerPerks.map((perk) => (
                        <div key={perk.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm p-6 flex flex-col md:flex-row gap-6 items-center justify-between hover:border-white/20 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-gold/60" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gold tracking-widest uppercase mb-1">{perk.category}</p>
                                    <h3 className="text-xl text-platinum font-medium">{perk.partner}</h3>
                                    <p className="text-muted text-sm mt-1">{perk.perk}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/[0.06] md:border-t-0">
                                <div className="text-center px-6 md:border-r border-white/[0.06]">
                                    <p className="text-[10px] text-muted tracking-widest uppercase mb-1">Uses This Month</p>
                                    <p className="text-xl text-platinum">{perk.activeUsers}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-muted hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-muted hover:text-red-400 hover:bg-white/5 rounded-sm transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
