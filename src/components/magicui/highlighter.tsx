"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  action?: "highlight" | "underline";
  className?: string;
}

export function Highlighter({ children, color = "#87CEFA", action = "highlight", className }: HighlighterProps) {
  if (action === "underline") {
    return (
      <span className={cn("relative inline-block", className)}>
        {children}
        <span className="absolute bottom-0 left-0 h-[2px] w-full animate-[grow_0.6s_ease-out_forwards]" style={{ background: color }} />
        <style jsx>{`@keyframes grow { from { width: 0 } to { width: 100% } }`}</style>
      </span>
    );
  }
  return (
    <span
      className={cn("relative inline px-1 py-0.5 rounded-sm", className)}
      style={{ background: `${color}40`, borderBottom: `2px solid ${color}` }}
    >
      {children}
    </span>
  );
}
