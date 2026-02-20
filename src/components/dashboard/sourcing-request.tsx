"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Loader2, Sparkles, Check, X, ScanLine, Smartphone } from "lucide-react";
import GoldButton from "@/components/ui/gold-button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SourcingRequest() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith("image/")) {
            startAnalysis(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            startAnalysis(selectedFile);
        }
    };

    const startAnalysis = (file: File) => {
        setFile(file);
        setAnalyzing(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                make: "Mercedes-Benz",
                model: "G63 AMG",
                year: "2024",
                trim: "Grand Edition",
                confidence: 99.2
            });
        }, 3000);
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setAnalyzing(false);
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-1 h-full flex flex-col group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            <div className="p-6 pb-2 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 rounded-sm bg-white/5 border border-white/10">
                        <Smartphone className="w-4 h-4 text-gold" />
                    </div>
                    <h3 className="text-sm text-platinum tracking-widest uppercase font-medium">
                        Visual AI Sourcing
                    </h3>
                </div>
                <p className="text-[11px] text-muted leading-relaxed max-w-sm">
                    Spotted a car in the wild? Upload a photo and let our AI patterns match the spec for sourcing.
                </p>
            </div>

            <div className="flex-1 p-6 pt-2 relative">
                <div className={cn(
                    "h-full w-full rounded-sm border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center relative overflow-hidden",
                    !file ? "border-white/10 hover:border-gold/30 hover:bg-gold/[0.02]" : "border-gold/20 bg-black"
                )}>
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex flex-col items-center justify-center"
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    id="car-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                                <label
                                    htmlFor="car-upload"
                                    className="cursor-pointer flex flex-col items-center w-full h-full justify-center group/label"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center mb-5 group-hover/label:scale-110 transition-transform duration-500 shadow-2xl">
                                        <Camera className="w-6 h-6 text-muted group-hover/label:text-gold transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-sm text-platinum font-medium mb-1">Upload Vehicle Photo</p>
                                    <p className="text-[10px] text-muted tracking-wide uppercase">or drag and drop</p>
                                </label>
                            </motion.div>
                        ) : analyzing ? (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20"
                            >
                                {/* Scanning Effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.div
                                        className="w-full h-[2px] bg-gold box-shadow-[0_0_20px_#D4AF37]"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                    />
                                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                                </div>

                                <div className="relative z-10 w-24 h-24 mb-6">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                        <motion.circle
                                            cx="50" cy="50" r="45"
                                            fill="none"
                                            stroke="#D4AF37"
                                            strokeWidth="2"
                                            strokeDasharray="283"
                                            strokeDashoffset="283"
                                            animate={{ strokeDashoffset: [283, 0] }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />
                                    </svg>
                                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-gold animate-pulse" />
                                </div>
                                <h4 className="text-platinum text-sm tracking-widest uppercase mb-1">Analyzing Geometry</h4>
                                <div className="h-4 overflow-hidden relative">
                                    <div className="flex flex-col items-center animate-slide-up-fade">
                                        <p className="text-[10px] text-muted font-mono">Identifying chassis code...</p>
                                        {/* You can add more text here and animate a slider if needed, for simplicity just one line changing */}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full flex flex-col items-center justify-center text-center p-4 relative z-10"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 v-transparent opacity-50 pointer-events-none" />

                                <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                                    <Check className="w-5 h-5" />
                                </div>

                                <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 mb-3 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-900/20">
                                    Match Found {result.confidence}%
                                </p>

                                <h3 className="text-2xl text-platinum mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                    {result.year} {result.make}
                                </h3>
                                <p className="text-sm text-gold mb-8">{result.model} <span className="text-white/40">/</span> {result.trim}</p>

                                <div className="w-full space-y-3">
                                    <GoldButton className="w-full justify-center shadow-lg shadow-gold/10">
                                        <ScanLine className="w-4 h-4 mr-2" />
                                        Initiate Sourcing
                                    </GoldButton>
                                    <button
                                        onClick={reset}
                                        className="text-[10px] text-muted hover:text-white transition-colors uppercase tracking-wider flex items-center justify-center gap-2 w-full py-2"
                                    >
                                        <X className="w-3 h-3" />
                                        Cancel & Rescan
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
