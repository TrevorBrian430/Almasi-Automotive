"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceBookingSchema, type ServiceBookingFormValues } from "@/lib/validations/service";
import { useServiceStore } from "@/store/service-store";
import { X, CheckCircle, Truck, User, Phone, Mail } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

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
            ownerName: "",
            ownerPhone: "",
            ownerEmail: "",
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
            ownerName: data.ownerName,
            ownerPhone: data.ownerPhone,
            ownerEmail: data.ownerEmail,
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === overlayRef.current) handleClose();
                    }}
                >
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg md:max-w-2xl bg-[#0A0A0A] border border-white/[0.08] rounded-sm overflow-hidden my-auto shadow-2xl shadow-black/50 flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="shrink-0 bg-[#0A0A0A] px-6 pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between z-10">
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
                            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/[0.05] mb-6 mx-auto">
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
                            </div>
                        ) : (
                            /* ── Form ── */
                            <>
                                <div
                                    className="overflow-y-auto p-6 space-y-5 flex-1"
                                    data-lenis-prevent
                                >
                                    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                        {/* Owner Details */}
                                        <div className="space-y-4 bg-white/[0.02] border border-white/[0.04] rounded-sm p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.2} />
                                                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/50">Contact Details</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        {...register("ownerName")}
                                                        placeholder="John Kamau"
                                                        className={inputClass}
                                                    />
                                                    {errors.ownerName && <p className="mt-1 text-xs text-red-400">{errors.ownerName.message}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                        Phone *
                                                    </label>
                                                    <input
                                                        {...register("ownerPhone")}
                                                        placeholder="0742 577 640"
                                                        className={inputClass}
                                                    />
                                                    {errors.ownerPhone && <p className="mt-1 text-xs text-red-400">{errors.ownerPhone.message}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                    Email <span className="text-muted/50">(Optional)</span>
                                                </label>
                                                <input
                                                    {...register("ownerEmail")}
                                                    placeholder="john@example.com"
                                                    className={inputClass}
                                                />
                                                {errors.ownerEmail && <p className="mt-1 text-xs text-red-400">{errors.ownerEmail.message}</p>}
                                            </div>
                                        </div>

                                        {/* Vehicle */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                    Vehicle Make & Model *
                                                </label>
                                                <input
                                                    {...register("vehicleMakeModel")}
                                                    placeholder="e.g., 2024 Range Rover"
                                                    className={inputClass}
                                                />
                                                {errors.vehicleMakeModel && <p className="mt-1 text-xs text-red-400">{errors.vehicleMakeModel.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                    Registration Number *
                                                </label>
                                                <input
                                                    {...register("registrationNumber")}
                                                    placeholder="KDK 123A"
                                                    className={`${inputClass} uppercase`}
                                                />
                                                {errors.registrationNumber && <p className="mt-1 text-xs text-red-400">{errors.registrationNumber.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                    Service Type *
                                                </label>
                                                <select
                                                    {...register("serviceCategory")}
                                                    className={`${inputClass} appearance-none cursor-pointer`}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled className="bg-[#0A0A0A]">Select service</option>
                                                    {serviceCategories.map((cat) => (
                                                        <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                                                    ))}
                                                </select>
                                                {errors.serviceCategory && <p className="mt-1 text-xs text-red-400">{errors.serviceCategory.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                    Date *
                                                </label>
                                                <input
                                                    type="date"
                                                    {...register("preferredDate")}
                                                    className={inputClass}
                                                />
                                                {errors.preferredDate && <p className="mt-1 text-xs text-red-400">{errors.preferredDate.message}</p>}
                                            </div>
                                        </div>

                                        {/* Concierge */}
                                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-sm px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <Truck className="w-4 h-4 text-gold shrink-0" strokeWidth={1.2} />
                                                <div>
                                                    <p className="text-sm text-platinum">Concierge Pick-up</p>
                                                    <p className="text-[11px] text-muted">Nairobi area only</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                <input
                                                    type="checkbox"
                                                    {...register("requiresConcierge")}
                                                    className="sr-only peer"
                                                />
                                                <div className={`w-11 h-6 rounded-full transition-all duration-300 ${conciergeValue ? "bg-gold/30 border-gold/40" : "bg-white/[0.06] border-white/[0.08]"} border`}>
                                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ${conciergeValue ? "translate-x-5 bg-gold" : "translate-x-0 bg-muted"}`} />
                                                </div>
                                            </label>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                                Additional Details <span className="text-muted/50">(Optional)</span>
                                            </label>
                                            <textarea
                                                {...register("description")}
                                                rows={2}
                                                placeholder="Describe any specific issues..."
                                                className={`${inputClass} resize-none`}
                                            />
                                            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
                                        </div>
                                    </form>
                                </div>

                                {/* Footer */}
                                <div className="shrink-0 p-6 pt-4 border-t border-white/[0.06] bg-[#0A0A0A]">
                                    <GoldButton
                                        type="submit"
                                        form="booking-form"
                                        size="lg"
                                        className="w-full justify-center whitespace-nowrap"
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
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
