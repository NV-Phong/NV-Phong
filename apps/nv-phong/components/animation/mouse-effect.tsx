"use client";

import {
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
   type ReactNode,
   type MutableRefObject,
} from "react";
import gsap from "gsap";

type MouseEffectContextValue = {
   hide: boolean;
   setHide: (hide: boolean) => void;
   mouseDuration: number;
   setMouseDuration: (duration: number) => void;
   overridePositionRef: MutableRefObject<((e: MouseEvent) => { x: number; y: number } | null) | null>;
};

const MouseEffectContext = createContext<MouseEffectContextValue | null>(null);

function useMouseEffect() {
   const ctx = useContext(MouseEffectContext);
   if (!ctx) return null;
   return ctx;
}

function MouseEffectDot() {
   const dotRef = useRef<HTMLDivElement>(null);
   const ctx = useMouseEffect();

   useEffect(() => {
      const dot = dotRef.current;
      if (!dot || !ctx) return;

      gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 1 });

      const handleMouseMove = (e: MouseEvent) => {
         let targetX = e.clientX;
         let targetY = e.clientY;

         if (ctx.overridePositionRef.current) {
            const override = ctx.overridePositionRef.current(e);
            if (override) {
               targetX = override.x;
               targetY = override.y;
            }
         }

         gsap.to(dot, {
            x: targetX,
            y: targetY,
            duration: ctx.mouseDuration,
            ease: "power2.out",
            overwrite: "auto",
         });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
   }, [ctx]);

   useEffect(() => {
      const dot = dotRef.current;
      if (!dot || !ctx) return;
      gsap.to(dot, {
         scale: ctx.hide ? 0 : 1,
         duration: 0.25,
         ease: "power2.out",
      });
   }, [ctx?.hide]);

   if (!ctx) return null;

   return (
      <div
         ref={dotRef}
         className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full bg-primary"
         style={{ willChange: "transform" }}
         aria-hidden
      />
   );
}

export function MouseEffectProvider({
   children,
   mouseDuration = 0.6,
}: {
   children: ReactNode;
   mouseDuration?: number;
}) {
   const [hide, setHide] = useState(false);
   const [duration, setMouseDuration] = useState(mouseDuration);
   const overridePositionRef = useRef<((e: MouseEvent) => { x: number; y: number } | null) | null>(null);

   return (
      <MouseEffectContext.Provider value={{ hide, setHide, mouseDuration: duration, setMouseDuration, overridePositionRef }}>
         {children}
         <MouseEffectDot />
      </MouseEffectContext.Provider>
   );
}

export function MouseEffectDisableWrapper({
   children,
   className,
}: {
   children: ReactNode;
   className?: string;
}) {
   const ctx = useMouseEffect();
   if (!ctx) return <>{children}</>;
   return (
      <div
         className={className}
         onMouseEnter={() => ctx.setHide(true)}
         onMouseLeave={() => ctx.setHide(false)}
      >
         {children}
      </div>
   );
}

export function MouseEffectSizeWrapper({
   children,
   className,
   size = 16,
   duration = 0.3,
   mouseDuration,
   sizeFill = false,
   dotClassName,
}: {
   children: ReactNode;
   className?: string;
   size?: number;
   duration?: number;
   mouseDuration?: number;
   sizeFill?: boolean;
   dotClassName?: string;
}) {
   const dotRef = useRef<HTMLDivElement | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);
   const ctx = useMouseEffect();

   useEffect(() => {
      const dot = document.querySelector(
         ".pointer-events-none.fixed.z-\\[9999\\]",
      ) as HTMLDivElement;
      if (dot) {
         dotRef.current = dot;
      }
   }, []);

   useEffect(() => {
      if (mouseDuration !== undefined && ctx) {
         ctx.setMouseDuration(mouseDuration);
      }
   }, [mouseDuration, ctx]);

   const handleMouseEnter = () => {
      if (dotRef.current) {
         let targetWidth = size;
         let targetHeight = size;
         let targetRadius = "9999px";

         if (sizeFill && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            targetWidth = rect.width;
            targetHeight = rect.height;

            let el = containerRef.current as HTMLElement;
            while (el.children.length === 1) {
               el = el.children[0] as HTMLElement;
            }
            const style = window.getComputedStyle(el);
            if (style.borderRadius) {
               targetRadius = style.borderRadius;
            }
         }

         const vars: gsap.TweenVars = {
            width: targetWidth,
            height: targetHeight,
            borderRadius: targetRadius,
            duration: duration,
            ease: "power2.out",
            overwrite: "auto",
         };

         if (dotClassName) {
            dotRef.current.classList.remove("bg-primary");
            dotRef.current.classList.add(...dotClassName.split(" ").filter(Boolean));
         }

         gsap.to(dotRef.current, vars);
      }
   };

   const handleMouseLeave = () => {
      if (dotRef.current) {
         if (dotClassName) {
            dotRef.current.classList.remove(...dotClassName.split(" ").filter(Boolean));
            dotRef.current.classList.add("bg-primary");
         }

         gsap.to(dotRef.current, {
            width: 40,
            height: 40,
            borderRadius: "9999px",
            backgroundColor: "",
            duration: duration,
            ease: "power2.out",
            overwrite: "auto",
         });
      }
   };

   return (
      <div
         ref={containerRef}
         className={className}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         {children}
      </div>
   );
}

export function MouseEffectMagnetic({
   children,
   className,
   intensity = 0.5,
   duration = 1,
   syncDot = true,
}: {
   children: ReactNode;
   className?: string;
   intensity?: number;
   duration?: number;
   syncDot?: boolean;
}) {
   const containerRef = useRef<HTMLDivElement>(null);
   const magneticRef = useRef<HTMLDivElement>(null);
   const ctx = useMouseEffect();

   useEffect(() => {
      const container = containerRef.current;
      const magneticElement = magneticRef.current;
      if (!container || !magneticElement) return;

      const xTo = gsap.quickTo(magneticElement, "x", { duration, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(magneticElement, "y", { duration, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e: MouseEvent) => {
         const { clientX, clientY } = e;
         const { height, width, left, top } = container.getBoundingClientRect();
         const centerX = left + width / 2;
         const centerY = top + height / 2;
         const x = (clientX - centerX) * intensity;
         const y = (clientY - centerY) * intensity;
         xTo(x);
         yTo(y);
      };

      const handleMouseEnter = () => {
         if (syncDot && ctx && ctx.overridePositionRef) {
            ctx.overridePositionRef.current = (e: MouseEvent) => {
               const { clientX, clientY } = e;
               const { height, width, left, top } = container.getBoundingClientRect();
               const centerX = left + width / 2;
               const centerY = top + height / 2;
               const x = (clientX - centerX) * intensity;
               const y = (clientY - centerY) * intensity;
               return { x: centerX + x, y: centerY + y };
            };
         }
      };

      const handleMouseLeave = () => {
         xTo(0);
         yTo(0);
         if (syncDot && ctx && ctx.overridePositionRef) {
            ctx.overridePositionRef.current = null;
         }
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
         container.removeEventListener("mousemove", handleMouseMove);
         container.removeEventListener("mouseenter", handleMouseEnter);
         container.removeEventListener("mouseleave", handleMouseLeave);
      };
   }, [intensity, duration, syncDot, ctx]);

   return (
      <div
         ref={containerRef}
         className={`relative z-[10000] ${className || ""}`}
         style={{ display: "inline-block" }}
      >
         <div ref={magneticRef} style={{ display: "inline-block" }}>
            {children}
         </div>
      </div>
   );
}
