/* ─── Admin Dashboard Mock Data ─── */

export const monthlyRevenue = [
    { month: "Aug", revenue: 1850000, vehicles: 12 },
    { month: "Sep", revenue: 2100000, vehicles: 15 },
    { month: "Oct", revenue: 1920000, vehicles: 13 },
    { month: "Nov", revenue: 2450000, vehicles: 18 },
    { month: "Dec", revenue: 2800000, vehicles: 22 },
    { month: "Jan", revenue: 2350000, vehicles: 17 },
    { month: "Feb", revenue: 2680000, vehicles: 20 },
];

export const serviceBreakdown = [
    { name: "Minor Service", value: 35, color: "#60a5fa" },
    { name: "Major Service", value: 25, color: "#f97316" },
    { name: "Diagnostics", value: 22, color: "#a78bfa" },
    { name: "Detailing & Bodywork", value: 18, color: "#f472b6" },
];

export const weeklyBookings = [
    { day: "Mon", bookings: 4, completed: 3 },
    { day: "Tue", bookings: 6, completed: 5 },
    { day: "Wed", bookings: 5, completed: 4 },
    { day: "Thu", bookings: 7, completed: 6 },
    { day: "Fri", bookings: 8, completed: 7 },
    { day: "Sat", bookings: 3, completed: 3 },
    { day: "Sun", bookings: 0, completed: 0 },
];

export const topMechanics = [
    { name: "James Mwangi", vehicles: 42, rating: 4.9, specialty: "BMW / Porsche" },
    { name: "Peter Otieno", vehicles: 38, rating: 4.8, specialty: "Mercedes-Benz" },
    { name: "Samuel Kiprop", vehicles: 35, rating: 4.7, specialty: "Range Rover / Toyota" },
    { name: "Michael Wekesa", vehicles: 29, rating: 4.9, specialty: "Detailing Specialist" },
];

export const recentCustomerActivity = [
    { name: "John Kamau", vehicle: "Range Rover Vogue", action: "Dropped off", time: "2h ago", status: "In Bay" as const },
    { name: "Grace Wanjiku", vehicle: "BMW X7 M60i", action: "Booked service", time: "4h ago", status: "Scheduled" as const },
    { name: "Brian Njenga", vehicle: "Audi Q8 55 TFSI", action: "In detailing", time: "1 day ago", status: "Repairing" as const },
    { name: "Martin Njoroge", vehicle: "Toyota LC 300 GR", action: "Ready for pickup", time: "1 day ago", status: "Ready" as const },
    { name: "Fatuma Ali", vehicle: "Mercedes GLE 53 AMG", action: "Ready for pickup", time: "1 day ago", status: "Ready" as const },
];

export const adminKpis = {
    /* Core Business (Inventory & Sales) */
    totalInventory: 8,
    availableVehicles: 5,
    reservedVehicles: 1,
    soldThisMonth: 2,
    inventoryValue: 234500000,
    monthlySalesRevenue: 61500000,
    /* Service */
    totalVehiclesServiced: 156,
    serviceRevenue: 16150000,
    activeBookings: 8,
    customerSatisfaction: 4.8,
    bayOccupancy: 75,
    avgTurnaround: 2.4,
};

/* ─── Inventory Status for admin ─── */
export const inventoryBreakdown = [
    { name: "Available", value: 5, color: "#34d399" },
    { name: "Reserved", value: 1, color: "#fbbf24" },
    { name: "Importing", value: 1, color: "#60a5fa" },
    { name: "Sold", value: 1, color: "#f87171" },
];

export const monthlySales = [
    { month: "Aug", sales: 1, revenue: 22000000 },
    { month: "Sep", sales: 2, revenue: 47500000 },
    { month: "Oct", sales: 1, revenue: 28000000 },
    { month: "Nov", sales: 3, revenue: 80000000 },
    { month: "Dec", sales: 2, revenue: 61500000 },
    { month: "Jan", sales: 1, revenue: 35000000 },
    { month: "Feb", sales: 2, revenue: 61500000 },
];

export const recentSales = [
    {
        vehicle: "2024 Audi Q8 55 TFSI",
        slug: "2024-audi-q8-55-tfsi",
        buyer: "David Mutua",
        date: "2026-02-12",
        price: 19500000,
        status: "Delivered" as const,
    },
    {
        vehicle: "2024 Mercedes-AMG GLE 53",
        slug: "2024-mercedes-gle-53-amg-coupe",
        buyer: "Priscilla Wanjiru",
        date: "2026-02-05",
        price: 22000000,
        status: "Processing" as const,
    },
    {
        vehicle: "2024 BMW X7 M60i",
        slug: "2024-bmw-x7-m60i",
        buyer: "Robert Onyango",
        date: "2026-01-28",
        price: 28000000,
        status: "Delivered" as const,
    },
];

/* ─── Owner Dashboard Mock Data ─── */

export const ownerMonthlySpend = [
    { month: "Aug", amount: 0 },
    { month: "Sep", amount: 92000 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 245000 },
    { month: "Dec", amount: 85000 },
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 45000 },
];

export const ownerKpis = {
    totalVehicles: 3,
    upcomingServices: 1,
    totalSpent: 622000,
    loyaltyPoints: 3110,
};

export const nextServiceInfo = {
    vehicle: "Porsche Cayenne Turbo GT",
    registration: "KDK 321D",
    serviceType: "Diagnostics",
    date: "2026-02-25",
    mechanic: "James Mwangi",
    imageSlug: "2024-porsche-cayenne-turbo-gt",
};

export const vehicleHealth = [
    {
        id: "vh1",
        name: "2024 Range Rover Autobiography",
        registration: "KDH 456B",
        lastService: "2025-11-15",
        nextService: "2026-05-15",
        serviceStatus: "good" as const,
        mileage: 28500,
        imageSlug: "2024-range-rover-autobiography",
    },
    {
        id: "vh2",
        name: "2024 Mercedes-AMG G63",
        registration: "KDJ 789C",
        lastService: "2025-09-02",
        nextService: "2026-03-02",
        serviceStatus: "due-soon" as const,
        mileage: 31200,
        imageSlug: "2024-mercedes-g63-amg",
    },
    {
        id: "vh3",
        name: "2024 Porsche Cayenne Turbo GT",
        registration: "KDK 321D",
        lastService: "2025-12-20",
        nextService: "2026-02-25",
        serviceStatus: "overdue" as const,
        mileage: 15800,
        imageSlug: "2024-porsche-cayenne-turbo-gt",
    },
];
