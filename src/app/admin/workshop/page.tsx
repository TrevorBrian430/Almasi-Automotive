"use client";

import WorkshopKanban from "@/components/admin/workshop-kanban";

export default function WorkshopPage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
                    Almasi Care
                </p>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Workshop Service Bay
                </h1>
                <p className="text-sm text-muted mt-2">
                    Track vehicles through the service pipeline. Click a card for full details.
                </p>
            </div>

            <WorkshopKanban />
        </div>
    );
}
