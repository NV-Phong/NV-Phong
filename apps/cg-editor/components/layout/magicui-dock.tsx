"use client";

import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "./dock";
import { ModeToggle } from "./mode-toggle";
import Icon from "../ui/Icon";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
   navbar: [
      {
         href: "/",
         icon: () => <Icon styles="solid" name="home-03-solid-rounded" />,
         label: "Home",
      },
      {
         href: "/test",
         icon: () => (
            <Icon styles="solid" name="software-license-solid-rounded" />
         ),
         label: "API",
      },
   ],
};

export function MagicUIDock() {
   return (
      <div className="fixed bottom-3 right-3 z-50">
         <TooltipProvider>
            <Dock
               direction="bottom"
               iconDistance={0}
               className="bg-background/50"
            >
               {DATA.navbar.map((item) => (
                  <DockIcon key={item.label}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Link
                              href={item.href}
                              aria-label={item.label}
                              className={cn(
                                 buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                 }),
                                 "size-12 rounded-full",
                              )}
                           >
                              <item.icon />
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{item.label}</p>
                        </TooltipContent>
                     </Tooltip>
                  </DockIcon>
               ))}
               <DockIcon>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="size-12 flex items-center justify-center">
                           <ModeToggle buttonStyle="!bg-transparent border-none shadow-none" />
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Theme</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>
            </Dock>
         </TooltipProvider>
      </div>
   );
}
