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
import {
   Download,
   Share2,
   Trash2,
   ZoomIn,
} from "lucide-react";
import Separator from "./separator";
import { Font } from "./font";
import { Badge } from "../ui/badge";
import Icon from "./Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
                  Settings
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
                        <Label htmlFor="name">Name</Label>
                        <Input
                           className="col-span-2 h-8 border border-primary/30"
                           defaultValue={"Anonymous"}
                           placeholder="Type your name"
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
                     <Separator>Quick Action</Separator>
                     <div className="flex items-center justify-center">
                        <ToggleGroup variant="outline" type="multiple">
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="download"
                                    aria-label="Download image"
                                    className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <Download className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Download
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="zoom"
                                    aria-label="Zoom image"
                                    className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <ZoomIn className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Zoom
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="share"
                                    aria-label="Share image"
                                    className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <Share2 className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Copy Link
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="delete"
                                    aria-label="Delete image"
                                    className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <Trash2 className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Delete
                              </TooltipContent>
                           </Tooltip>
                        </ToggleGroup>
                     </div>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </>
   );
}
