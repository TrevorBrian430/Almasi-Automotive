"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const DEFAULT_MESSAGE = "Hi Almasi Automotive! I'm interested in your luxury vehicles. Could you help me?";

export default function WhatsAppFloat({ phone }: { phone?: string }) {
    const phoneNumber = phone?.replace(/[^0-9]/g, "") || "254742577640";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#25D366]/50">
                <MessageCircle className="w-6 h-6 text-white" fill="white" strokeWidth={0} />
                {/* Ping animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            </div>
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Chat with us
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white rotate-45" />
            </div>
        </motion.a>
    );
}
