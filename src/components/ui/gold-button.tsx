"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";



interface GoldButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    className?: string;
    href?: string;
    size?: "sm" | "md" | "lg";
}

export default function GoldButton({
    children,
    className,
    onClick,
    href,
    type = "button",
    size = "md",
    ...props
}: GoldButtonProps) {
    const sizeClasses = {
        sm: "px-5 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-base",
    };

    const classes = cn(
        "relative inline-flex items-center justify-center gap-2 font-medium tracking-[0.2em] uppercase",
        "border border-gold/40 text-gold rounded-none",
        "transition-all duration-500 ease-out",
        "hover:bg-gold/10 hover:border-gold/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]",
        "active:scale-[0.98]",
        sizeClasses[size],
        className
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={classes}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={classes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}
