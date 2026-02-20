"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceBookingSchema, type ServiceBookingFormValues } from "@/lib/validations/service";
import { useServiceStore } from "@/store/service-store";
import { Wrench, Truck, CheckCircle, User, Phone, Mail } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import { useState } from "react";

const serviceCategories = [
    "Minor Service",
    "Major Service",
    "Diagnostics",
    "Detailing & Bodywork",
] as const;

export default function ServiceBookingForm() {
    const { addBooking } = useServiceStore();
    const [submitted, setSubmitted] = useState(false);

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

    async function onSubmit(data: ServiceBookingFormValues) {
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
        "w-full bg-white/[0.06] border border-white/[0.1] rounded-sm px-4 py-3 text-sm text-platinum placeholder:text-muted/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-300";

    if (submitted) {
        return (
            <motion.div
                id="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/60 border border-white/[0.06] rounded-sm p-6 sm:p-10 text-center max-w-2xl mx-auto"
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
                    Our service team will contact you within 2 hours to confirm your
                    appointment.
                </p>
                <GoldButton
                    onClick={() => {
                        setSubmitted(false);
                        reset();
                    }}
                >
                    Book Another Service
                </GoldButton>
            </motion.div>
        );
    }

    return (
        <div id="booking" className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-5 h-5 text-gold" strokeWidth={1.2} />
                <h2
                    className="text-lg sm:text-xl text-platinum tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Book a Service
                </h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card/60 border border-white/[0.06] rounded-sm p-4 sm:p-6 md:p-8 space-y-5 overflow-hidden"
            >
                {/* Owner Contact Section */}
                <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.2} />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/50">Owner Details</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                            <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                Full Name *
                            </label>
                            <input
                                {...register("ownerName")}
                                placeholder="e.g., John Kamau"
                                className={inputClass}
                            />
                            {errors.ownerName && (
                                <p className="mt-1.5 text-xs text-red-400">
                                    {errors.ownerName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/40" strokeWidth={1.5} />
                                <input
                                    {...register("ownerPhone")}
                                    placeholder="e.g., 0712345678"
                                    className={`${inputClass} pl-9`}
                                />
                            </div>
                            {errors.ownerPhone && (
                                <p className="mt-1.5 text-xs text-red-400">
                                    {errors.ownerPhone.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                            Email <span className="text-muted/50">(Optional)</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/40" strokeWidth={1.5} />
                            <input
                                {...register("ownerEmail")}
                                type="email"
                                placeholder="e.g., john@email.com"
                                className={`${inputClass} pl-9`}
                            />
                        </div>
                        {errors.ownerEmail && (
                            <p className="mt-1.5 text-xs text-red-400">
                                {errors.ownerEmail.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/[0.06]" />

                {/* Vehicle Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                            Vehicle Make & Model *
                        </label>
                        <input
                            {...register("vehicleMakeModel")}
                            placeholder="e.g., 2024 Range Rover"
                            className={inputClass}
                        />
                        {errors.vehicleMakeModel && (
                            <p className="mt-1.5 text-xs text-red-400">
                                {errors.vehicleMakeModel.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                            Registration Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                            Service Type *
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
                                <option key={cat} value={cat} className="bg-[#0A0A0A]">
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
                    <div>
                        <label className="block text-xs tracking-wider uppercase text-muted mb-2">
                            Preferred Date *
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
                </div>

                {/* Concierge Toggle */}
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-sm px-4 py-3.5">
                    <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-gold shrink-0" strokeWidth={1.2} />
                        <div>
                            <p className="text-sm text-platinum">Concierge Pick-up</p>
                            <p className="text-[11px] text-muted">Nairobi area only</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
                        <input
                            type="checkbox"
                            {...register("requiresConcierge")}
                            className="sr-only peer"
                        />
                        <div
                            className={`w-11 h-6 rounded-full transition-all duration-300 ${conciergeValue
                                ? "bg-gold/30 border-gold/40"
                                : "bg-white/[0.06] border-white/[0.08]"
                                } border relative`}
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
                        placeholder="Describe the issue or specific request..."
                        className={`${inputClass} resize-none`}
                    />
                    {errors.description && (
                        <p className="mt-1.5 text-xs text-red-400">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="pt-8">
                    <GoldButton type="submit" size="lg" className="w-full justify-center whitespace-nowrap">
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
        </div>
    );
}
