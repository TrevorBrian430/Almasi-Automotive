"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Copy, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import Image from "next/image";

interface MediaFile {
    url: string;
    id: string; // url as id
}

export default function MediaManager() {
    const [images, setImages] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/images");
            const data = await res.json();
            if (data.images) {
                setImages(data.images.map((url: string) => ({ url, id: url })));
            }
        } catch (error) {
            console.error("Failed to fetch images", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.url) {
                setImages((prev) => [...prev, { url: data.url, id: data.url }]);
                setMessage({ text: "Image uploaded successfully", type: "success" });
            } else {
                setMessage({ text: "Upload failed", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Upload error", type: "error" });
        } finally {
            setUploading(false);
            // reset input
            e.target.value = "";
        }
    };

    const handleDelete = async (url: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`/api/images?url=${encodeURIComponent(url)}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setImages((prev) => prev.filter((img) => img.url !== url));
                setMessage({ text: "Image deleted", type: "success" });
            } else {
                setMessage({ text: "Delete failed", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Delete error", type: "error" });
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setMessage({ text: "URL copied to clipboard", type: "success" });
        setTimeout(() => setMessage(null), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 border border-white/[0.08] p-4 rounded-sm">
                <div>
                    <h2 className="text-lg text-platinum mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                        Media Library
                    </h2>
                    <p className="text-xs text-muted">Manage vehicle images and assets.</p>
                </div>

                <div className="relative">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-black text-sm font-medium tracking-wide uppercase rounded-sm cursor-pointer hover:bg-gold/90 transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        Upload Image
                    </label>
                </div>
            </div>

            {/* Message Toast */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-3 rounded-sm text-sm border ${message.type === "success"
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                            }`}
                    >
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Gallery Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                    <ImageIcon className="w-10 h-10 text-white/20 mx-auto mb-4" />
                    <p className="text-muted">No images found. Upload one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AnimatePresence>
                        {images.map((img) => (
                            <motion.div
                                key={img.url}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative aspect-square bg-card border border-white/[0.08] rounded-sm overflow-hidden"
                            >
                                <Image
                                    src={img.url}
                                    alt="Vehicle Image"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyToClipboard(img.url)}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                        title="Copy URL"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img.url)}
                                        className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-[10px] text-white/70 truncate px-1">
                                        {img.url.split("/").pop()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
