"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth-store";
import { Diamond, Eye, EyeOff, ArrowRight, Shield, Car } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, user, hydrate } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        if (isAuthenticated && user) {
            router.replace(user.role === "admin" ? "/admin" : "/dashboard");
        }
    }, [isAuthenticated, user, router]);

    async function onSubmit(data: LoginFormValues) {
        setError("");
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 600));
        const result = login(data.email, data.password);
        if (!result.success) {
            setError(result.error || "Login failed");
        }
    }

    function quickLogin(email: string, password: string) {
        setValue("email", email);
        setValue("password", password);
        setTimeout(() => {
            const result = login(email, password);
            if (!result.success) setError(result.error || "Login failed");
        }, 300);
    }

    const inputClass =
        "w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-platinum placeholder:text-muted/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-300";

    return (
        <div className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden noise-overlay">
            {/* ─── Background ─── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#0a0a0a]" />
                <div
                    className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full animate-float-slow"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)",
                    }}
                />
                <div
                    className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full animate-float"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)",
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/[0.03]" />
            </div>

            {/* ─── Login Card ─── */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] rounded-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-8 pt-10 pb-6 text-center border-b border-white/[0.06]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/20 bg-gold/[0.05] mb-5"
                        >
                            <Diamond className="w-6 h-6 text-gold" strokeWidth={1.2} />
                        </motion.div>
                        <h1
                            className="text-xl sm:text-2xl text-platinum tracking-wider mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Welcome Back
                        </h1>
                        <p className="text-xs text-muted tracking-wider">
                            Sign in to your Almasi account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3 text-sm text-red-400"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="you@almasi.co.ke"
                                className={inputClass}
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="Enter your password"
                                    className={`${inputClass} pr-12`}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-platinum transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                                    ) : (
                                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="pt-1">
                            <GoldButton type="submit" size="lg" className="w-full justify-center">
                                {isSubmitting ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                                    </>
                                )}
                            </GoldButton>
                        </div>
                    </form>

                    {/* Quick Access */}
                    <div className="px-8 pb-8 space-y-3">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted/50 text-center mb-3">
                            Quick Demo Access
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => quickLogin("admin@almasi.co.ke", "admin123")}
                                className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-sm px-4 py-3 text-xs tracking-wider text-muted hover:text-gold hover:border-gold/20 transition-all duration-300"
                            >
                                <Shield className="w-3.5 h-3.5" strokeWidth={1.2} />
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => quickLogin("owner@almasi.co.ke", "owner123")}
                                className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-sm px-4 py-3 text-xs tracking-wider text-muted hover:text-gold hover:border-gold/20 transition-all duration-300"
                            >
                                <Car className="w-3.5 h-3.5" strokeWidth={1.2} />
                                Owner
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-[10px] text-muted/30 tracking-wider mt-6">
                    Almasi Automotive © 2026 — All rights reserved
                </p>
            </motion.div>
        </div>
    );
}
