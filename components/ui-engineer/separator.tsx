import React from "react";

type SeparatorProps = {
   children?: React.ReactNode;
   orientation?: "horizontal" | "vertical";
   showChildren?: boolean;
   verticalTextDirection?: "left" | "right";
};

export default function Separator({
   children = "Or Continue With",
   orientation = "horizontal",
   showChildren = true,
   verticalTextDirection = "right",
}: SeparatorProps) {
   if (orientation === "vertical") {
      return (
         <div className="relative h-full flex justify-center">
            <div className="absolute inset-0 flex justify-center">
               <span className="h-full border-l" />
            </div>
            {showChildren && (
               <div className="relative flex items-center text-xs uppercase">
                  <span
                     className={`bg-card text-primary-foreground-darker/75 px-2 whitespace-nowrap ${
                        verticalTextDirection === "left"
                           ? "-rotate-90"
                           : "rotate-90"
                     }`}
                  >
                     {children}
                  </span>
               </div>
            )}
         </div>
      );
   }

   return (
      <div className="relative">
         <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
         </div>
         {showChildren && (
            <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-card text-primary-foreground-darker/75 px-2">
                  {children}
               </span>
            </div>
         )}
      </div>
   );
}
