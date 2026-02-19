"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlmasiCar } from "@/types/car";
import { saveVehicle } from "@/lib/actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X, Image as ImageIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

const vehicleSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.coerce.number().min(1900).max(2100),
    price: z.object({
        kes: z.coerce.number().min(0, "Price must be positive"),
        usd: z.coerce.number().min(0, "Price must be positive"),
        is_negotiable: z.boolean().default(false),
    }),
    status: z.enum(["Available", "Reserved", "Sold", "Importing"]),
    location: z.enum(["Nairobi Showroom", "Mombasa Port", "Transit"]),
    body: z.enum(["SUV", "Crossover", "Sedan"]),
    specs: z.object({
        engine: z.string().min(1),
        transmission: z.string().min(1),
        mileage_km: z.coerce.number().min(0),
        color_ext: z.string().min(1),
        color_int: z.string().min(1),
        drive_train: z.enum(["4WD", "RWD", "AWD"]),
    }),
    features: z.array(z.string()).min(1, "Add at least one feature"),
    images: z.object({
        hero: z.string().min(1, "Hero image is required"),
        gallery: z.array(z.string()),
    }),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function VehicleForm({ initialData }: { initialData?: AlmasiCar }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<VehicleFormValues>({
        resolver: zodResolver(vehicleSchema) as any,
        defaultValues: initialData || {
            name: "",
            slug: "",
            make: "",
            model: "",
            year: new Date().getFullYear(),
            price: { kes: 0, usd: 0, is_negotiable: false }, // Should be numbers
            status: "Available",
            location: "Nairobi Showroom",
            body: "SUV",
            specs: {
                engine: "",
                transmission: "",
                mileage_km: 0,
                color_ext: "",
                color_int: "",
                drive_train: "4WD",
            },
            features: [""],
            images: { hero: "", gallery: [""] },
        },
    });

    // Watch arrays for rendering
    const features = form.watch("features");
    const gallery = form.watch("images.gallery");

    // Dynamic field handling helpers
    const addFeature = () => {
        const current = form.getValues("features");
        form.setValue("features", [...current, ""]);
    };

    const removeFeature = (index: number) => {
        const current = form.getValues("features");
        form.setValue("features", current.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, value: string) => {
        const current = form.getValues("features");
        const newFeatures = [...current];
        newFeatures[index] = value;
        form.setValue("features", newFeatures);
    };

    const addGalleryImage = () => {
        const current = form.getValues("images.gallery");
        form.setValue("images.gallery", [...current, ""]);
    };

    const removeGalleryImage = (index: number) => {
        const current = form.getValues("images.gallery");
        form.setValue("images.gallery", current.filter((_, i) => i !== index));
    };

    const updateGalleryImage = (index: number, value: string) => {
        const current = form.getValues("images.gallery");
        const newGallery = [...current];
        newGallery[index] = value;
        form.setValue("images.gallery", newGallery);
    };

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        form.setValue("name", name);
        if (!initialData) {
            form.setValue("slug", slug);
        }
    };

    const onSubmit = (data: VehicleFormValues) => {
        setError(null);
        startTransition(async () => {
            // Filter out empty features/gallery strings
            const cleanedData = {
                ...data,
                features: data.features.filter(f => f.trim() !== ""),
                images: {
                    ...data.images,
                    gallery: data.images.gallery.filter(g => g.trim() !== ""),
                }
            };

            const res = await saveVehicle(cleanedData as AlmasiCar);
            if (res.success) {
                router.push("/admin/fleet");
                router.refresh();
            } else {
                setError(res.error || "Something went wrong");
            }
        });
    };

    // Style helpers
    const inputClass = "w-full bg-[#0A0A0A] border border-white/[0.08] rounded-sm px-4 py-2.5 text-sm text-platinum placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors";
    const labelClass = "block text-[10px] uppercase tracking-wider text-muted mb-1.5";
    const sectionClass = "bg-card/40 border border-white/[0.08] p-6 rounded-sm space-y-6";

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-sm text-sm">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between">
                <Link href="/admin/fleet" className="text-sm text-muted hover:text-white transition-colors">
                    ← Back to Fleet
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/media"
                        target="_blank"
                        className="text-xs text-gold hover:underline flex items-center gap-1"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Open Media Manager
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2.5 bg-gold text-black text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-gold/90 transition-all disabled:opacity-50"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Vehicle"}
                    </button>
                </div>
            </div>

            {/* Basic Info */}
            <div className={sectionClass}>
                <h3 className="text-lg text-platinum font-medium border-b border-white/[0.08] pb-4">
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className={labelClass}>Vehicle Name</label>
                        <input
                            {...form.register("name")}
                            onChange={handleNameChange}
                            placeholder="e.g. 2024 Toyota Land Cruiser 300 GR Sport"
                            className={inputClass}
                        />
                        {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>Slug (URL)</label>
                        <input {...form.register("slug")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Make</label>
                        <input {...form.register("make")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Model</label>
                        <input {...form.register("model")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Year</label>
                        <input type="number" {...form.register("year")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select {...form.register("status")} className={inputClass}>
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                            <option value="Importing">Importing</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Location</label>
                        <select {...form.register("location")} className={inputClass}>
                            <option value="Nairobi Showroom">Nairobi Showroom</option>
                            <option value="Mombasa Port">Mombasa Port</option>
                            <option value="Transit">Transit</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Body Type</label>
                        <select {...form.register("body")} className={inputClass}>
                            <option value="SUV">SUV</option>
                            <option value="Crossover">Crossover</option>
                            <option value="Sedan">Sedan</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Price */}
            <div className={sectionClass}>
                <h3 className="text-lg text-platinum font-medium border-b border-white/[0.08] pb-4">
                    Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>Price (KES)</label>
                        <input type="number" {...form.register("price.kes")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Price (USD)</label>
                        <input type="number" {...form.register("price.usd")} className={inputClass} />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <input
                            type="checkbox"
                            {...form.register("price.is_negotiable")}
                            className="w-4 h-4 rounded-sm border-white/20 bg-transparent text-gold focus:ring-gold"
                        />
                        <label className="text-sm text-platinum">Price is Negotiable</label>
                    </div>
                </div>
            </div>

            {/* Specs */}
            <div className={sectionClass}>
                <h3 className="text-lg text-platinum font-medium border-b border-white/[0.08] pb-4">
                    Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>Engine</label>
                        <input {...form.register("specs.engine")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Transmission</label>
                        <input {...form.register("specs.transmission")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Mileage (KM)</label>
                        <input type="number" {...form.register("specs.mileage_km")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Exterior Color</label>
                        <input {...form.register("specs.color_ext")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Interior Color</label>
                        <input {...form.register("specs.color_int")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Drivetrain</label>
                        <select {...form.register("specs.drive_train")} className={inputClass}>
                            <option value="4WD">4WD</option>
                            <option value="AWD">AWD</option>
                            <option value="RWD">RWD</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className={sectionClass}>
                <h3 className="text-lg text-platinum font-medium border-b border-white/[0.08] pb-4 flex justify-between items-center">
                    <span>Images</span>
                    <span className="text-xs text-muted font-normal">Use Media Manager to upload & copy URLs</span>
                </h3>

                <div>
                    <label className={labelClass}>Hero Image URL</label>
                    <div className="flex gap-2">
                        <input {...form.register("images.hero")} className={inputClass} placeholder="/uploads/..." />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Gallery Images</label>
                    <div className="space-y-3">
                        {gallery.map((_, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    value={form.getValues(`images.gallery.${index}`)}
                                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                                    className={inputClass}
                                    placeholder={`Gallery Image ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="p-2 text-muted hover:text-red-400 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addGalleryImage}
                            className="text-xs text-gold hover:underline flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Add Image
                        </button>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className={sectionClass}>
                <h3 className="text-lg text-platinum font-medium border-b border-white/[0.08] pb-4">
                    Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((_, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                value={form.getValues(`features.${index}`)}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                className={inputClass}
                                placeholder="Feature description"
                            />
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-2 text-muted hover:text-red-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addFeature}
                    className="text-xs text-gold hover:underline flex items-center gap-1 mt-2"
                >
                    <Plus className="w-3 h-3" /> Add Feature
                </button>
            </div>
        </form>
    );
}
