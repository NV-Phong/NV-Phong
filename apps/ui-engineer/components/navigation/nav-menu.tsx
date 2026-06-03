"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { useNavigation } from "@/contexts/navigation-context";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
   title?: string;
   name?: string;
   url: string;
   icon: string;
}

interface NavMenuProps {
   navMain: NavItem[];
   documents: NavItem[];
   navSecondary: NavItem[];
}

export function NavMenu({ navMain, documents, navSecondary }: NavMenuProps) {
   const router = useRouter();
   const { isMobile } = useSidebar();
   const { activeItem, setActiveItem, activeSection, setActiveSection } =
      useNavigation();
   const [hoveredItem, setHoveredItem] = useState<string>("");

   const handleItemClick = (
      itemName: string,
      url: string,
      section: "main" | "documents" | "secondary",
   ) => {
      setActiveItem(itemName);
      setActiveSection(section);
      if (url !== "#") {
         router.push(url);
      }
   };

   const renderMenuItem = (
      item: NavItem,
      section: "main" | "documents" | "secondary",
      showDropdown: boolean = false,
   ) => {
      const itemName = item.title || item.name || "";
      const isActive = activeItem === itemName && activeSection === section;

      return (
         <SidebarMenuItem
            key={itemName}
            className="group relative my-1 overflow-hidden"
         >
            <SidebarMenuButton
               tooltip={itemName}
               onClick={() => handleItemClick(itemName, item.url, section)}
               onMouseEnter={() => setHoveredItem(itemName)}
               onMouseLeave={() => setHoveredItem("")}
               className={`relative w-full rounded-lg transition-all duration-300 ease-out 
            ${
               isActive
                  ? "bg-gradient-to-r from-primary/8 via-primary/5 to-transparent shadow-[0_2px_10px_-3px_rgba(var(--primary),0.3)] hover:shadow-[0_4px_12px_-3px_rgba(var(--primary),0.35)]"
                  : "hover:bg-muted/40"
            }
          `}
            >
               <div className="flex w-full items-center">
                  {/* Gradient border effect */}
                  <div
                     className={`absolute inset-0 rounded-lg transition-opacity duration-300
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
                  >
                     <div className="absolute inset-[1px] rounded-lg bg-background" />
                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/8 via-primary/5 to-transparent" />
                  </div>

                  {/* Indicator bar with gradient and glow */}
                  <div
                     className={`absolute left-0 top-0 h-full w-1 rounded-l-lg transition-all duration-300 
              ${
                 isActive
                    ? "bg-gradient-to-b from-primary via-primary/90 to-primary/70 shadow-[0_0_10px_rgba(var(--primary),0.4)]"
                    : "bg-transparent"
              }`}
                  />

                  {/* Shine effect */}
                  <div
                     className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full`}
                  />

                  {/* Content container */}
                  <div className="relative flex w-full items-center gap-3 px-4 py-2.5">
                     <div className="relative">
                        <Icon
                           name={item.icon}
                           size={20}
                           className={`transition-all duration-300
                    ${
                       isActive
                          ? "scale-110 transform"
                          : hoveredItem === itemName
                            ? "scale-105"
                            : ""
                    }`}
                           color={
                              isActive
                                 ? "var(--primary)"
                                 : "var(--muted-foreground)"
                           }
                        />
                     </div>
                     <span
                        className={`font-medium tracking-wide transition-all duration-300 
                ${
                   isActive
                      ? "text-primary translate-x-0.5"
                      : hoveredItem === itemName
                        ? "text-muted-foreground/90 translate-x-0.5"
                        : "text-muted-foreground"
                }`}
                     >
                        {itemName}
                     </span>
                  </div>
               </div>
            </SidebarMenuButton>
            {showDropdown && (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <SidebarMenuAction
                        showOnHover
                        className="data-[state=open]:bg-accent rounded-sm"
                     >
                        <Icon
                           name="dots"
                           size={20}
                           color="var(--muted-foreground)"
                        />
                        <span className="sr-only">More</span>
                     </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                     className="w-24 rounded-lg"
                     side={isMobile ? "bottom" : "right"}
                     align={isMobile ? "end" : "start"}
                  >
                     <DropdownMenuItem>
                        <Icon
                           name="folder"
                           size={20}
                           color="var(--muted-foreground)"
                        />
                        <span className="font-semibold text-muted-foreground">
                           Open
                        </span>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Icon
                           name="share"
                           size={20}
                           color="var(--muted-foreground)"
                        />
                        <span className="font-semibold text-muted-foreground">
                           Share
                        </span>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem variant="destructive">
                        <Icon
                           name="trash"
                           size={20}
                           color="var(--muted-foreground)"
                        />
                        <span className="font-semibold text-muted-foreground">
                           Delete
                        </span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )}
         </SidebarMenuItem>
      );
   };

   return (
      <>
         {/* Workspace Section */}
         <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted-foreground">
               Workspace
            </SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-3">
               <SidebarMenu className="relative">
                  <div className="absolute -left-4 -right-4 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-40" />
                  <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
               </SidebarMenu>
               <SidebarMenu>
                  {navMain.map((item) => renderMenuItem(item, "main"))}
               </SidebarMenu>
            </SidebarGroupContent>
         </SidebarGroup>

         {/* Task Manager Section */}
         <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="font-semibold text-muted-foreground">
               Task Manager
            </SidebarGroupLabel>
            <SidebarMenu>
               {documents.map((item) =>
                  renderMenuItem(item, "documents", true),
               )}
            </SidebarMenu>
         </SidebarGroup>

         {/* Settings Section */}
         <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted-foreground">
               Settings
            </SidebarGroupLabel>
            <SidebarMenu>
               {navSecondary.map((item) => renderMenuItem(item, "secondary"))}
            </SidebarMenu>
         </SidebarGroup>
      </>
   );
}
