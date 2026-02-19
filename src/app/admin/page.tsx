import { getVehicles } from "@/lib/actions";
import AdminDashboardClient from "@/components/admin/dashboard-client";

export default async function AdminDashboardPage() {
    const { data: cars } = await getVehicles();
    return <AdminDashboardClient cars={cars || []} />;
}
