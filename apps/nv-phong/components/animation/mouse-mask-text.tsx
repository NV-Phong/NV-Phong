"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface MouseMaskTextProps {
   baseText: ReactNode;
   maskText: ReactNode;
   className?: string;
   maskRadius?: number;
   initialMaskRadius?: number;
   smoothEdge?: boolean;
   mouseDuration?: number;
   sizeDuration?: number;
}

export function MouseMaskText({
   baseText,
   maskText,
   className,
   maskRadius = 150,
   initialMaskRadius = 20,
   smoothEdge = false,
   mouseDuration = 0,
   sizeDuration = 0.5,
}: MouseMaskTextProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const maskLayerRef = useRef<HTMLDivElement>(null);
   const [isHovered, setIsHovered] = useState(false);
   const mousePos = useRef({ x: -1000, y: -1000 });
   const maskState = useRef({ radius: initialMaskRadius });

   // Sử dụng ref để tránh stale closure trong các sự kiện global
   const currentProps = useRef({ smoothEdge, maskRadius, initialMaskRadius, sizeDuration });
   currentProps.current = { smoothEdge, maskRadius, initialMaskRadius, sizeDuration };

   const updateMaskStr = (x: number, y: number) => {
      if (!maskLayerRef.current) return;
      const r = maskState.current.radius;
      const edge = currentProps.current.smoothEdge ? "0%" : "100%";
      const maskStr = `radial-gradient(circle ${r}px at ${x}px ${y}px, black ${edge}, transparent 100%)`;
      maskLayerRef.current.style.webkitMaskImage = maskStr;
      maskLayerRef.current.style.maskImage = maskStr;
   };

   // Initialization
   useEffect(() => {
      updateMaskStr(mousePos.current.x, mousePos.current.y);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [maskRadius, smoothEdge]);

   // Sync zoom animation
   useEffect(() => {
      gsap.to(maskState.current, {
         radius: isHovered ? currentProps.current.maskRadius : currentProps.current.initialMaskRadius,
         duration: currentProps.current.sizeDuration,
         ease: "power2.out",
         overwrite: "auto",
         onUpdate: () => {
            updateMaskStr(mousePos.current.x, mousePos.current.y);
         },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isHovered]);

   // Sync move perfectly with the global window mouse event
   useEffect(() => {
      const handleGlobalMouseMove = (e: MouseEvent) => {
         if (!containerRef.current) return;
         const rect = containerRef.current.getBoundingClientRect();
         const targetX = e.clientX - rect.left;
         const targetY = e.clientY - rect.top;

         // For first rendering pass
         if (mousePos.current.x === -1000) {
            mousePos.current.x = targetX;
            mousePos.current.y = targetY;
         }

         if (mouseDuration > 0) {
            gsap.to(mousePos.current, {
               x: targetX,
               y: targetY,
               duration: mouseDuration,
               ease: "power2.out",
               overwrite: "auto",
               onUpdate: () => {
                  updateMaskStr(mousePos.current.x, mousePos.current.y);
               },
            });
         } else {
            mousePos.current.x = targetX;
            mousePos.current.y = targetY;
            updateMaskStr(targetX, targetY);
         }
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      return () => {
         window.removeEventListener("mousemove", handleGlobalMouseMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [mouseDuration]);

   return (
      <div
         ref={containerRef}
         className={cn("relative", className)}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Lớp text hiển thị mặc định (Base text) */}
         <div className="w-full">{baseText}</div>

         {/* Lớp text được mask bởi chuột (Mask text) */}
         <div
            ref={maskLayerRef}
            className="absolute left-0 top-0 w-full h-full text-background z-[10000] transition-opacity duration-300 pointer-events-none"
            style={{
               opacity: isHovered ? 1 : 0,
            }}
         >
            {maskText}
         </div>
      </div>
   );
}
