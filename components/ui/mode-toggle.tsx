"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuSub,
   DropdownMenuSubTrigger,
   DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import Icon from "../ui-engineer/Icon";

interface ModeToggleProps {
   buttonStyle?: string;
}

export function ModeToggle({ buttonStyle }: ModeToggleProps) {
   const { setTheme, theme } = useTheme();

   const renderPastel = (label: string, value: string, colorClass: string) => (
      <DropdownMenuItem onClick={() => setTheme(value)}>
         <span className={`mr-2 h-3 w-3 rounded-full ${colorClass}`} />
         {label}
         {theme === value && (
            <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />
         )}
      </DropdownMenuItem>
   );

   const renderDefault = (label: string, value: string) => (
      <DropdownMenuItem onClick={() => setTheme(value)}>
         {label}
         {theme === value && <Check className="ml-auto h-4 w-4 shrink-0" />}
      </DropdownMenuItem>
   );

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className={buttonStyle}>
               <Icon
                  styles="solid"
                  name="sun-02-solid-rounded"
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
               />
               <Icon
                  styles="solid"
                  name="moon-02-solid-rounded"
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
               />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end">
            {renderDefault("Light", "light")}
            {renderDefault("Dark", "dark")}
            {renderDefault("System", "system")}

            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Pastel</DropdownMenuSubTrigger>
               <DropdownMenuSubContent sideOffset={5}>
                  {renderPastel(
                     "Pink",
                     "pastel-pink",
                     "bg-[oklch(0.79_0.1226_20.19)]"
                  )}
                  {renderPastel(
                     "Green",
                     "pastel-green",
                     "bg-[oklch(0.83_0.1354_129.16)]"
                  )}
                  {renderPastel(
                     "Blue",
                     "pastel-blue",
                     "bg-[oklch(0.7437_0.1205_252.42)]"
                  )}
                  {renderPastel(
                     "Violet",
                     "pastel-violet",
                     "bg-[oklch(0.773_0.1514_308.03)]"
                  )}
               </DropdownMenuSubContent>
            </DropdownMenuSub>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
