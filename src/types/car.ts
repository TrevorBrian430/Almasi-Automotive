export interface AlmasiCar {
    id: string;
    slug: string;
    name: string;
    make: string;
    model: string;
    year: number;
    price: {
        kes: number;
        usd: number;
        is_negotiable: boolean;
    };
    status: "Available" | "Reserved" | "Sold" | "Importing";
    location: "Nairobi Showroom" | "Mombasa Port" | "Transit";
    body: "SUV" | "Crossover" | "Sedan";
    specs: {
        engine: string;
        transmission: string;
        mileage_km: number;
        color_ext: string;
        color_int: string;
        drive_train: "4WD" | "RWD" | "AWD";
    };
    features: string[];
    images: {
        hero: string;
        gallery: string[];
    };
    sounds?: {
        engine_start?: string;
    };
    documents?: {
        id: string;
        title: string;
        type: "Logbook" | "Insurance" | "Inspection" | "Import" | "Invoice" | "Other";
        date: string;
        status: "Verified" | "Pending" | "Expired";
        url?: string;
    }[];
    valuation?: {
        currency: "KES" | "USD";
        price: number;
        purchasePrice: number;
        lastUpdated: string;
        trend: number; // Percentage change (e.g., 4.5 for +4.5%)
        history: { date: string; value: number }[];
    };
}
