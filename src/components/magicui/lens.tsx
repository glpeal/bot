"use client";
import React, { useRef, useState } from "react";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
}

export function Lens({ children, zoomFactor = 2, lensSize = 150, isStatic = false, ariaLabel }: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      aria-label={ariaLabel}
    >
      {children}
      {show && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-white/60 shadow-xl z-50 overflow-hidden"
          style={{
            width: lensSize,
            height: lensSize,
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: containerRef.current?.offsetWidth ?? 0,
              height: containerRef.current?.offsetHeight ?? 0,
              left: -(pos.x * zoomFactor - lensSize / 2),
              top: -(pos.y * zoomFactor - lensSize / 2),
              transform: `scale(${zoomFactor})`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
