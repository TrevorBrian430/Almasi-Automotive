import { getVehicleBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import VehicleClient from "@/app/collection/[slug]/vehicle-client";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: car } = await getVehicleBySlug(slug);
    if (!car) return { title: "Vehicle Not Found" };
    return {
        title: `${car.name} | Almasi Automotive`,
        description: `View details for ${car.name}. ${car.specs.engine}, ${car.specs.mileage_km}km.`,
    };
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: car } = await getVehicleBySlug(slug);

    if (!car) {
        notFound();
    }

    return <VehicleClient car={car} />;
}
