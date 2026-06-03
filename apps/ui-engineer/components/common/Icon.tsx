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
   size = 24,
   color,
   className,
   ...props
}: IconProps) => {
   const iconPath = styles
      ? `/icons/${styles}/${name}.svg`
      : `/icons/${name}.svg`;

   // Nếu có color prop thì dùng, nếu không thì để className override
   const style = {
      width: size,
      height: size,
      maskImage: `url(${iconPath})`,
      WebkitMaskImage: `url(${iconPath})`,
      ...(color && { backgroundColor: color }),
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
   };

   return (
      <div
         className={cn("flex items-center justify-center", className)}
         style={style}
         {...props}
      />
   );
};

export default Icon;
