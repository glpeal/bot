"use client";
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({ children, className, gradientSize = 200, gradientColor = "#262626", gradientOpacity = 0.8, ...props }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -gradientSize, y: -gradientSize });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl border bg-card", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: -gradientSize, y: -gradientSize }); }}
      {...props}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor}, transparent 65%)`,
          opacity: isHovered ? gradientOpacity : 0,
        }}
      />
    </div>
  );
}
