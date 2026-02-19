"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { garageVehicles } from "@/data/service";
import { Car, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function MyGarage() {
    return (
        <div className="min-w-0">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <Car className="w-5 h-5 text-gold shrink-0" strokeWidth={1.2} />
                <h2
                    className="text-base sm:text-lg md:text-xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    My Garage
                </h2>
            </div>

            {/* Responsive: stack vertically on very small screens, horizontal scroll on sm+ */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:overflow-x-auto sm:pb-4 sm:no-scrollbar">
                {garageVehicles.map((vehicle, i) => (
                    <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: i * 0.1,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full sm:w-64 md:w-72 sm:flex-shrink-0 bg-card/60 border border-white/[0.06] rounded-sm overflow-hidden hover:border-gold/20 transition-all duration-500 card-shine group"
                    >
                        {/* Vehicle image */}
                        <div className="relative w-full h-32 sm:h-36 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
                            <Image
                                src={`/cars/${vehicle.imageSlug}/hero.jpg`}
                                alt={vehicle.makeModel}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 640px) 100vw, 288px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                        </div>

                        <div className="p-4 sm:p-5 pt-2 sm:pt-3">
                            <h3
                                className="text-sm text-platinum tracking-wider mb-1 group-hover:text-gold transition-colors duration-300 truncate"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {vehicle.makeModel}
                            </h3>

                            <div className="flex items-center justify-between mt-2 sm:mt-3 gap-2">
                                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-gold/70 bg-gold/[0.05] border border-gold/10 px-2 sm:px-2.5 py-1 rounded-sm truncate">
                                    {vehicle.registration}
                                </span>
                                <div className="flex items-center gap-1.5 text-muted shrink-0">
                                    <Calendar className="w-3 h-3" strokeWidth={1.2} />
                                    <span className="text-[10px] tracking-wider">
                                        {format(new Date(vehicle.lastService), "MMM yyyy")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
