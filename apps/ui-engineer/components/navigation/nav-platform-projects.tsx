"use client";

import {
   ChevronRight,
   MoreHorizontal,
   Folder,
   Forward,
   Trash2,
   type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   useSidebar,
} from "@/components/ui/sidebar";

interface PlatformItem {
   title: string;
   url: string;
   icon?: LucideIcon;
   isActive?: boolean;
   items?: {
      title: string;
      url: string;
   }[];
}

interface ProjectItem {
   name: string;
   url: string;
   icon: LucideIcon;
}

interface NavPlatformProjectsProps {
   platformItems: PlatformItem[];
   projects: ProjectItem[];
}

export function NavPlatformProjects({
   platformItems,
   projects,
}: NavPlatformProjectsProps) {
   const { isMobile } = useSidebar();
   const pathname = usePathname();

   return (
      <>
         {/* Platform Section */}
         <SidebarGroup>
            <SidebarGroupLabel>User Interface</SidebarGroupLabel>
            <SidebarMenu>
               {platformItems.map((item) => (
                  <Collapsible
                     key={item.title}
                     asChild
                     defaultOpen={!!item.items}
                     className="group/collapsible"
                  >
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           <SidebarMenuButton
                              tooltip={item.title}
                              className="group-data-[state=open]/collapsible:font-medium"
                           >
                              {item.icon && <item.icon />}
                              <span className="group-data-[state=open]/collapsible:font-medium">
                                 {item.title}
                              </span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                           </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <SidebarMenuSub>
                              {item.items?.map((subItem) => {
                                 const isActive =
                                    pathname === subItem.url ||
                                    (subItem.url !== "#" &&
                                       pathname?.startsWith(subItem.url));
                                 return (
                                    <SidebarMenuSubItem key={subItem.title}>
                                       <SidebarMenuSubButton
                                          asChild
                                          isActive={isActive}
                                          className={
                                             isActive
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                                : ""
                                          }
                                       >
                                          <Link href={subItem.url}>
                                             <span>{subItem.title}</span>
                                          </Link>
                                       </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                 );
                              })}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                     </SidebarMenuItem>
                  </Collapsible>
               ))}
            </SidebarMenu>
         </SidebarGroup>

         {/* Projects Section */}
         <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Assets</SidebarGroupLabel>
            <SidebarMenu>
               {projects.map((item) => (
                  <SidebarMenuItem key={item.name}>
                     <SidebarMenuButton asChild>
                        <Link href={item.url}>
                           <item.icon />
                           <span>{item.name}</span>
                        </Link>
                     </SidebarMenuButton>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuAction showOnHover>
                              <MoreHorizontal />
                              <span className="sr-only">More</span>
                           </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className="w-48 rounded-lg"
                           side={isMobile ? "bottom" : "right"}
                           align={isMobile ? "end" : "start"}
                        >
                           <DropdownMenuItem>
                              <Folder className="text-muted-foreground" />
                              <span>View Project</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                              <Forward className="text-muted-foreground" />
                              <span>Share Project</span>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem>
                              <Trash2 className="text-muted-foreground" />
                              <span>Delete Project</span>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarGroup>
      </>
   );
}
