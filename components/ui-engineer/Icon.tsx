import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
   name: string;
   styles?: string;
   size?: number;
   color?: string;
}

export const Icon = ({
   name,
   styles,
   size = 20,
   color = "var(--icon)",
   className,
   ...props
}: IconProps) => {
   const iconPath = styles
      ? `/icons/${styles}/${name}.svg`
      : `/icons/${name}.svg`;

   return (
      <div
         className={cn("flex items-center justify-center", className)}
         style={{
            width: size,
            height: size,
            maskImage: `url(${iconPath})`,
            WebkitMaskImage: `url(${iconPath})`,
            backgroundColor: color,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
         }}
         {...props}
      />
   );
};

export default Icon;
