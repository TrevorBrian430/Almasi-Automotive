import { getVehicles } from "@/lib/actions";
import CompareClient from "@/components/compare/compare-client";

export const metadata = {
    title: "Compare | Almasi Automotive",
    description: "Compare luxury vehicles side by side.",
};

export default async function ComparePage() {
    const { data: cars } = await getVehicles();
    return <CompareClient cars={cars || []} />;
}
