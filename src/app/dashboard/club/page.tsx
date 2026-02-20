"use client";

import { motion } from "framer-motion";
import MembershipCard from "@/components/dashboard/membership-card";
import PerksSection from "@/components/dashboard/perks-section";
import { useAuthStore } from "@/store/auth-store";

export default function ClubPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl text-platinum tracking-wider"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Almasi Club
                    </h1>
                    <p className="text-sm text-muted mt-2">
                        Exclusive privileges for our most valued members.
                    </p>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-12 items-start">
                {/* Left: Membership Card */}
                <div className="w-full xl:w-1/3 xl:sticky xl:top-24">
                    <MembershipCard
                        name={user?.name || "Member Name"}
                        memberId="ALM-882-901"
                        memberSince="2024"
                    />
                    <div className="mt-8 p-6 bg-card/40 border border-gold/10 rounded-sm">
                        <h3 className="text-gold text-sm tracking-wider mb-2">Platinum Status</h3>
                        <p className="text-xs text-muted leading-relaxed">
                            You are in the top tier of Almasi owners. your status grants you priority service booking,
                            access to private events, and dedicated sourcing concierge.
                        </p>
                    </div>
                </div>

                {/* Right: Perks & Events */}
                <div className="w-full xl:w-2/3">
                    <PerksSection />
                </div>
            </div>
        </div>
    );
}
