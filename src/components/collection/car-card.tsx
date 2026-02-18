"use client";

import { AlmasiCar } from "@/types/car";
import { cn, formatPrice } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Gauge } from "lucide-react";

interface CarCardProps {
    car: AlmasiCar;
    index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
    const { currency } = useUIStore();
    const price = currency === "KES" ? car.price.kes : car.price.usd;

    const statusColors: Record<string, string> = {
        Available: "border-gold/50 text-gold bg-gold/10",
        Reserved: "border-amber-500/50 text-amber-400 bg-amber-500/10",
        Sold: "border-red-500/50 text-red-400 bg-red-500/10",
        Importing: "border-blue-400/50 text-blue-300 bg-blue-400/10",
    };

    const statusLabels: Record<string, string> = {
        Available: "Showroom Ready",
        Reserved: "Reserved",
        Sold: "Sold",
        Importing: "In Transit",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="break-inside-avoid mb-6"
        >
            <Link href={`/collection/${car.slug}`}>
                <div className="group relative bg-card border border-white/[0.06] rounded-sm overflow-hidden card-shine transition-all duration-500 hover:border-gold/20">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={car.images.hero}
                            alt={car.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                        {/* Status badge */}
                        <div className="absolute top-4 left-4 z-10">
                            <span
                                className={cn(
                                    "inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase border rounded-full backdrop-blur-sm",
                                    statusColors[car.status]
                                )}
                            >
                                {statusLabels[car.status]}
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                        <div>
                            <p className="text-[10px] sm:text-xs text-gold/50 tracking-[0.2em] uppercase mb-1.5">
                                {car.year} · {car.make}
                            </p>
                            <h3
                                className="text-base sm:text-lg text-platinum tracking-wide transition-colors duration-300 group-hover:text-gold"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {car.model}
                            </h3>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" strokeWidth={1.5} />
                                {car.location === "Nairobi Showroom" ? "Westlands" : car.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Gauge className="w-3 h-3" strokeWidth={1.5} />
                                {car.specs.mileage_km.toLocaleString()} km
                            </span>
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                            <p className="text-sm sm:text-base text-gold font-medium tracking-wide">
                                {formatPrice(price, currency)}
                            </p>
                            {car.price.is_negotiable && (
                                <span className="text-[9px] tracking-wider uppercase text-muted/60">
                                    Negotiable
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
