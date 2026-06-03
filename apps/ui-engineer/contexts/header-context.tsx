"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Tab {
   id: string;
   label: string;
}

interface HeaderConfig {
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

interface HeaderContextType {
   config: HeaderConfig;
   setConfig: (config: HeaderConfig) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
   const [config, setConfig] = useState<HeaderConfig>({
      title: "Overview",
      showSidebar: true,
      showNewWorkspace: true,
   });

   return (
      <HeaderContext.Provider value={{ config, setConfig }}>
         {children}
      </HeaderContext.Provider>
   );
}

export function useHeader() {
   const context = useContext(HeaderContext);
   if (context === undefined) {
      throw new Error("useHeader must be used within a HeaderProvider");
   }
   return context;
}
