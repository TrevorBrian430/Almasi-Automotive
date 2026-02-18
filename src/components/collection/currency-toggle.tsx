"use client";

import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export default function CurrencyToggle({ className }: { className?: string }) {
    const { currency, toggleCurrency } = useUIStore();

    return (
        <button
            onClick={toggleCurrency}
            className={cn(
                "relative flex items-center w-[120px] h-10 border border-white/10 rounded-full overflow-hidden transition-colors duration-300 hover:border-gold/30",
                className
            )}
        >
            {/* Sliding indicator */}
            <div
                className={cn(
                    "absolute top-0.5 bottom-0.5 w-[58px] bg-gold/10 border border-gold/30 rounded-full transition-all duration-500 ease-out",
                    currency === "KES" ? "left-0.5" : "left-[calc(50%+1px)]"
                )}
            />
            <span
                className={cn(
                    "flex-1 text-center text-xs tracking-wider font-medium z-10 transition-colors duration-300",
                    currency === "KES" ? "text-gold" : "text-muted"
                )}
            >
                KES
            </span>
            <span
                className={cn(
                    "flex-1 text-center text-xs tracking-wider font-medium z-10 transition-colors duration-300",
                    currency === "USD" ? "text-gold" : "text-muted"
                )}
            >
                USD
            </span>
        </button>
    );
}
