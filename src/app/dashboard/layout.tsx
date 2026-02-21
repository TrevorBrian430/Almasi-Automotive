"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Diamond, Car, Wrench, History, LayoutDashboard,
    Menu, X, LogOut, User, Activity, Globe, Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import { useAuthStore } from "@/store/auth-store";

const sidebarLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/service", label: "My Garage", icon: Car },
    { href: "/dashboard/live", label: "Live Service", icon: Activity },
    { href: "/dashboard/service/book", label: "Book Service", icon: Wrench },
    { href: "/dashboard/service/history", label: "Service History", icon: History },
    { href: "/dashboard/sourcing", label: "Sourcing", icon: Globe },
    { href: "/dashboard/club", label: "Almasi Club", icon: Crown },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard allowedRoles={["owner"]}>
            <DashboardShell>{children}</DashboardShell>
        </AuthGuard>
    );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <div className="min-h-screen bg-midnight">
            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#070707]/95 backdrop-blur-sm border-b border-white/[0.06] flex items-center px-4 gap-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-9 h-9 flex items-center justify-center bg-card border border-white/[0.08] rounded-sm text-muted hover:text-gold transition-colors"
                >
                    {sidebarOpen ? (
                        <X className="w-4 h-4" strokeWidth={1.5} />
                    ) : (
                        <Menu className="w-4 h-4" strokeWidth={1.5} />
                    )}
                </button>
                <span
                    className="text-xs tracking-[0.2em] uppercase text-platinum/70"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    My Dashboard
                </span>
            </div>

            <div className="flex w-full min-w-0">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100dvh-4rem)] lg:h-screen w-64 bg-[#070707] border-r border-white/[0.06] flex flex-col z-30 transition-transform duration-300 lg:translate-x-0",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    {/* Sidebar header */}
                    <div className="px-6 py-8 border-b border-white/[0.06]">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Diamond
                                className="w-5 h-5 text-gold transition-transform duration-700 group-hover:rotate-180"
                                strokeWidth={1.5}
                            />
                            <span
                                className="text-sm tracking-[0.25em] uppercase text-platinum"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                My Dashboard
                            </span>
                        </Link>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" data-lenis-prevent="true">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-sm text-sm tracking-wider transition-all duration-300",
                                        isActive
                                            ? "bg-gold/[0.08] text-gold border border-gold/20"
                                            : "text-muted hover:text-platinum hover:bg-white/[0.03] border border-transparent"
                                    )}
                                >
                                    <link.icon className="w-4 h-4" strokeWidth={1.2} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User + Logout — always visible at bottom */}
                    <div className="px-4 py-4 border-t border-white/[0.06] space-y-3 shrink-0">
                        {user && (
                            <div className="flex items-center gap-3 px-4 py-2">
                                <div className="w-8 h-8 rounded-full bg-gold/[0.08] border border-gold/15 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-gold" strokeWidth={1.2} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-platinum truncate">{user.name}</p>
                                    <p className="text-[9px] text-muted truncate">{user.email}</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-sm text-xs tracking-wider text-muted/50 hover:text-red-400 transition-colors duration-300"
                        >
                            <LogOut className="w-4 h-4" strokeWidth={1.2} />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0 w-full overflow-x-hidden min-h-screen lg:ml-0">
                    <div className="px-4 sm:px-8 lg:px-12 py-8 lg:py-12 mt-12 lg:mt-0">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
