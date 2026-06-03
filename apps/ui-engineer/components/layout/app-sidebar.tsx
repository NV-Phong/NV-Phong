"use client";

import * as React from "react";
import Link from "next/link";
// import { NavMenu } from "@/components/navigation/nav-menu";
import { NavPlatformProjects } from "@/components/navigation/nav-platform-projects";
import { NavUser } from "@/components/navigation/nav-user";
import Logo from "@/components/common/logo";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarSeparator,
} from "@/components/ui/sidebar";
import { LibrarySwitcher } from "@/components/features/library/library-switcher";
import {
   Users,
   Code,
   Server,
   Smartphone,
   Palette,
   Database,
   Layout,
   Settings,
   AppWindow,
   Monitor,
   Globe,
   Zap,
   SquareTerminal,
   Bot,
   BookOpen,
   Settings2,
   Frame,
   PieChart,
   Map,
   Sparkles,
} from "lucide-react";
import { useGetLibraries } from "@/hooks/library/use-get-libraries";

const data = {
   user: {
      name: "NV-Phong",
      email: "ui.engineer.workspace@gmail.com",
      avatar: "/logo.svg",
   },
   platformItems: [
      {
         title: "Component",
         url: "/component",
         icon: Layout,
         isActive: true,
         items: [
            {
               title: "Layout",
               url: "/component/layout",
            },
            {
               title: "Starred",
               url: "/component/starred",
            },
            {
               title: "Settings",
               url: "/component/settings",
            },
         ],
      },
      {
         title: "Themes",
         url: "/documentation",
         icon: BookOpen,
         items: [
            {
               title: "Introduction",
               url: "/documentation/introduction",
            },
            {
               title: "Get Started",
               url: "/documentation/get-started",
            },
            {
               title: "Tutorials",
               url: "/documentation/tutorials",
            },
            {
               title: "Changelog",
               url: "/documentation/changelog",
            },
         ],
      },
      {
         title: "Design Token",
         url: "/settings",
         icon: Settings2,
         items: [
            {
               title: "General",
               url: "/settings/general",
            },
            {
               title: "Billing",
               url: "/settings/billing",
            },
            {
               title: "Limits",
               url: "/settings/limits",
            },
         ],
      },
   ],
   projects: [
      {
         name: "Noise & Texture",
         url: "/projects/noise-and-texture",
         icon: Frame,
      },
      {
         name: "Graphics",
         url: "/projects/graphics",
         icon: PieChart,
      },
      {
         name: "Icons",
         url: "/projects/icons",
         icon: Sparkles,
      },
   ],
   navMain: [
      {
         title: "Space Engineer",
         url: "/",
         icon: "saturn-02-solid-sharp",
      },
      {
         title: "Lifecycle",
         url: "#",
         icon: "analytics-up-solid-rounded",
      },
      {
         title: "Projects",
         url: "#",
         icon: "ai-browser-solid-rounded",
      },
   ],
   navClouds: [
      {
         title: "Capture",
         icon: "camera",
         isActive: true,
         url: "#",
         items: [
            {
               title: "Active Proposals",
               url: "#",
            },
            {
               title: "Archived",
               url: "#",
            },
         ],
      },
      {
         title: "Proposal",
         icon: "file-description",
         url: "#",
         items: [
            {
               title: "Active Proposals",
               url: "#",
            },
            {
               title: "Archived",
               url: "#",
            },
         ],
      },
      {
         title: "Prompts",
         icon: "file-ai",
         url: "#",
         items: [
            {
               title: "Active Proposals",
               url: "#",
            },
            {
               title: "Archived",
               url: "#",
            },
         ],
      },
   ],
   navSecondary: [
      {
         title: "Settings",
         url: "/themes/color-visualizer",
         icon: "setting-06-solid-rounded",
      },
   ],
   documents: [
      {
         name: "Project",
         url: "/task-manager",
         icon: "ai-innovation-01-solid-rounded",
      },
      {
         name: "Reports",
         url: "#",
         icon: "apple-stocks-solid-rounded",
      },
      {
         name: "Chats",
         url: "#",
         icon: "bubble-chat-solid-rounded",
      },
      {
         name: "Word Assistant",
         url: "#",
         icon: "ai-scan-solid-rounded",
      },
   ],
};

// Mảng các icon có sẵn để gán cho libraries
const LIBRARY_ICONS: React.ElementType[] = [
   Code, // Code/Component library
   Layout, // UI library
   Palette, // Design library
   SquareTerminal, // Terminal/CLI library
   Frame, // Frame/Component library
   Zap, // Performance library
   AppWindow, // App library
   Settings, // Config library
   Database, // Data library
   Globe, // Web library
   Monitor, // Display library
   Users, // Default fallback
];

// Hàm để gán icon dựa trên tên library hoặc index
const getLibraryIcon = (
   libraryName: string,
   index: number,
): React.ElementType => {
   const name = libraryName.toLowerCase();

   // Gán icon dựa trên tên library
   if (name.includes("shadcn") || name.includes("shad")) {
      return Code;
   }
   if (name.includes("magic")) {
      return Zap;
   }
   if (name.includes("smooth")) {
      return Layout;
   }
   if (name.includes("aceternity")) {
      return Zap; // Animation-focused library
   }
   if (name.includes("badtz")) {
      return Palette; // Creative/playful library
   }
   if (name.includes("ui") || name.includes("component")) {
      return Frame;
   }
   if (name.includes("design") || name.includes("style")) {
      return Palette;
   }

   // Nếu không khớp, sử dụng icon dựa trên index (luân phiên)
   return LIBRARY_ICONS[index % LIBRARY_ICONS.length];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { libraries, refetch } = useGetLibraries(); // Get refetch from useGetLibraries

   const formattedLibraries = libraries.map((library, index) => ({
      name: library.LibraryName,
      logo: getLibraryIcon(library.LibraryName, index),
      description: library.LibraryDescription,
      idlibrary: library.IDLibrary,
      url: library.LibraryUrl,
   }));

   return (
      <Sidebar collapsible="offcanvas" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton
                     asChild
                     className="data-[slot=sidebar-menu-button]:!p-1.5 justify-center"
                  >
                     <Link
                        href="/"
                        className="flex items-center justify-center gap-2"
                     >
                        <Logo width={25} height={25} color="var(--primary)" />
                        <span className="text-base font-semibold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                           UI Engineer
                        </span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <LibrarySwitcher
               libraries={formattedLibraries}
               refetch={refetch} // Pass refetch to LibrarySwitcher
            />
         </SidebarHeader>
         <SidebarContent>
            {/* <NavMenu 
               navMain={data.navMain}
               documents={data.documents}
               navSecondary={data.navSecondary}
            /> */}
            <NavPlatformProjects
               platformItems={data.platformItems}
               projects={data.projects}
            />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
      </Sidebar>
   );
}
