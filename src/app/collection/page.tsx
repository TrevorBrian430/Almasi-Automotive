import { getVehicles } from "@/lib/actions";
import CollectionClient from "@/app/collection/collection-client";

export const metadata = {
    title: "Collection | Almasi Automotive",
    description: "Explore our curated collection of luxury vehicles.",
};

export default async function CollectionPage() {
    const { data: cars } = await getVehicles();

    return <CollectionClient initialCars={cars || []} />;
}
