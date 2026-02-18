import { create } from "zustand";

type Currency = "KES" | "USD";
type StatusFilter = "All" | "Available" | "Reserved" | "Sold" | "Importing";
type LocationFilter = "All" | "Nairobi Showroom" | "Mombasa Port" | "Transit";
type BodyFilter = "All" | "SUV" | "Crossover" | "Sedan";

interface UIState {
    currency: Currency;
    filterStatus: StatusFilter;
    filterLocation: LocationFilter;
    filterBody: BodyFilter;
    mobileMenuOpen: boolean;
    bookingModalOpen: boolean;

    toggleCurrency: () => void;
    setCurrency: (c: Currency) => void;
    setFilterStatus: (s: StatusFilter) => void;
    setFilterLocation: (l: LocationFilter) => void;
    setFilterBody: (b: BodyFilter) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setBookingModalOpen: (open: boolean) => void;
    resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    currency: "KES",
    filterStatus: "All",
    filterLocation: "All",
    filterBody: "All",
    mobileMenuOpen: false,
    bookingModalOpen: false,

    toggleCurrency: () =>
        set((state) => ({ currency: state.currency === "KES" ? "USD" : "KES" })),
    setCurrency: (c) => set({ currency: c }),
    setFilterStatus: (s) => set({ filterStatus: s }),
    setFilterLocation: (l) => set({ filterLocation: l }),
    setFilterBody: (b) => set({ filterBody: b }),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    setBookingModalOpen: (open) => set({ bookingModalOpen: open }),
    resetFilters: () =>
        set({ filterStatus: "All", filterLocation: "All", filterBody: "All" }),
}));
