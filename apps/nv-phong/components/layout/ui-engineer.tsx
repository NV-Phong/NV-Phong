import React, { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface UIEngineerProps {
   children?: ReactNode;
   className?: string;
}

export default function UIEngineer({
   children,
   className = "bg-background",
}: UIEngineerProps) {
   return (
      <div className="bg-card">
         <ScrollArea
            className="p-3 h-screen rounded-xl"
            scrollBarClassName="w-0"
         >
            <div className={className}>{children}</div>
         </ScrollArea>
      </div>
   );
}
