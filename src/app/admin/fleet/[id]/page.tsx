import VehicleForm from "@/components/admin/fleet/vehicle-form";
import { getVehicle } from "@/lib/actions";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Vehicle | Admin Dashboard",
};

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: vehicle } = await getVehicle(id);

    if (!vehicle) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Edit Vehicle
                </h1>
                <p className="text-muted text-sm">
                    Update vehicle details.
                </p>
            </div>

            <VehicleForm initialData={vehicle} />
        </div>
    );
}
