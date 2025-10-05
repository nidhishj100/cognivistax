import { clsx, type ClassValue } from "clsx" 
import { twMerge } from "tailwind-merge"

// This function safely merges Tailwind CSS classes, resolving conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}