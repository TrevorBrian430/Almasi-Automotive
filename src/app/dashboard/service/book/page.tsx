"use client";

import ServiceBookingForm from "@/components/dashboard/service-booking-form";

export default function BookServicePage() {
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
                    Book a Service
                </h1>
                <p className="text-sm text-muted mt-2">
                    Schedule your next service appointment with our factory-trained technicians.
                </p>
            </div>

            <ServiceBookingForm />
        </div>
    );
}
