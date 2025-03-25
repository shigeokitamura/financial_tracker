import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const CURRENCIES: readonly string[] = [
  "AUD",
  "CAD",
  "CNY",
  "EUR",
  "GBP",
  "HKD",
  "INR",
  "JPY",
  "KRW",
  "TWD",
  "USD",
] as const;

export function formatCurrency(amount: number, currency: string): string {
  if (["AUD", "CAD", "HKD", "TWD", "USD"].includes(currency)) {
    return `$${amount} ${currency}`
  }
  if (["CNY", "JPY"].includes(currency)) {
    return `¥${amount} ${currency}`
  }
  if (currency === "EUR") {
    return `€${amount} ${currency}`
  }
  if (currency == "GBP") {
    return `£${amount} ${currency}`
  }
  if (currency == "INR") {
    return `₹${amount} ${currency}`
  }
  if (currency == "KRW") {
    return `₩${amount} ${currency}`
  }

  return `${amount} ${currency}`
}
