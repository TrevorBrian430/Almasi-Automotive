import { create } from "zustand";
import type { User, UserRole, MockCredentials } from "@/types/auth";

/* ─── Mock Accounts ─── */
const MOCK_USERS: MockCredentials[] = [
    {
        email: "admin@almasi.co.ke",
        password: "admin123",
        user: {
            id: "u-admin-1",
            name: "Brian Njenga",
            email: "admin@almasi.co.ke",
            role: "admin",
        },
    },
    {
        email: "owner@almasi.co.ke",
        password: "owner123",
        user: {
            id: "u-owner-1",
            name: "James Kamau",
            email: "owner@almasi.co.ke",
            role: "owner",
        },
    },
];

const STORAGE_KEY = "almasi-auth";

/* ─── Store Interface ─── */
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    login: (email: string, password: string) => { success: boolean; error?: string; role?: UserRole };
    logout: () => void;
    hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: (email, password) => {
        const match = MOCK_USERS.find(
            (m) => m.email.toLowerCase() === email.toLowerCase() && m.password === password
        );

        if (!match) {
            return { success: false, error: "Invalid email or password" };
        }

        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
        }

        set({ user: match.user, isAuthenticated: true });
        return { success: true, role: match.user.role };
    },

    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
        set({ user: null, isAuthenticated: false });
    },

    hydrate: () => {
        if (typeof window === "undefined") {
            set({ isLoading: false });
            return;
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const user = JSON.parse(stored) as User;
                set({ user, isAuthenticated: true, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            set({ isLoading: false });
        }
    },
}));
