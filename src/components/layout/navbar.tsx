"use client";

import Link from "next/link";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Diamond, LogIn, LayoutDashboard, Shield } from "lucide-react";
import { useEffect } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Collection" },
    { href: "/compare", label: "Compare" },
    { href: "/service", label: "Service" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const { mobileMenuOpen, setMobileMenuOpen, currency, toggleCurrency } =
        useUIStore();
    const { user, isAuthenticated, hydrate } = useAuthStore();

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    const dashboardHref = user?.role === "admin" ? "/admin" : "/dashboard";

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.06]"
            >
                <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Diamond
                            className="w-6 h-6 text-gold transition-transform duration-700 group-hover:rotate-180"
                            strokeWidth={1.5}
                        />
                        <span
                            className="text-base sm:text-xl tracking-[0.2em] sm:tracking-[0.3em] uppercase text-platinum"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Almasi
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm tracking-[0.15em] uppercase text-muted hover:text-gold transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Currency Toggle */}
                        <button
                            onClick={toggleCurrency}
                            className="hidden md:flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-muted hover:text-gold transition-colors duration-300 border border-white/10 px-3 py-1.5 rounded-full"
                        >
                            <span className={currency === "KES" ? "text-gold" : ""}>KES</span>
                            <span className="text-white/20">/</span>
                            <span className={currency === "USD" ? "text-gold" : ""}>USD</span>
                        </button>

                        {/* Auth Button (Desktop) */}
                        {isAuthenticated ? (
                            <Link
                                href={dashboardHref}
                                className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase bg-gold/[0.08] border border-gold/20 text-gold px-4 py-2 rounded-sm hover:bg-gold/15 transition-all duration-300"
                            >
                                {user?.role === "admin" ? (
                                    <Shield className="w-3.5 h-3.5" strokeWidth={1.2} />
                                ) : (
                                    <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.2} />
                                )}
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted hover:text-gold border border-white/10 px-4 py-2 rounded-sm hover:border-gold/20 transition-all duration-300"
                            >
                                <LogIn className="w-3.5 h-3.5" strokeWidth={1.2} />
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-platinum p-2"
                        >
                            {mobileMenuOpen ? (
                                <X strokeWidth={1.5} className="w-6 h-6" />
                            ) : (
                                <Menu strokeWidth={1.5} className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 glass"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-midnight border-l border-white/[0.06] flex flex-col pt-24 sm:pt-28 px-8 sm:px-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-4 text-2xl tracking-[0.2em] uppercase text-platinum hover:text-gold transition-colors duration-300 border-b border-white/[0.06]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Auth Link (Mobile) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + navLinks.length * 0.1, duration: 0.5 }}
                            >
                                {isAuthenticated ? (
                                    <Link
                                        href={dashboardHref}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 py-4 text-2xl tracking-[0.2em] uppercase text-gold border-b border-white/[0.06]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {user?.role === "admin" ? (
                                            <Shield className="w-5 h-5" strokeWidth={1.2} />
                                        ) : (
                                            <LayoutDashboard className="w-5 h-5" strokeWidth={1.2} />
                                        )}
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 py-4 text-2xl tracking-[0.2em] uppercase text-gold border-b border-white/[0.06]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        <LogIn className="w-5 h-5" strokeWidth={1.2} />
                                        Sign In
                                    </Link>
                                )}
                            </motion.div>

                            {/* Currency Toggle Mobile */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                onClick={toggleCurrency}
                                className="mt-10 flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted"
                            >
                                <span className={currency === "KES" ? "text-gold" : ""}>KES</span>
                                <span className="text-white/20">|</span>
                                <span className={currency === "USD" ? "text-gold" : ""}>USD</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
