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
}
