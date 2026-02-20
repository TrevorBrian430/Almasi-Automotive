"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalLayoutProps {
    children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();

    // Do not render the children (Footer/WhatsApp) if on a dashboard or admin page
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
        return null;
    }

    return <>{children}</>;
}
