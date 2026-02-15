import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={{ "--spread": "90deg", "--shimmer-color": shimmerColor, "--radius": borderRadius, "--speed": shimmerDuration, "--cut": shimmerSize, "--bg": background } as React.CSSProperties}
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 [background:var(--bg)] [border-radius:var(--radius)] text-white transition-all hover:scale-105",
        "before:absolute before:inset-0 before:overflow-hidden before:[border-radius:var(--radius)]",
        "after:absolute after:inset-0 after:rounded-full after:animate-spin-around after:[background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] after:[container-type:size] after:[inset:var(--cut)]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-[1px] z-[-1] overflow-hidden rounded-[inherit] [background:var(--bg)]">
        <div className="absolute inset-[-100%] w-[300%] animate-shimmer-slide [aspect-ratio:1] [background:linear-gradient(to_right,transparent_30%,var(--shimmer-color)10_50%,transparent_70%)] [container-type:inline-size]" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
