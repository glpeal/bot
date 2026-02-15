"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({ className, reverse, pauseOnHover = false, vertical = false, repeat = 4, children, ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)]", vertical ? "flex-col" : "flex-row", className)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around gap-[var(--gap)] [--gap:1rem]", vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row", pauseOnHover && "group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
