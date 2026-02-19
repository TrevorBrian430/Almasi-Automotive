"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types/auth";
import { Diamond } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const { user, isAuthenticated, isLoading, hydrate } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }

        if (user && !allowedRoles.includes(user.role)) {
            // Redirect to their correct dashboard
            if (user.role === "admin") {
                router.replace("/admin");
            } else {
                router.replace("/dashboard");
            }
        }
    }, [isLoading, isAuthenticated, user, allowedRoles, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-midnight flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Diamond
                        className="w-8 h-8 text-gold animate-pulse"
                        strokeWidth={1.2}
                    />
                    <p className="text-xs tracking-[0.3em] uppercase text-muted animate-pulse">
                        Authenticating...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
