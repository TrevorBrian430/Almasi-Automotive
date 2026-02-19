"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceBookingSchema, type ServiceBookingFormValues } from "@/lib/validations/service";
import { useServiceStore } from "@/store/service-store";
import { X, CheckCircle, Truck } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import { useState } from "react";

const serviceCategories = [
    "Minor Service",
    "Major Service",
    "Diagnostics",
    "Detailing & Bodywork",
] as const;

export default function ServiceBookingModal() {
    const { bookingModalOpen, setBookingModalOpen, addBooking } = useServiceStore();
    const [submitted, setSubmitted] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ServiceBookingFormValues>({
        resolver: zodResolver(serviceBookingSchema),
        defaultValues: {
            vehicleMakeModel: "",
            registrationNumber: "",
            serviceCategory: undefined,
            preferredDate: "",
            requiresConcierge: false,
            description: "",
        },
    });

    const conciergeValue = watch("requiresConcierge");

    useEffect(() => {
        if (bookingModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [bookingModalOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        if (bookingModalOpen) {
            window.addEventListener("keydown", handleEscape);
        }
        return () => window.removeEventListener("keydown", handleEscape);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingModalOpen]);

    function handleClose() {
        setBookingModalOpen(false);
        setSubmitted(false);
        reset();
    }

    async function onSubmit(data: ServiceBookingFormValues) {
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));
        addBooking({
            vehicleMakeModel: data.vehicleMakeModel,
            registrationNumber: data.registrationNumber,
            serviceCategory: data.serviceCategory,
            preferredDate: data.preferredDate,
            requiresConcierge: data.requiresConcierge,
            description: data.description,
        });
        setSubmitted(true);
    }

    const inputClass =
        "w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3 text-sm text-platinum placeholder:text-muted/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-300";

    return (
        <AnimatePresence>
            {bookingModalOpen && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === overlayRef.current) handleClose();
                    }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/[0.08] rounded-sm overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
                    >
                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between">
                            <div>
                                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-1">
                                    Almasi Care
                                </p>
                                <h2
                                    className="text-lg text-platinum tracking-wider"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Book a Service
                                </h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-muted hover:text-platinum transition-colors p-1"
                            >
                                <X className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                        </div>

                        {submitted ? (
                            /* ── Success State ── */
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/[0.05] mb-6">
                                    <CheckCircle className="w-8 h-8 text-gold" strokeWidth={1.2} />
                                </div>
                                <h3
                                    className="text-xl text-platinum mb-3 tracking-wider"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Booking Confirmed
                                </h3>
                                <p className="text-sm text-muted mb-8 max-w-sm mx-auto leading-relaxed">
                                    Our service team will contact you within 2 hours to confirm
                                    your appointment and discuss any specific requirements.
                                </p>
                                <GoldButton onClick={handleClose}>Close</GoldButton>
                            </motion.div>
                        ) : (
                            /* ── Form ── */
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                                {/* Vehicle */}
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                        Vehicle Make & Model
                                    </label>
                                    <input
                                        {...register("vehicleMakeModel")}
                                        placeholder="e.g., 2024 Range Rover Autobiography"
                                        className={inputClass}
                                    />
                                    {errors.vehicleMakeModel && (
                                        <p className="mt-1.5 text-xs text-red-400">
                                            {errors.vehicleMakeModel.message}
                                        </p>
                                    )}
                                </div>

                                {/* Registration */}
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                        Registration Number
                                    </label>
                                    <input
                                        {...register("registrationNumber")}
                                        placeholder="e.g., KDK 123A"
                                        className={`${inputClass} uppercase`}
                                    />
                                    {errors.registrationNumber && (
                                        <p className="mt-1.5 text-xs text-red-400">
                                            {errors.registrationNumber.message}
                                        </p>
                                    )}
                                </div>

                                {/* Service Type */}
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                        Service Type
                                    </label>
                                    <select
                                        {...register("serviceCategory")}
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="bg-[#0A0A0A]">
                                            Select service type
                                        </option>
                                        {serviceCategories.map((cat) => (
                                            <option
                                                key={cat}
                                                value={cat}
                                                className="bg-[#0A0A0A]"
                                            >
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.serviceCategory && (
                                        <p className="mt-1.5 text-xs text-red-400">
                                            {errors.serviceCategory.message}
                                        </p>
                                    )}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register("preferredDate")}
                                        className={inputClass}
                                    />
                                    {errors.preferredDate && (
                                        <p className="mt-1.5 text-xs text-red-400">
                                            {errors.preferredDate.message}
                                        </p>
                                    )}
                                </div>

                                {/* Concierge Toggle */}
                                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-sm px-4 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-4 h-4 text-gold" strokeWidth={1.2} />
                                        <div>
                                            <p className="text-sm text-platinum">
                                                Concierge Pick-up
                                            </p>
                                            <p className="text-[11px] text-muted">
                                                Nairobi area only
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("requiresConcierge")}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className={`w-11 h-6 rounded-full transition-all duration-300 ${conciergeValue
                                                    ? "bg-gold/30 border-gold/40"
                                                    : "bg-white/[0.06] border-white/[0.08]"
                                                } border`}
                                        >
                                            <div
                                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ${conciergeValue
                                                        ? "translate-x-5 bg-gold"
                                                        : "translate-x-0 bg-muted"
                                                    }`}
                                            />
                                        </div>
                                    </label>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                        Additional Details{" "}
                                        <span className="text-muted/50">(Optional)</span>
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        rows={3}
                                        placeholder="Describe the issue or specific service request..."
                                        className={`${inputClass} resize-none`}
                                    />
                                    {errors.description && (
                                        <p className="mt-1.5 text-xs text-red-400">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="pt-2">
                                    <GoldButton
                                        type="submit"
                                        size="lg"
                                        className="w-full justify-center"
                                    >
                                        {isSubmitting ? (
                                            <span className="inline-flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                                                Booking...
                                            </span>
                                        ) : (
                                            "Confirm Booking"
                                        )}
                                    </GoldButton>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
