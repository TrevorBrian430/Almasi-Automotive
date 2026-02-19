import path from "path";
import { readFile, writeFile } from "fs/promises";
import { AlmasiCar } from "@/types/car";

const DATA_DIR = path.join(process.cwd(), "src/data");
const VEHICLES_FILE = path.join(DATA_DIR, "vehicles.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

// Helper to ensure data availability (could add caching here)
async function readJson<T>(filePath: string): Promise<T> {
    try {
        const data = await readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        throw new Error("Failed to read database");
    }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        throw new Error("Failed to write to database");
    }
}

export const db = {
    vehicles: {
        getAll: () => readJson<AlmasiCar[]>(VEHICLES_FILE),
        save: (data: AlmasiCar[]) => writeJson(VEHICLES_FILE, data),
        // Helper to simulate DB delay if needed
        add: async (car: AlmasiCar) => {
            const cars = await readJson<AlmasiCar[]>(VEHICLES_FILE);
            cars.push(car);
            await writeJson(VEHICLES_FILE, cars);
            return car;
        },
        update: async (id: string, updates: Partial<AlmasiCar>) => {
            const cars = await readJson<AlmasiCar[]>(VEHICLES_FILE);
            const index = cars.findIndex(c => c.id === id);
            if (index === -1) throw new Error("Car not found");

            cars[index] = { ...cars[index], ...updates };
            await writeJson(VEHICLES_FILE, cars);
            return cars[index];
        },
        delete: async (id: string) => {
            const cars = await readJson<AlmasiCar[]>(VEHICLES_FILE);
            const newCars = cars.filter(c => c.id !== id);
            await writeJson(VEHICLES_FILE, newCars);
        }
    },
    content: {
        get: () => readJson<any>(CONTENT_FILE),
        update: (data: any) => writeJson(CONTENT_FILE, data)
    }
};
