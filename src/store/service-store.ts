import { create } from "zustand";
import type { ServiceBooking, WorkshopVehicle, WorkshopStatus } from "@/types/service";
import { workshopVehicles as initialWorkshopVehicles } from "@/data/service";

interface ServiceState {
    /* ── Bookings ── */
    bookings: ServiceBooking[];
    addBooking: (booking: Omit<ServiceBooking, "id" | "status" | "createdAt">) => void;

    /* ── Admin Workshop ── */
    workshopVehicles: WorkshopVehicle[];
    moveVehicle: (id: string, newStatus: WorkshopStatus) => void;

    /* ── Booking modal ── */
    bookingModalOpen: boolean;
    setBookingModalOpen: (open: boolean) => void;
}

let bookingCounter = 1;

export const useServiceStore = create<ServiceState>((set) => ({
    bookings: [],
    workshopVehicles: initialWorkshopVehicles,
    bookingModalOpen: false,

    addBooking: (booking) =>
        set((state) => ({
            bookings: [
                ...state.bookings,
                {
                    ...booking,
                    id: `booking-${bookingCounter++}`,
                    status: "Scheduled" as const,
                    createdAt: new Date().toISOString(),
                },
            ],
        })),

    moveVehicle: (id, newStatus) =>
        set((state) => ({
            workshopVehicles: state.workshopVehicles.map((v) =>
                v.id === id ? { ...v, status: newStatus } : v
            ),
        })),

    setBookingModalOpen: (open) => set({ bookingModalOpen: open }),
}));
