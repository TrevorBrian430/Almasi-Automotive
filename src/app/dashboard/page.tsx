import { getVehicles } from "@/lib/actions";
import OwnerDashboardClient from "@/components/dashboard/dashboard-client";

export default async function OwnerDashboardPage() {
    const { data: cars } = await getVehicles();
    return <OwnerDashboardClient cars={cars || []} />;
}
