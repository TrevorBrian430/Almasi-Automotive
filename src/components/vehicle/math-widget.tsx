"use client";

import { useState } from "react";
import { AlmasiCar } from "@/types/car";
import { useUIStore } from "@/store/ui-store";
import { formatPrice, calculateMonthlyPayment } from "@/lib/utils";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MathWidgetProps {
    car: AlmasiCar;
}

export default function MathWidget({ car }: MathWidgetProps) {
    const { currency } = useUIStore();
    const [activeTab, setActiveTab] = useState<"finance" | "duty">("finance");
    const [depositPercent, setDepositPercent] = useState(30);

    const price = currency === "KES" ? car.price.kes : car.price.usd;

    const depositAmount = Math.round(price * (depositPercent / 100));
    const monthlyPayment = calculateMonthlyPayment(price, depositPercent);

    // Duty breakdown mock
    const cifPrice = Math.round(price * 0.65);
    const importDuty = Math.round(cifPrice * 0.25);
    const exciseDuty = Math.round((cifPrice + importDuty) * 0.2);
    const vat = Math.round((cifPrice + importDuty + exciseDuty) * 0.16);
    const idf = Math.round(cifPrice * 0.035);
    const rdl = Math.round(cifPrice * 0.02);
    const landedCost = cifPrice + importDuty + exciseDuty + vat + idf + rdl;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card border border-white/[0.06] rounded-sm overflow-hidden"
        >
            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
                {(["finance", "duty"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-3 sm:py-4 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-300 relative",
                            activeTab === tab ? "text-gold" : "text-muted hover:text-platinum"
                        )}
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {tab === "finance" ? "Finance Calculator" : "Duty Breakdown"}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="mathTab"
                                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/50"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8">
                {activeTab === "finance" ? (
                    <div className="space-y-8">
                        {/* Deposit Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs text-muted tracking-wider uppercase">
                                    Deposit
                                </label>
                                <span className="text-sm text-gold font-medium">
                                    {depositPercent}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min={10}
                                max={80}
                                step={5}
                                value={depositPercent}
                                onChange={(e) => setDepositPercent(Number(e.target.value))}
                                className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gold
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-midnight
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-muted">10%</span>
                                <span className="text-xs text-muted">80%</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                                <span className="text-sm text-muted">Vehicle Price</span>
                                <span className="text-sm text-platinum">
                                    {formatPrice(price, currency)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                                <span className="text-sm text-muted">
                                    Deposit ({depositPercent}%)
                                </span>
                                <span className="text-sm text-platinum">
                                    {formatPrice(depositAmount, currency)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                                <span className="text-sm text-muted">Interest Rate</span>
                                <span className="text-sm text-platinum">13% p.a.</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                                <span className="text-sm text-muted">Term</span>
                                <span className="text-sm text-platinum">60 months</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-sm text-gold tracking-wider uppercase">
                                    Monthly Repayment
                                </span>
                                <span className="text-xl text-gold font-medium">
                                    {formatPrice(monthlyPayment, currency)}
                                </span>
                            </div>
                        </div>

                        <p className="text-[10px] text-muted/50 leading-relaxed">
                            *Indicative calculation only. Actual rates vary by lender. Partners: NCBA, Stanbic, I&M Bank.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">CIF Price</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(cifPrice, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">Import Duty (25%)</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(importDuty, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">Excise Duty (20%)</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(exciseDuty, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">VAT (16%)</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(vat, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">IDF Fee (3.5%)</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(idf, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                            <span className="text-sm text-muted">Railway Dev Levy (2%)</span>
                            <span className="text-sm text-platinum">
                                {formatPrice(rdl, currency)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <span className="text-sm text-gold tracking-wider uppercase">
                                Landed Cost
                            </span>
                            <span className="text-xl text-gold font-medium">
                                {formatPrice(landedCost, currency)}
                            </span>
                        </div>
                        <p className="text-[10px] text-muted/50 leading-relaxed">
                            *Estimated breakdown based on current KRA rates. Actual costs may vary depending on vehicle age and engine capacity.
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
