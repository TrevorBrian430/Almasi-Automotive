"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
    status: "Available" | "Reserved" | "Sold" | "Importing";
    className?: string;
}

const statusStyles: Record<string, string> = {
    Available: "bg-gold/10 text-gold border-gold/30",
    Reserved: "bg-white/5 text-muted border-white/20",
    Sold: "bg-accent-red/20 text-red-400 border-accent-red/40",
    Importing: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const statusLabels: Record<string, string> = {
    Available: "Showroom Ready",
    Reserved: "Reserved",
    Sold: "Sold",
    Importing: "Import (25 Days)",
};

export default function StatusBadge({ status, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase border rounded-full",
                statusStyles[status],
                className
            )}
        >
            {statusLabels[status]}
        </span>
    );
}
