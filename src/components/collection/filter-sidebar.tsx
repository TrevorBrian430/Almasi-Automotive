"use client";

import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statusOptions = ["All", "Available", "Reserved", "Sold", "Importing"] as const;
const priceOptions = ["All", "Under 15M", "15M - 25M", "25M - 35M", "Above 35M"] as const;
const locationOptions = ["All", "Nairobi Showroom", "Mombasa Port", "Transit"] as const;
const bodyOptions = ["All", "SUV", "Crossover", "Sedan"] as const;

/* ─── Shared filter content ─── */
function FilterContent() {
    const {
        filterStatus,
        filterLocation,
        filterBody,
        priceRange,
        setFilterStatus,
        setFilterLocation,
        setFilterBody,
        setPriceRange,
        resetFilters,
    } = useUIStore();

    const hasActiveFilters =
        filterStatus !== "All" ||
        filterLocation !== "All" ||
        filterBody !== "All" ||
        priceRange !== "All";

    return (
        <div className="space-y-10 pb-8">
            <FilterGroup label="Price Range">
                {priceOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={opt}
                        active={priceRange === opt}
                        onClick={() => setPriceRange(opt)}
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Status">
                {statusOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={
                            opt === "Available"
                                ? "Showroom Ready"
                                : opt === "Importing"
                                    ? "Import (25 Days)"
                                    : opt
                        }
                        active={filterStatus === opt}
                        onClick={() => setFilterStatus(opt as typeof filterStatus)}
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Location">
                {locationOptions.map((opt) => (
                    <FilterChip
                        key={opt}
                        label={
                            opt === "All"
                                ? "All"
                                : opt === "Nairobi Showroom"
                                    ? "Westlands"
                                    : opt
                        }
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
                    className="text-[10px] tracking-[0.2em] uppercase text-gold/70 hover:text-gold transition-colors border-b border-gold/30 pb-0.5"
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
    const { filterStatus, filterLocation, filterBody, priceRange } = useUIStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const hasActiveFilters =
        filterStatus !== "All" ||
        filterLocation !== "All" ||
        filterBody !== "All" ||
        priceRange !== "All";

    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                    "lg:hidden flex items-center gap-2.5 text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-300",
                    hasActiveFilters
                        ? "bg-gold text-black font-medium shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        : "bg-white/[0.05] border border-white/10 text-platinum hover:bg-white/10"
                )}
            >
                <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                Filters
                {hasActiveFilters && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-black/10 text-[9px] font-bold">
                        {[
                            filterStatus !== "All",
                            filterLocation !== "All",
                            filterBody !== "All",
                            priceRange !== "All",
                        ].filter(Boolean).length}
                    </span>
                )}
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/[0.08] rounded-t-[2rem] p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl shadow-black"
                        >
                            <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0A0A0A] z-10 pb-4 border-b border-white/[0.04]">
                                <h3
                                    className="text-xs tracking-[0.3em] uppercase text-gold/70"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Refine Collection
                                </h3>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 -mr-2 text-muted hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" strokeWidth={1.5} />
                                </button>
                            </div>
                            <FilterContent />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
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
