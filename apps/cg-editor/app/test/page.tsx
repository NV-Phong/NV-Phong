"use client";

import React, { useEffect, useState } from "react";

type ContributionDay = {
   date: string;
   contributionCount: number;
   color: string;
};

type Week = {
   contributionDays: ContributionDay[];
};

type ContributionsData = {
   data?: {
      user?: {
         contributionsCollection?: {
            contributionCalendar?: {
               totalContributions: number;
               weeks: Week[];
            };
         };
      };
   };
   error?: string;
   errors?: unknown;
   detail?: string;
};

export default function Test() {
   const [result, setResult] = useState<ContributionsData | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("/api/github-contributions")
         .then((res) => res.json())
         .then((data: ContributionsData) => setResult(data))
         .catch((err) =>
            setResult({ error: "Fetch failed", detail: String(err) }),
         )
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return (
         <div className="p-6">
            <p>Đang tải...</p>
         </div>
      );
   }

   if (!result) {
      return (
         <div className="p-6">
            <p>Không có dữ liệu.</p>
         </div>
      );
   }

   if (result.error) {
      return (
         <div className="p-6">
            <h2 className="text-lg font-semibold text-red-600">Lỗi</h2>
            <p>{result.error}</p>
            {result.detail && (
               <pre className="mt-2 text-sm text-gray-600">{result.detail}</pre>
            )}
            {result.errors != null && (
               <pre className="mt-2 text-sm text-gray-600">
                  {JSON.stringify(result.errors, null, 2)}
               </pre>
            )}
         </div>
      );
   }

   const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;
   if (!calendar) {
      return (
         <div className="p-6">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
         </div>
      );
   }

   const { totalContributions, weeks } = calendar;

   return (
      <div className="p-6 max-w-4xl">
         <h1 className="text-xl font-bold mb-4">
            GitHub Contributions – NV-Phong
         </h1>
         <p className="mb-4">
            <strong>Tổng contributions:</strong> {totalContributions}
         </p>

         <h2 className="text-lg font-semibold mb-2">Kết quả API (raw)</h2>
         <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm mb-6">
            {JSON.stringify(result, null, 2)}
         </pre>

         <h2 className="text-lg font-semibold mb-2">
            Lịch contributions (weeks)
         </h2>
         <div className="space-y-2">
            {weeks.map((week, i) => (
               <div key={i} className="flex flex-wrap gap-1">
                  {week.contributionDays.map((day) => (
                     <span
                        key={day.date}
                        className="inline-block w-4 h-4 rounded-sm"
                        style={{ backgroundColor: day.color }}
                        title={`${day.date}: ${day.contributionCount}`}
                     />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
