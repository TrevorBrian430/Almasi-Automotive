"use client";

import { useMemo } from "react";
import { cars } from "@/data/cars";
import { useUIStore } from "@/store/ui-store";
import SectionHeading from "@/components/ui/section-heading";
import MasonryGrid from "@/components/collection/masonry-grid";
import { DesktopFilterSidebar, MobileFilterTrigger } from "@/components/collection/filter-sidebar";
import CurrencyToggle from "@/components/collection/currency-toggle";

export default function CollectionPage() {
    const { filterStatus, filterLocation, filterBody } = useUIStore();

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            if (filterStatus !== "All" && car.status !== filterStatus) return false;
            if (filterLocation !== "All" && car.location !== filterLocation)
                return false;
            if (filterBody !== "All" && car.body !== filterBody) return false;
            return true;
        });
    }, [filterStatus, filterLocation, filterBody]);

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                {/* Page Header */}
                <SectionHeading
                    title="The Collection"
                    subtitle="Every vehicle in our portfolio has been meticulously inspected and authenticated to meet the Almasi standard."
                />

                {/* Controls Row */}
                <div className="flex items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile-only filter trigger */}
                        <MobileFilterTrigger />
                        <p className="text-xs text-muted tracking-wider">
                            {filteredCars.length} vehicle{filteredCars.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <CurrencyToggle />
                </div>

                {/* Content: Desktop sidebar + Masonry Grid */}
                <div className="flex gap-10">
                    {/* Desktop sidebar — hidden on mobile, only renders <aside> */}
                    <DesktopFilterSidebar />
                    <div className="flex-1 min-w-0">
                        <MasonryGrid cars={filteredCars} />
                    </div>
                </div>
            </div>
        </div>
    );
}
