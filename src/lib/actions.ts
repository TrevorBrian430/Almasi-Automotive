"use server";

import { db } from "@/lib/db";
import { AlmasiCar } from "@/types/car";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getVehicles() {
    try {
        const cars = await db.vehicles.getAll();
        return { success: true, data: cars };
    } catch (error) {
        return { success: false, error: "Failed to fetch vehicles" };
    }
}

export async function getVehicle(id: string) {
    try {
        const cars = await db.vehicles.getAll();
        const car = cars.find((c) => c.id === id);
        if (!car) return { success: false, error: "Vehicle not found" };
        return { success: true, data: car };
    } catch (error) {
        return { success: false, error: "Failed to fetch vehicle" };
    }
}

export async function getVehicleBySlug(slug: string) {
    try {
        const cars = await db.vehicles.getAll();
        const car = cars.find((c) => c.slug === slug);
        if (!car) return { success: false, error: "Vehicle not found" };
        return { success: true, data: car };
    } catch (error) {
        return { success: false, error: "Failed to fetch vehicle" };
    }
}

export async function getContent() {
    try {
        const content = await db.content.get();
        return { success: true, data: content };
    } catch (error) {
        return { success: false, error: "Failed to fetch content" };
    }
}

export async function saveContent(data: any) {
    try {
        await db.content.update(data);
        revalidatePath("/");
        revalidatePath("/about"); // If used there
        revalidatePath("/admin/content");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to save content" };
    }
}

export async function deleteVehicle(id: string) {
    try {
        await db.vehicles.delete(id);
        revalidatePath("/admin/fleet");
        revalidatePath("/collection");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete vehicle" };
    }
}

export async function saveVehicle(data: AlmasiCar) {
    try {
        // checks if exists or new?
        const cars = await db.vehicles.getAll();
        const existing = cars.find((c) => c.id === data.id);

        if (existing) {
            await db.vehicles.update(data.id, data);
        } else {
            // ensure ID is set. If not, generate one.
            if (!data.id) data.id = Math.random().toString(36).substr(2, 9);
            await db.vehicles.add(data);
        }

        revalidatePath("/admin/fleet");
        revalidatePath("/collection");
        revalidatePath(`/collection/${data.slug}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to save vehicle" };
    }
}
