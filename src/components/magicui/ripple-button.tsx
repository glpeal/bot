"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
}

export function RippleButton({ children, className, rippleColor = "#fff", onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
    onClick?.(e);
  };

  return (
    <button
      className={cn(
        "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-[ripple_0.8s_ease-out] rounded-full"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            background: rippleColor,
            opacity: 0.3,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          from { transform: scale(0); opacity: 0.4; }
          to { transform: scale(4); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
