'use client';
import React from 'react';
import { cn } from "../lib/utils"; // FIX: Using reliable relative path

// FIX: Changed to 'export default function'
export default function ParallaxBackground() {
  return <div className={cn("absolute inset-0 -z-10 bg-gray-900", "opacity-50")} aria-hidden="true" />;
}