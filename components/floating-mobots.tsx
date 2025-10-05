'use client';
import React from 'react';
import { cn } from "../lib/utils"; // FIX: Using reliable relative path

// FIX: Changed to 'export default function'
export default function FloatingMobots() {
  return <div className={cn("absolute inset-0 pointer-events-none", "opacity-50 blur-sm")} aria-hidden="true" />;
}