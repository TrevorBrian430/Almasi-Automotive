"use client";

import { liveServiceUpdates } from "@/data/admin";
import LiveServiceBay from "@/components/dashboard/live-service-bay";
import { useRouter } from "next/navigation";

export default function LiveServicePage() {
    const router = useRouter();

    // Mock data wrapper - in real app, fetch based on ID or user
    // We reuse the component but handle onClose logic (maybe redirect back to dashboard or do nothing)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Live Service Bay
                </h1>
            </div>

            {/* 
                Reusing LiveServiceBay component. 
                Mobile: h-auto (natural scroll). 
                Desktop: Fixed height for "Theater Mode" experience.
            */}
            <div className="relative h-auto md:h-[calc(100vh-12rem)] md:min-h-[600px] border border-white/10 rounded-sm overflow-hidden bg-[#0A0A0A]">
                <LiveServiceBay
                    data={liveServiceUpdates}
                    onClose={() => router.push('/dashboard')}
                    isPage={true}
                />
            </div>
        </div>
    );
}
