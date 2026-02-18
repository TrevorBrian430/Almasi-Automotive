"use client";

import { useUIStore } from "@/store/ui-store";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";

interface BookingModalProps {
    carName: string;
}

export default function BookingModal({ carName }: BookingModalProps) {
    const { bookingModalOpen, setBookingModalOpen } = useUIStore();

    return (
        <AnimatePresence>
            {bookingModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setBookingModalOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-midnight border border-white/[0.06] rounded-t-2xl sm:rounded-sm p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setBookingModalOpen(false)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-muted hover:text-platinum transition-colors"
                        >
                            <X className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        {/* Header */}
                        <h3
                            className="text-xl tracking-wide text-platinum mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Book a Viewing
                        </h3>
                        <p className="text-sm text-muted mb-8">{carName}</p>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setBookingModalOpen(false);
                            }}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-xs text-muted tracking-wider uppercase mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Kamau"
                                    className="w-full bg-card border border-white/[0.06] rounded-sm px-4 py-3 text-sm text-platinum placeholder:text-muted/40 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted tracking-wider uppercase mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+254 7XX XXX XXX"
                                    className="w-full bg-card border border-white/[0.06] rounded-sm px-4 py-3 text-sm text-platinum placeholder:text-muted/40 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted tracking-wider uppercase mb-2">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-card border border-white/[0.06] rounded-sm px-4 py-3 text-sm text-platinum focus:outline-none focus:border-gold/30 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted tracking-wider uppercase mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Any special requirements..."
                                    className="w-full bg-card border border-white/[0.06] rounded-sm px-4 py-3 text-sm text-platinum placeholder:text-muted/40 focus:outline-none focus:border-gold/30 transition-colors resize-none"
                                />
                            </div>
                            <GoldButton type="submit" className="w-full" size="md">
                                Confirm Booking
                            </GoldButton>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
