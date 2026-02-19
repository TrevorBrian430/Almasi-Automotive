/* ─── Auth Types ─── */

export type UserRole = "admin" | "owner";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface MockCredentials {
    email: string;
    password: string;
    user: User;
}
