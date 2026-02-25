import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMb(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function getErrorMessage(err: unknown, fallback = "Tente novamente mais tarde."): string {
  if (err instanceof Error) return err.message;
  const data = err && typeof err === "object" && "response" in err
    ? (err as { response?: { data?: { message?: string } } }).response?.data
    : undefined;
  return data?.message ?? fallback;
}
