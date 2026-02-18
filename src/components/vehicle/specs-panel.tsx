"use client";

import { AlmasiCar } from "@/types/car";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import StatusBadge from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import {
    Cog,
    Fuel,
    Gauge,
    Palette,
    CircleDot,
    MapPin,
    Check,
} from "lucide-react";

interface SpecsPanelProps {
    car: AlmasiCar;
}

export default function SpecsPanel({ car }: SpecsPanelProps) {
    const { currency } = useUIStore();

    const specs = [
        { icon: Fuel, label: "Engine", value: car.specs.engine },
        { icon: Cog, label: "Transmission", value: car.specs.transmission },
        { icon: Gauge, label: "Mileage", value: `${car.specs.mileage_km.toLocaleString()} km` },
        { icon: Palette, label: "Exterior", value: car.specs.color_ext },
        { icon: CircleDot, label: "Interior", value: car.specs.color_int },
        { icon: MapPin, label: "Drivetrain", value: car.specs.drive_train },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
        >
            {/* Price & Status */}
            <div className="bg-card border border-white/[0.06] rounded-sm p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <p className="text-xs text-muted tracking-wider uppercase mb-2">
                            Price
                        </p>
                        <p className="text-2xl sm:text-3xl text-gold font-medium tracking-wide">
                            {formatPrice(
                                currency === "KES" ? car.price.kes : car.price.usd,
                                currency
                            )}
                        </p>
                        {car.price.is_negotiable && (
                            <p className="text-xs text-muted mt-1 tracking-wider">
                                Negotiable
                            </p>
                        )}
                    </div>
                    <StatusBadge status={car.status} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{car.location}</span>
                </div>
            </div>

            {/* Specifications Grid */}
            <div className="bg-card border border-white/[0.06] rounded-sm p-5 sm:p-8">
                <h3
                    className="text-xs tracking-[0.3em] uppercase text-gold mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {specs.map((spec) => (
                        <div key={spec.label}>
                            <div className="flex items-center gap-2 mb-1.5">
                                <spec.icon
                                    className="w-3.5 h-3.5 text-gold/50"
                                    strokeWidth={1.5}
                                />
                                <span className="text-xs text-muted tracking-wider uppercase">
                                    {spec.label}
                                </span>
                            </div>
                            <p className="text-sm text-platinum">{spec.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-white/[0.06] rounded-sm p-5 sm:p-8">
                <h3
                    className="text-xs tracking-[0.3em] uppercase text-gold mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {car.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                            <Check className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.5} />
                            <span className="text-sm text-muted">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
