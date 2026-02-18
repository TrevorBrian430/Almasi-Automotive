"use client";

import { AlmasiCar } from "@/types/car";
import { useState } from "react";
import Image from "next/image";

interface GalleryProps {
    car: AlmasiCar;
}

export default function Gallery({ car }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const allImages = [car.images.hero, ...car.images.gallery];

    return (
        <div className="space-y-4">
            {/* Main Image with Ken Burns */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-card border border-white/[0.06] rounded-sm">
                <Image
                    src={allImages[activeIndex]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    className="object-cover ken-burns"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={activeIndex === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent z-10" />
                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20">
                    <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-1">
                        {car.year} {car.make}
                    </p>
                    <h1
                        className="text-xl sm:text-2xl md:text-4xl text-platinum tracking-wide"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {car.model}
                    </h1>
                </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {allImages.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`shrink-0 w-16 sm:w-20 h-12 sm:h-14 rounded-sm border overflow-hidden bg-card transition-all duration-300 ${activeIndex === index
                                ? "border-gold/40"
                                : "border-white/[0.06] opacity-50 hover:opacity-80"
                                }`}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`${car.model} view ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
