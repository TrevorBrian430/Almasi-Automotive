import { Diamond, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.06] bg-card">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 py-12 sm:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Diamond className="w-5 h-5 text-gold" strokeWidth={1.5} />
                            <span
                                className="text-lg tracking-[0.3em] uppercase text-platinum"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Almasi
                            </span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            Kenya&apos;s most exclusive automotive experience. We curate the
                            world&apos;s finest vehicles for discerning individuals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.3em] uppercase text-gold mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Navigation
                        </h4>
                        <div className="space-y-3">
                            {["Home", "Collection", "Compare", "About"].map((item) => (
                                <Link
                                    key={item}
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="block text-sm text-muted hover:text-platinum transition-colors duration-300"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.3em] uppercase text-gold mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Visit Us
                        </h4>
                        <div className="space-y-4 text-sm text-muted">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-gold/60" strokeWidth={1.5} />
                                <span>Westlands, Nairobi, Kenya</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gold/60" strokeWidth={1.5} />
                                <span>+254 742 577 640</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gold/60" strokeWidth={1.5} />
                                <span>concierge@almasi.co.ke</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted tracking-wider">
                        &copy; {new Date().getFullYear()} Almasi Automotive. All rights reserved.
                    </p>
                    <p className="text-xs text-white/20 tracking-wider">
                        Designed by Brian Njenga
                    </p>
                </div>
            </div>
        </footer>
    );
}
