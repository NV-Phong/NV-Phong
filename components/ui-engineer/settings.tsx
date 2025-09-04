import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { createPortal } from "react-dom";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import Separator from "./separator";
import { Font } from "./font";
import { Badge } from "../ui/badge";
import Icon from "./Icon";

export function Settings() {
   const [open, setOpen] = React.useState(false);

   return (
      <>
         {open &&
            createPortal(
               <div
                  className="fixed inset-0 backdrop-blur-[10px] z-[49]"
                  onClick={() => setOpen(false)}
                  style={{
                     position: "fixed",
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                  }}
               />,
               document.body
            )}
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button variant={"ghost"} className="border">
                  Setting
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
               <div className="grid gap-4">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <h4 className="leading-none font-medium uppercase">
                           Settings
                        </h4>
                        <Badge className="text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                           <Icon
                              size={15}
                              styles="bulk"
                              className="!bg-primary-foreground-darker"
                              name="start-up"
                           />
                           Coming Soon
                        </Badge>
                     </div>
                     <p className="text-muted-foreground text-sm">
                        Set the dimensions for the layer.
                     </p>
                  </div>
                  <div className="grid gap-2">
                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                           id="width"
                           defaultValue="100%"
                           className="col-span-2 h-8 border border-primary/30"
                        />
                     </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input
                           id="height"
                           defaultValue="25px"
                           className="col-span-2 h-8 border border-primary/30"
                        />
                     </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Font</Label>
                        <div className="col-span-2">
                           <Font />
                        </div>
                     </div>
                     <Separator>Chaos Magic</Separator>
                     <div className="flex items-center justify-center gap-4">
                        <ToggleGroup variant="outline" type="multiple">
                           <ToggleGroupItem
                              value="bold"
                              aria-label="Toggle bold"
                              className="border border-primary/50"
                           >
                              <Bold className="h-4 w-4" />
                           </ToggleGroupItem>
                           <ToggleGroupItem
                              value="italic"
                              aria-label="Toggle italic"
                              className="border border-primary/50"
                           >
                              <Italic className="h-4 w-4" />
                           </ToggleGroupItem>
                           <ToggleGroupItem
                              value="strikethrough"
                              aria-label="Toggle strikethrough"
                              className="border border-primary/50"
                           >
                              <Underline className="h-4 w-4" />
                           </ToggleGroupItem>
                        </ToggleGroup>
                     </div>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </>
   );
}
