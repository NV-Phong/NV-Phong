"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { CreateWorkspacePopover } from "@/components/form/create-workspace";
import { Toast } from "@/components/v0/custom-toast";
import { useToast } from "@/contexts/toast-context";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Tabs } from "@/components/ui/vercel-tabs";
import type { Tab } from "@/contexts/header-context";

interface SiteHeaderProps {
   title?: string;
   showSidebar?: boolean;
   showNewWorkspace?: boolean;
   rightContent?: React.ReactNode;
   centerContent?: React.ReactNode;
   onWorkspaceCreated?: () => void;
   tabs?: Tab[];
   activeTab?: string;
   onTabChange?: (tabId: string) => void;
}

export function SiteHeader({
   title = "Workspace",
   showSidebar = true,
   showNewWorkspace = true,
   rightContent,
   centerContent,
   onWorkspaceCreated,
   tabs,
   activeTab,
   onTabChange,
}: SiteHeaderProps) {
   const { state, showToast, handleSave, handleReset } = useToast();
   const { state: sidebarState } = useSidebar();
   const isCollapsed = sidebarState === "collapsed";

   // Debug: log để kiểm tra
   useEffect(() => {
      console.log(
         "Sidebar state:",
         sidebarState,
         "isCollapsed:",
         isCollapsed,
         "tabs:",
         tabs,
      );
   }, [sidebarState, isCollapsed, tabs]);

   return (
      <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b border-t rounded-t-xl bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
         <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            {showSidebar && (
               <>
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                     orientation="vertical"
                     className="mx-2 data-[orientation=vertical]:h-4"
                  />
               </>
            )}
            {isCollapsed && tabs && tabs.length > 0 ? (
               <div className="flex items-center">
                  <Tabs
                     tabs={tabs}
                     activeTab={activeTab}
                     onTabChange={onTabChange}
                  />
               </div>
            ) : (
               <h1 className="text-base font-medium">{title}</h1>
            )}

            <div className="flex-1 flex items-center justify-center">
               {centerContent ||
                  (showToast && (
                     <Toast
                        state={state}
                        onSave={handleSave}
                        onReset={handleReset}
                     />
                  ))}
            </div>

            <div className="flex items-center gap-2">
               <ThemeSwitcher />
               {rightContent ||
                  (showNewWorkspace && (
                     <CreateWorkspacePopover
                        onWorkspaceCreated={onWorkspaceCreated}
                     >
                        <Button variant="outline" size="sm">
                           New Library
                        </Button>
                     </CreateWorkspacePopover>
                  ))}
            </div>
         </div>
      </header>
   );
}
