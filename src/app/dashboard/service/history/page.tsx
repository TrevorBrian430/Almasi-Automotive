"use client";

import ServiceHistory from "@/components/dashboard/service-history";

export default function ServiceHistoryPage() {
    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Care
                </p>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Service History
                </h1>
                <p className="text-sm text-muted mt-2">
                    View your complete vehicle service history and past appointments.
                </p>
            </div>

            <ServiceHistory />
        </div>
    );
}
