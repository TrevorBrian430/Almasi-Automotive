"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: "left" | "center";
}

export default function SectionHeading({
    title,
    subtitle,
    className,
    align = "center",
}: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "mb-10 sm:mb-16",
                align === "center" && "text-center",
                className
            )}
        >
            <h2
                className="text-2xl sm:text-3xl md:text-5xl font-heading tracking-wide text-platinum"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="mt-3 sm:mt-4 text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
            <div
                className={cn(
                    "mt-6 h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent",
                    align === "center" && "mx-auto"
                )}
            />
        </motion.div>
    );
}
