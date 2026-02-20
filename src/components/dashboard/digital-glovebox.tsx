"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, FileText, Shield, CheckCircle, AlertCircle,
    TrendingUp, TrendingDown, DollarSign, Download,
    ChevronRight, CreditCard, History
} from "lucide-react";
import { AlmasiCar } from "@/types/car";
import GoldButton from "@/components/ui/gold-button";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

interface DigitalGloveboxProps {
    car: any; // Using any for now to avoid strict type issues with the extended admin mock data
    isOpen: boolean;
    onClose: () => void;
}

const tabs = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "docs", label: "Documents", icon: FileText },
    { id: "service", label: "Service History", icon: History },
];

export default function DigitalGlovebox({ car, isOpen, onClose }: DigitalGloveboxProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const [sellBackRequested, setSellBackRequested] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-start justify-between bg-white/[0.02]">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] tracking-wider uppercase text-gold/80 border border-gold/20 px-2 py-0.5 rounded-sm bg-gold/[0.05]">
                                Digital Glovebox
                            </span>
                            <span className="text-[10px] tracking-wider uppercase text-muted">
                                {car.registration}
                            </span>
                        </div>
                        <h2 className="text-2xl text-platinum" style={{ fontFamily: "var(--font-heading)" }}>
                            {car.name}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 border-r border-white/10 bg-white/[0.01]">
                        <div className="p-4 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 rounded-sm ${activeTab === tab.id
                                        ? "bg-gold/10 text-gold border border-gold/20"
                                        : "text-muted hover:bg-white/5 hover:text-platinum"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Valuation Card */}
                                    <div className="bg-card border border-white/10 rounded-sm p-6 relative overflow-hidden group hover:border-gold/20 transition-colors">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <TrendingUp className="w-24 h-24 text-gold" />
                                        </div>

                                        <div className="relative z-10">
                                            <p className="text-xs text-muted tracking-wider uppercase mb-1">Current Valuation</p>
                                            <div className="flex items-baseline gap-4 mb-4">
                                                <h3 className="text-4xl text-platinum" style={{ fontFamily: "var(--font-heading)" }}>
                                                    {formatPrice(car.valuation?.price || 0, "KES")}
                                                </h3>
                                                {car.valuation?.trend && (
                                                    <span className={`flex items-center gap-1 text-sm font-medium ${car.valuation.trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                                        {car.valuation.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                        {Math.abs(car.valuation.trend)}%
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-white/5 rounded p-3">
                                                    <p className="text-[10px] text-muted uppercase">Purchase Price</p>
                                                    <p className="text-sm text-platinum">{formatPrice(car.valuation?.purchasePrice || 0, "KES")}</p>
                                                </div>
                                                <div className="bg-white/5 rounded p-3">
                                                    <p className="text-[10px] text-muted uppercase">Appreciation</p>
                                                    <p className={`text-sm ${((car.valuation?.price || 0) - (car.valuation?.purchasePrice || 0)) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                                        {((car.valuation?.price || 0) - (car.valuation?.purchasePrice || 0)) >= 0 ? "+" : "-"}
                                                        {formatPrice(Math.abs((car.valuation?.price || 0) - (car.valuation?.purchasePrice || 0)), "KES")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                {sellBackRequested ? (
                                                    <div className="w-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 p-3 rounded-sm flex items-center justify-center gap-2">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Request Sent! An agent will contact you.</span>
                                                    </div>
                                                ) : (
                                                    <GoldButton
                                                        className="w-full justify-center"
                                                        onClick={() => setSellBackRequested(true)}
                                                    >
                                                        <CreditCard className="w-4 h-4 mr-2" />
                                                        Sell Back to Almasi
                                                    </GoldButton>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-muted mt-3 text-center">
                                                *Valuation is an estimate based on market trends and vehicle condition.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Specs Overview */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="bg-white/[0.02] border border-white/10 p-4 rounded-sm">
                                            <p className="text-[10px] text-muted uppercase mb-1">Mileage</p>
                                            <p className="text-platinum">{car.mileage?.toLocaleString()} km</p>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/10 p-4 rounded-sm">
                                            <p className="text-[10px] text-muted uppercase mb-1">Next Service</p>
                                            <p className="text-platinum">{car.nextService}</p>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/10 p-4 rounded-sm">
                                            <p className="text-[10px] text-muted uppercase mb-1">Status</p>
                                            <p className="capitalize text-platinum">{car.serviceStatus}</p>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/10 p-4 rounded-sm">
                                            <p className="text-[10px] text-muted uppercase mb-1">Registration</p>
                                            <p className="text-platinum">{car.registration}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "docs" && (
                                <motion.div
                                    key="docs"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg text-platinum">Vehicle Documents</h3>
                                        <span className="text-xs text-muted/60">Secure • Encrypted • Verified</span>
                                    </div>

                                    <div className="space-y-3">
                                        {car.documents?.map((doc: any) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-sm group hover:bg-white/[0.04] transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center text-gold">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-platinum font-medium">{doc.title}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-muted">{doc.date}</span>
                                                            <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3" /> {doc.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="p-2 hover:bg-white/10 rounded transition-colors text-muted hover:text-gold" title="Download">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {(!car.documents || car.documents.length === 0) && (
                                            <div className="text-center py-12 text-muted">
                                                <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                                <p>No documents available yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "service" && (
                                <motion.div
                                    key="service"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-center py-12"
                                >
                                    <History className="w-12 h-12 mx-auto mb-4 text-muted/30" />
                                    <h3 className="text-platinum mb-2">Service History</h3>
                                    <p className="text-muted text-sm max-w-xs mx-auto mb-6">
                                        View complete service records reflecting all maintenance performed by Almasi.
                                    </p>
                                    <GoldButton href="/dashboard/service#history" size="sm">
                                        Go to Service Portal
                                    </GoldButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

