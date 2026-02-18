import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: "KES" | "USD"): string {
  if (currency === "KES") {
    return `KES ${amount.toLocaleString("en-KE")}`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

export function calculateMonthlyPayment(
  totalPrice: number,
  depositPercent: number,
  interestRate: number = 0.13,
  termMonths: number = 60
): number {
  const loanAmount = totalPrice * (1 - depositPercent / 100);
  const monthlyRate = interestRate / 12;
  const payment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  return Math.round(payment);
}
