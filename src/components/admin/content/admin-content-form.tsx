"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { saveContent } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Loader2, Save, ExternalLink, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminContentForm({ initialContent }: { initialContent: any }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"hero" | "about" | "contact" | "services" | "testimonials">("hero");

    const form = useForm({
        defaultValues: initialContent || {
            hero: { title: "", subtitle: "", image: "" },
            about: { title: "", story: "", stats: [] },
            contact: { phone: "", email: "", address: "" },
            services: [],
            testimonials: []
        },
    });

    const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
        control: form.control,
        name: "services",
    });

    const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
        control: form.control,
        name: "testimonials",
    });

    const onSubmit = (data: any) => {
        startTransition(async () => {
            const res = await saveContent(data);
            if (res.success) {
                router.refresh();
                alert("Content updated successfully!");
            } else {
                alert("Failed to update content");
            }
        });
    };

    const inputClass = "w-full bg-[#0A0A0A] border border-white/[0.08] rounded-sm px-4 py-2.5 text-sm text-platinum placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors";
    const labelClass = "block text-[10px] uppercase tracking-wider text-muted mb-1.5";
    const sectionClass = "bg-card/40 border border-white/[0.08] p-4 sm:p-6 rounded-sm space-y-6";
    const tabClass = (tab: string) => `px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${activeTab === tab ? "bg-gold text-black" : "text-muted hover:text-platinum hover:bg-white/5"}`;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 md:pb-0">
                <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    <button type="button" onClick={() => setActiveTab("hero")} className={`whitespace-nowrap ${tabClass("hero")}`}>Hero Section</button>
                    <button type="button" onClick={() => setActiveTab("about")} className={`whitespace-nowrap ${tabClass("about")}`}>About Us</button>
                    <button type="button" onClick={() => setActiveTab("contact")} className={`whitespace-nowrap ${tabClass("contact")}`}>Contact Info</button>
                    <button type="button" onClick={() => setActiveTab("services")} className={`whitespace-nowrap ${tabClass("services")}`}>Services</button>
                    <button type="button" onClick={() => setActiveTab("testimonials")} className={`whitespace-nowrap ${tabClass("testimonials")}`}>Testimonials</button>
                </div>
                <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                    <Link
                        href="/admin/media"
                        target="_blank"
                        className="text-xs text-gold hover:underline flex items-center gap-1 mr-2"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Media Manager
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 px-6 py-2 bg-gold text-black text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-gold/90 transition-all disabled:opacity-50 whitespace-nowrap"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {activeTab === "hero" && (
                <div className={sectionClass}>
                    <h3 className="text-lg text-platinum font-medium mb-4">Hero Configuration</h3>
                    <div>
                        <label className={labelClass}>Main Title (Use \n for line breaks)</label>
                        <textarea {...form.register("hero.title")} className={inputClass} rows={3} />
                    </div>
                    <div>
                        <label className={labelClass}>Subtitle</label>
                        <textarea {...form.register("hero.subtitle")} className={inputClass} rows={2} />
                    </div>
                    <div>
                        <label className={labelClass}>Background Image URL</label>
                        <input {...form.register("hero.image")} className={inputClass} />
                    </div>
                </div>
            )}

            {activeTab === "about" && (
                <div className={sectionClass}>
                    <h3 className="text-lg text-platinum font-medium mb-4">About Us Section</h3>
                    <div>
                        <label className={labelClass}>Title</label>
                        <input {...form.register("about.title")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Brand Story</label>
                        <textarea {...form.register("about.story")} className={inputClass} rows={6} />
                    </div>
                </div>
            )}

            {activeTab === "contact" && (
                <div className={sectionClass}>
                    <h3 className="text-lg text-platinum font-medium mb-4">Global Contact Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <input {...form.register("contact.phone")} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Email Address</label>
                            <input {...form.register("contact.email")} className={inputClass} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Physical Address</label>
                            <input {...form.register("contact.address")} className={inputClass} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "services" && (
                <div className={sectionClass}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg text-platinum font-medium">Service Pillars</h3>
                        <button
                            type="button"
                            onClick={() => appendService({ title: "", description: "", icon: "Shield" })}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add Pillar
                        </button>
                    </div>
                    <div className="space-y-6">
                        {serviceFields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-black/20 border border-white/5 rounded-sm relative group">
                                <button
                                    type="button"
                                    onClick={() => removeService(index)}
                                    className="absolute top-4 right-4 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Title</label>
                                        <input {...form.register(`services.${index}.title`)} className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea {...form.register(`services.${index}.description`)} className={inputClass} rows={2} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Icon Name (Shield, Truck, HeartHandshake)</label>
                                        <input {...form.register(`services.${index}.icon`)} className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "testimonials" && (
                <div className={sectionClass}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg text-platinum font-medium">Testimonials</h3>
                        <button
                            type="button"
                            onClick={() => appendTestimonial({ name: "", role: "", quote: "", rating: 5 })}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add Testimonial
                        </button>
                    </div>
                    <div className="space-y-6">
                        {testimonialFields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-black/20 border border-white/5 rounded-sm relative group">
                                <button
                                    type="button"
                                    onClick={() => removeTestimonial(index)}
                                    className="absolute top-4 right-4 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Client Name</label>
                                        <input {...form.register(`testimonials.${index}.name`)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Role / Company</label>
                                        <input {...form.register(`testimonials.${index}.role`)} className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Quote</label>
                                        <textarea {...form.register(`testimonials.${index}.quote`)} className={inputClass} rows={3} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Rating (1-5)</label>
                                        <input {...form.register(`testimonials.${index}.rating`)} type="number" min="1" max="5" className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </form>
    );
}
