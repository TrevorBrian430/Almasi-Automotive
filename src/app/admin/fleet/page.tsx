import { getVehicles, deleteVehicle } from "@/lib/actions";
import Link from "next/link";
import { Plus, Pencil, Trash2, Car, MapPin } from "lucide-react";
import DeleteVehicleButton from "@/components/admin/fleet/delete-button";
import Image from "next/image";

export const metadata = {
    title: "Fleet Manager | Admin Dashboard",
};

export default async function AdminFleetPage() {
    const { data: vehicles } = await getVehicles();

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Fleet Manager
                    </h1>
                    <p className="text-muted text-sm">
                        Manage your vehicle inventory.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/fleet/sell-back"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-platinum text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-white/10 hover:border-gold/30 hover:text-gold transition-all"
                    >
                        Sell Backs
                        <span className="flex items-center justify-center bg-gold text-black text-xs font-bold w-5 h-5 rounded-sm">
                            3
                        </span>
                    </Link>
                    <Link
                        href="/admin/fleet/new"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-black text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-gold/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Vehicle
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles?.map((car) => (
                    <div
                        key={car.id}
                        className="group bg-[#0A0A0A] border border-white/[0.08] rounded-sm overflow-hidden hover:border-gold/30 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative aspect-[16/10] bg-card">
                            <Image
                                src={car.images.hero}
                                alt={car.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-white">
                                {car.status}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-lg text-platinum font-medium mb-1 line-clamp-1">
                                    {car.name}
                                </h3>
                                <p className="text-gold text-sm tracking-wider">
                                    KES {car.price.kes.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted">
                                <div className="flex items-center gap-1.5">
                                    <Car className="w-3.5 h-3.5" />
                                    {car.specs.mileage_km.toLocaleString()} km
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {car.location}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                                <Link
                                    href={`/admin/fleet/${car.id}`}
                                    className="p-2 text-muted hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                <DeleteVehicleButton id={car.id} name={car.name} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!vehicles || vehicles.length === 0) && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                    <p className="text-muted">No vehicles found. Add one to get started.</p>
                </div>
            )}
        </div>
    );
}
