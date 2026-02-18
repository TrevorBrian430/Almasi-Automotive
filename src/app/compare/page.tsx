"use client";

import { cars } from "@/data/cars";
import { AlmasiCar } from "@/types/car";
import { formatPrice } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, Plus, ArrowRight, ChevronDown } from "lucide-react";

const MAX_COMPARE = 3;

const specRows: { label: string; key: string; format?: (v: AlmasiCar) => string }[] = [
    { label: "Engine", key: "engine", format: (c) => c.specs.engine },
    { label: "Transmission", key: "trans", format: (c) => c.specs.transmission },
    { label: "Drivetrain", key: "drive", format: (c) => c.specs.drive_train },
    { label: "Mileage", key: "mileage", format: (c) => `${c.specs.mileage_km.toLocaleString()} km` },
    { label: "Exterior", key: "ext", format: (c) => c.specs.color_ext },
    { label: "Interior", key: "int", format: (c) => c.specs.color_int },
    { label: "Body Type", key: "body", format: (c) => c.body },
    { label: "Status", key: "status", format: (c) => c.status },
    { label: "Location", key: "loc", format: (c) => c.location },
];

export default function ComparePage() {
    const { currency } = useUIStore();
    const [selected, setSelected] = useState<AlmasiCar[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const addCar = (car: AlmasiCar, slotIndex: number) => {
        setSelected((prev) => {
            const next = [...prev];
            if (slotIndex < next.length) {
                next[slotIndex] = car;
            } else {
                next.push(car);
            }
            return next;
        });
        setDropdownOpen(null);
    };

    const removeCar = (index: number) => {
        setSelected((prev) => prev.filter((_, i) => i !== index));
    };

    const availableCars = (slotIndex: number) =>
        cars.filter((c) => !selected.some((s, i) => s.id === c.id && i !== slotIndex));

    return (
        <div className="pt-24 sm:pt-28 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold/70 mb-3">
                        Side by Side
                    </p>
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl text-platinum tracking-wide mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Compare <span className="text-gradient-gold">Vehicles</span>
                    </h1>
                    <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
                        Select up to {MAX_COMPARE} vehicles to compare specifications, pricing, and features.
                    </p>
                </motion.div>

                {/* ─── Car Selector Slots ─── */}
                <div className={`grid gap-4 sm:gap-6 mb-12 ${selected.length < 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(selected.length + (selected.length < MAX_COMPARE ? 1 : 0), 3)}`}`}>
                    {/* Filled slots */}
                    {selected.map((car, i) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-card border border-white/[0.06] rounded-sm overflow-hidden group card-shine"
                        >
                            <button
                                onClick={() => removeCar(i)}
                                className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-midnight/80 border border-white/10 flex items-center justify-center text-muted hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={car.images.hero}
                                    alt={car.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                            </div>
                            <div className="p-4 sm:p-5">
                                <p className="text-[10px] text-gold/50 tracking-[0.2em] uppercase mb-1">
                                    {car.year} · {car.make}
                                </p>
                                <h3
                                    className="text-sm sm:text-base text-platinum tracking-wide"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {car.model}
                                </h3>
                                <p className="text-sm text-gold mt-2 font-medium">
                                    {formatPrice(
                                        currency === "KES" ? car.price.kes : car.price.usd,
                                        currency
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty slot(s) */}
                    {selected.length < MAX_COMPARE && (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(dropdownOpen === selected.length ? null : selected.length)}
                                className="w-full aspect-[4/3] bg-card/40 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-3 hover:border-gold/30 hover:bg-card/60 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-gold/30 flex items-center justify-center transition-all duration-300">
                                    <Plus className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
                                </div>
                                <span className="text-xs text-muted group-hover:text-platinum tracking-wider uppercase transition-colors">
                                    Add Vehicle
                                </span>
                                <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-300 ${dropdownOpen === selected.length ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {dropdownOpen === selected.length && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="absolute top-full left-0 right-0 z-30 mt-2 bg-card border border-white/[0.06] rounded-sm shadow-2xl shadow-black/50 max-h-[300px] overflow-y-auto no-scrollbar"
                                    >
                                        {availableCars(selected.length).map((car) => (
                                            <button
                                                key={car.id}
                                                onClick={() => addCar(car, selected.length)}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] transition-colors duration-200 border-b border-white/[0.04] last:border-0"
                                            >
                                                <div className="relative w-14 h-10 rounded-sm overflow-hidden shrink-0">
                                                    <Image
                                                        src={car.images.hero}
                                                        alt={car.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="56px"
                                                    />
                                                </div>
                                                <div className="text-left min-w-0">
                                                    <p className="text-xs text-platinum truncate">
                                                        {car.year} {car.make} {car.model}
                                                    </p>
                                                    <p className="text-[10px] text-gold/60">
                                                        {formatPrice(
                                                            currency === "KES" ? car.price.kes : car.price.usd,
                                                            currency
                                                        )}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* ─── Comparison Table ─── */}
                {selected.length >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Section heading */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-gold/30" />
                            <h2
                                className="text-sm tracking-[0.2em] uppercase text-gold"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Specifications
                            </h2>
                            <div className="flex-1 h-[1px] bg-gold/10" />
                        </div>

                        {/* Table */}
                        <div className="bg-card/40 border border-white/[0.06] rounded-sm overflow-x-auto">
                            <table className="w-full min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-white/[0.06]">
                                        <th className="text-left p-4 text-xs tracking-wider uppercase text-muted w-[140px]">
                                            Spec
                                        </th>
                                        {selected.map((car) => (
                                            <th
                                                key={car.id}
                                                className="text-left p-4 text-xs tracking-wider uppercase text-gold"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {car.make} {car.model}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Price row */}
                                    <tr className="border-b border-white/[0.04] bg-gold/[0.02]">
                                        <td className="p-4 text-xs text-muted font-medium">Price</td>
                                        {selected.map((car) => (
                                            <td key={car.id} className="p-4 text-sm text-gold font-medium">
                                                {formatPrice(
                                                    currency === "KES" ? car.price.kes : car.price.usd,
                                                    currency
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {specRows.map((row) => (
                                        <tr key={row.key} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                                            <td className="p-4 text-xs text-muted">{row.label}</td>
                                            {selected.map((car) => (
                                                <td key={car.id} className="p-4 text-sm text-platinum/80">
                                                    {row.format?.(car) ?? "—"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {/* Features row */}
                                    <tr className="border-b border-white/[0.04]">
                                        <td className="p-4 text-xs text-muted align-top">Features</td>
                                        {selected.map((car) => (
                                            <td key={car.id} className="p-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {car.features.map((f) => (
                                                        <span
                                                            key={f}
                                                            className="text-[10px] px-2 py-0.5 border border-white/[0.06] rounded-full text-muted"
                                                        >
                                                            {f}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* View Detail Links */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {selected.map((car) => (
                                <Link
                                    key={car.id}
                                    href={`/collection/${car.slug}`}
                                    className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted hover:text-gold transition-colors duration-300 border border-white/[0.06] rounded-full px-4 py-2 hover:border-gold/20"
                                >
                                    View {car.make} {car.model}
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Empty state */}
                {selected.length < 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center py-16"
                    >
                        <p className="text-muted text-sm">
                            Select at least <span className="text-gold">2 vehicles</span> above to see the comparison table.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
