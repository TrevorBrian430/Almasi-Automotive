"use client";

import { AlmasiCar } from "@/types/car";
import CarCard from "./car-card";

interface MasonryGridProps {
    cars: AlmasiCar[];
}

export default function MasonryGrid({ cars }: MasonryGridProps) {
    if (cars.length === 0) {
        return (
            <div className="text-center py-20">
                <p
                    className="text-2xl text-muted tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    No vehicles match your criteria
                </p>
                <p className="text-sm text-muted/60 mt-3">
                    Try adjusting your filters to explore more of our collection.
                </p>
            </div>
        );
    }

    return (
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
            {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
            ))}
        </div>
    );
}
