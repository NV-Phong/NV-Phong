"use client";

import { SiteHeader } from "./site-header";
import { useHeader } from "@/contexts/header-context";

export function SiteHeaderWrapper() {
   const { config } = useHeader();

   return (
      <SiteHeader
         title={config.title}
         showSidebar={config.showSidebar}
         showNewWorkspace={config.showNewWorkspace}
         rightContent={config.rightContent}
         centerContent={config.centerContent}
         onWorkspaceCreated={config.onWorkspaceCreated}
         tabs={config.tabs}
         activeTab={config.activeTab}
         onTabChange={config.onTabChange}
      />
   );
}
