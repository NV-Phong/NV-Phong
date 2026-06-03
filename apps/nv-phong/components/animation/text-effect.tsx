"use client";

import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textLineClassName =
   "group tracking-[-0.01em] leading-[100%] m-0 w-full text-muted-foreground/20 bg-gradient-to-r from-foreground to-foreground bg-no-repeat bg-clip-text bg-[length:0%] [transition:background-size_0.5s_cubic-bezier(0.1,0.5,0.5,1)] border-b border-border flex flex-col items-start justify-center relative";

const overlayClassName =
   "absolute w-full h-full [clip-path:polygon(0_50%,100%_50%,100%_50%,0_50%)] origin-center transition-all duration-[0.4s] [transition-timing-function:cubic-bezier(0.1,0.5,0.5,1)] flex flex-col justify-center group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]";

const linkClassName = "no-underline text-inherit";

export interface TextEffectItemProps {
   children: ReactNode;
   overlay?: ReactNode;
   className?: string;
   overlayClassName?: string;
}

export function TextEffectItem({ children, overlay, className, overlayClassName: customOverlay }: TextEffectItemProps) {
   return (
      <h1 data-text-effect className={`${textLineClassName}${className ? ` ${className}` : ""}`}>
         {children}
         <span className={`${overlayClassName}${customOverlay ? ` ${customOverlay}` : ""}`}>{overlay ?? children}</span>
      </h1>
   );
}

export interface TextEffectRootProps {
   children: ReactNode;
   className?: string;
}

export function TextEffectRoot({ children, className }: TextEffectRootProps) {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const textElements = gsap.utils.toArray<HTMLElement>(
         container.querySelectorAll("[data-text-effect]"),
      );

      const ctx = gsap.context(() => {
         textElements.forEach((text) => {
            gsap.to(text, {
               backgroundSize: "100%",
               ease: "none",
               scrollTrigger: {
                  trigger: text,
                  start: "center 80%",
                  end: "center 20%",
                  scrub: true,
               },
            });
         });
      }, container);

      return () => ctx.revert();
   }, []);

   return (
      <div
         ref={containerRef}
         className={className ?? "flex flex-col justify-center items-start"}
      >
         {children}
      </div>
   );
}

function TextEffect({
   children,
   overlay,
   className,
}: TextEffectItemProps & { className?: string }) {
   return (
      <TextEffectRoot className={className}>
         <TextEffectItem overlay={overlay}>{children}</TextEffectItem>
      </TextEffectRoot>
   );
}

export function TextEffectLink({
   className,
   ...props
}: ComponentProps<typeof Link>) {
   return <Link className={className ?? linkClassName} {...props} />;
}

export { linkClassName as textEffectLinkClassName };

const TextEffectWithCompound = Object.assign(TextEffect, {
   Root: TextEffectRoot,
   Item: TextEffectItem,
   Link: TextEffectLink,
   linkClassName,
});
export default TextEffectWithCompound;
