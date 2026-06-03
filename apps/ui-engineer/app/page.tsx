"use client";

import { useEffect } from "react";
import { ChartAreaInteractive } from "@/components/features/dashboard/chart-area-interactive";
import { DataTable } from "@/components/features/dashboard/data-table";
import { SectionCards } from "@/components/features/dashboard/section-cards";
import { useHeader } from "@/contexts/header-context";

import data from "@/data/data.json";

export default function Home() {
   const { setConfig } = useHeader();

   useEffect(() => {
      setConfig({
         title: "Overview",
         showNewWorkspace: true,
         tabs: [
            { id: "overview", label: "Overview" },
            { id: "projects", label: "Projects" },
            { id: "analytics", label: "Analytics" },
            { id: "documents", label: "Documents" },
            { id: "settings", label: "Settings" },
         ],
         activeTab: "overview",
         onTabChange: (tabId) => {
            console.log("Tab changed:", tabId);
         },
      });
   }, [setConfig]);

   return (
      <div className="@container/main flex flex-1 flex-col gap-2">
         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
               <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
         </div>
      </div>
   );
}
