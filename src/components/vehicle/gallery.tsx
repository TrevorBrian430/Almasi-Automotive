"use client";

import { AlmasiCar } from "@/types/car";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryProps {
    car: AlmasiCar;
}

export default function Gallery({ car }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const allImages = [car.images.hero, ...car.images.gallery];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="space-y-4">
            {/* Main Image with Ken Burns */}
            <div
                className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-card border border-white/[0.06] rounded-sm cursor-pointer group"
                onClick={() => openLightbox(activeIndex)}
            >
                <Image
                    src={allImages[activeIndex]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    className="object-cover ken-burns"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={activeIndex === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent z-10" />
                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20">
                    <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-1">
                        {car.year} {car.make}
                    </p>
                    <h1
                        className="text-xl sm:text-2xl md:text-4xl text-platinum tracking-wide"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {car.model}
                    </h1>
                </div>
                {/* Fullscreen hint */}
                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {allImages.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`shrink-0 w-16 sm:w-20 h-12 sm:h-14 rounded-sm border overflow-hidden bg-card transition-all duration-300 ${activeIndex === index
                                ? "border-gold/40"
                                : "border-white/[0.06] opacity-50 hover:opacity-80"
                                }`}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`${car.model} view ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={allImages}
                        initialIndex={lightboxIndex}
                        carName={`${car.year} ${car.make} ${car.model}`}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Fullscreen Lightbox ─── */
interface LightboxProps {
    images: string[];
    initialIndex: number;
    carName: string;
    onClose: () => void;
}

function Lightbox({ images, initialIndex, carName, onClose }: LightboxProps) {
    const [index, setIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const touchStartRef = useRef<{ x: number; y: number; dist: number; time: number }>({
        x: 0,
        y: 0,
        dist: 0,
        time: 0,
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const go = useCallback(
        (dir: 1 | -1) => {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
            setIndex((prev) => (prev + dir + images.length) % images.length);
        },
        [images.length]
    );

    /* Keyboard controls */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose, go]);

    /* Touch handlers for swipe + pinch-to-zoom */
    const getTouchDist = (touches: React.TouchList) => {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            dist: getTouchDist(e.touches),
            time: Date.now(),
        };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        // Pinch-to-zoom
        if (e.touches.length === 2) {
            const newDist = getTouchDist(e.touches);
            const oldDist = touchStartRef.current.dist;
            if (oldDist > 0) {
                const newScale = Math.max(1, Math.min(4, scale * (newDist / oldDist)));
                setScale(newScale);
                touchStartRef.current.dist = newDist;
            }
        }
        // Pan when zoomed
        if (e.touches.length === 1 && scale > 1) {
            const dx = e.touches[0].clientX - touchStartRef.current.x;
            const dy = e.touches[0].clientY - touchStartRef.current.y;
            setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
            touchStartRef.current.x = e.touches[0].clientX;
            touchStartRef.current.y = e.touches[0].clientY;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        // Swipe detection (only when not zoomed)
        if (scale <= 1 && e.changedTouches.length === 1) {
            const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
            const dt = Date.now() - touchStartRef.current.time;
            if (Math.abs(dx) > 50 && dt < 400) {
                go(dx > 0 ? -1 : 1);
            }
        }
        // Reset zoom if pinch ends and scale is close to 1
        if (e.touches.length === 0 && scale < 1.1) {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
        }
    };

    /* Double-tap to zoom */
    const lastTapRef = useRef(0);
    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            if (scale > 1) {
                setScale(1);
                setTranslate({ x: 0, y: 0 });
            } else {
                setScale(2.5);
            }
        }
        lastTapRef.current = now;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
            ref={containerRef}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 relative z-10">
                <p className="text-xs sm:text-sm text-white/50 tracking-wider">
                    {index + 1} / {images.length}
                </p>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                </button>
            </div>

            {/* Image area */}
            <div
                className="flex-1 relative flex items-center justify-center overflow-hidden touch-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleDoubleTap}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-4 sm:inset-8"
                        style={{
                            transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                        }}
                    >
                        <Image
                            src={images[index]}
                            alt={`${carName} view ${index + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Desktop nav arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); go(-1); }}
                            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center hover:bg-white/10 transition-colors z-10"
                        >
                            <ChevronLeft className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); go(1); }}
                            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center hover:bg-white/10 transition-colors z-10"
                        >
                            <ChevronRight className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                        </button>
                    </>
                )}
            </div>

            {/* Bottom thumbnails */}
            <div className="px-4 sm:px-6 py-4 flex justify-center gap-2 overflow-x-auto no-scrollbar">
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => { setIndex(i); setScale(1); setTranslate({ x: 0, y: 0 }); }}
                        className={`shrink-0 w-12 h-9 sm:w-16 sm:h-11 rounded-sm border overflow-hidden transition-all duration-300 ${i === index ? "border-gold/50 opacity-100" : "border-white/10 opacity-40 hover:opacity-70"
                            }`}
                    >
                        <div className="relative w-full h-full">
                            <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="64px" />
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
