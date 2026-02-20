"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SourcingRequest from "@/components/dashboard/sourcing-request";
import ImportTracker from "@/components/dashboard/import-tracker";
import SourcingAssistant from "@/components/dashboard/sourcing-assistant";
import { sourcingRequests } from "@/data/admin"; // Mock data

export default function SourcingPage() {
    // Mock active request
    const activeImport = sourcingRequests.find(r => r.id === "sr1");

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl text-platinum tracking-wider"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Sourcing Concierge
                    </h1>
                    <p className="text-sm text-muted mt-2">
                        Track your imports and request new vehicles.
                    </p>
                </div>
            </div>

            {activeImport && (
                <div className="mb-4">
                    <h3 className="text-sm text-platinum mb-6 tracking-wider">Active Import</h3>
                    <ImportTracker request={activeImport as any} />
                </div>
            )}

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                {/* Main Content: Sourcing Request (AI Upload) */}
                <div className="lg:col-span-2 space-y-8">
                    <SourcingRequest />

                    {/* History or specific details could go here */}
                    <div className="bg-card/40 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-sm text-platinum mb-4 tracking-wider">Recent Requests</h3>
                        <p className="text-xs text-muted">No other recent requests found.</p>
                    </div>
                </div>

                {/* Assistant Column */}
                <div className="lg:col-span-1">
                    <SourcingAssistant />
                </div>
            </div>
        </div>
    );
}
