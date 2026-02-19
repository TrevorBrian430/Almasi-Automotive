import VehicleForm from "@/components/admin/fleet/vehicle-form";

export const metadata = {
    title: "Add Vehicle | Admin Dashboard",
};

export default function NewVehiclePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Add Vehicle
                </h1>
                <p className="text-muted text-sm">
                    Add a new vehicle to the inventory.
                </p>
            </div>

            <VehicleForm />
        </div>
    );
}
