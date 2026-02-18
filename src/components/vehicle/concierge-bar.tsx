"use client";

import { useUIStore } from "@/store/ui-store";
import { Calendar, MessageCircle } from "lucide-react";

interface ConciergeBarProps {
    carName: string;
}

export default function ConciergeBar({ carName }: ConciergeBarProps) {
    const { setBookingModalOpen } = useUIStore();
    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in the ${carName}. I'd like to learn more about this vehicle.`
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)]">
            <div className="flex">
                <button
                    onClick={() => setBookingModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase text-platinum hover:text-gold transition-colors border-r border-white/[0.06]"
                >
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    Book Viewing
                </button>
                <a
                    href={`https://wa.me/254700000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase text-green-400 hover:text-green-300 transition-colors"
                >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    WhatsApp
                </a>
            </div>
        </div>
    );
}
