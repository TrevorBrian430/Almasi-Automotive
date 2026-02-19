"use client";

import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const statusOptions = ["All", "Available", "Reserved", "Sold", "Importing"] as const;
const locationOptions = ["All", "Nairobi Showroom", "Mombasa Port", "Transit"] as const;
const bodyOptions = ["All", "SUV", "Crossover", "Sedan"] as const;

/* ─── Shared filter content ─── */
function FilterContent() {
    const {
        filterStatus,
        filterLocation,
        filterBody,
        setFilterStatus,
        setFilterLocation,
        setFilterBody,
        resetFilters,
    } = useUIStore();

    const hasActiveFilters =
        filterStatus !== "All" || filterLocation !== "All" || filterBody !== "All";

    return (
        <div className="space-y-10">
            <FilterGroup label="Status">
                {statusOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={opt === "Available" ? "Showroom Ready" : opt === "Importing" ? "Import (25 Days)" : opt}
                        active={filterStatus === opt}
                        onClick={() => setFilterStatus(opt as typeof filterStatus)}
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Location">
                {locationOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={opt === "All" ? "All" : opt === "Nairobi Showroom" ? "Westlands" : opt}
                        active={filterLocation === opt}
                        onClick={() => setFilterLocation(opt as typeof filterLocation)}
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Body Type">
                {bodyOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={opt}
                        active={filterBody === opt}
                        onClick={() => setFilterBody(opt as typeof filterBody)}
                    />
                ))}
            </FilterGroup>

            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="text-xs text-gold/70 hover:text-gold tracking-wider uppercase transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
}

/* ─── Desktop: sticky sidebar (only visible on lg+) ─── */
export function DesktopFilterSidebar() {
    return (
        <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-28">
                <h3
                    className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-8 ml-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Refine Collection
                </h3>
                <FilterContent />
            </div>
        </aside>
    );
}

/* ─── Mobile: button + bottom drawer (only visible below lg) ─── */
export function MobileFilterTrigger() {
    const { filterStatus, filterLocation, filterBody } = useUIStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const hasActiveFilters =
        filterStatus !== "All" || filterLocation !== "All" || filterBody !== "All";

    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-muted border border-white/10 px-4 py-2 rounded-full hover:border-gold/30 hover:text-gold transition-all"
            >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                Filters
                {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-gold" />
                )}
            </button>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-midnight border-t border-white/[0.06] rounded-t-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h3
                                className="text-sm tracking-[0.3em] uppercase text-gold"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Filters
                            </h3>
                            <button onClick={() => setMobileOpen(false)}>
                                <X className="w-5 h-5 text-muted" strokeWidth={1.5} />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
}

/* ─── Backward compat default export (kept for safety) ─── */
export default function FilterSidebar() {
    return (
        <>
            <DesktopFilterSidebar />
            <MobileFilterTrigger />
        </>
    );
}

/* ─── Shared sub-components ─── */
function FilterGroup({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-platinum/40 mb-3 ml-1">
                {label}
            </p>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function FilterChip({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3.5 py-2 text-[11px] tracking-[0.1em] uppercase border rounded-sm transition-all duration-300",
                active
                    ? "bg-gold border-gold text-black font-medium shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    : "bg-white/[0.02] border-white/[0.06] text-muted/80 hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-platinum"
            )}
        >
            {label}
        </button>
    );
}
