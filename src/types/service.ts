/* ─── Service Types ─── */

export type ServiceCategory =
    | "Minor Service"
    | "Major Service"
    | "Diagnostics"
    | "Detailing & Bodywork";

export type WorkshopStatus =
    | "Scheduled"
    | "In Bay"
    | "Repairing"
    | "Ready";

export interface ServiceBooking {
    id: string;
    // Vehicle
    vehicleMakeModel: string;
    registrationNumber: string;
    // Owner
    ownerName: string;
    ownerPhone: string;
    ownerEmail?: string;
    // Service
    serviceCategory: ServiceCategory;
    preferredDate: string;
    requiresConcierge: boolean;
    description?: string;
    status: WorkshopStatus;
    createdAt: string;
}

export interface ServiceHistoryEntry {
    id: string;
    date: string;
    vehicle: string;
    registration: string;
    serviceType: ServiceCategory;
    mechanic: string;
    cost: number;
    status: "Completed" | "In Progress" | "Scheduled";
}

export interface GarageVehicle {
    id: string;
    makeModel: string;
    registration: string;
    year: number;
    lastService: string;
    imageSlug: string;
}

export interface WorkshopVehicle {
    id: string;
    registration: string;
    vehicleName: string;
    serviceType: ServiceCategory;
    status: WorkshopStatus;
    customerName: string;
    customerPhone: string;
    reportedIssue: string;
    assignedMechanic: string;
    dateIn: string;
    estimatedCompletion: string;
}
