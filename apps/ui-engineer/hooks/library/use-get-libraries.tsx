"use client";

import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho library
interface Library {
   IDLibrary: string;
   LibraryName: string;
   LibraryDescription: string;
   LibraryUrl?: string;
   IsDeleted: number;
}

// Data cứng cho libraries
const MOCK_LIBRARIES: Library[] = [
   {
      IDLibrary: "lib-1",
      LibraryName: "Shadcn",
      LibraryDescription: "The Foundation for your Design System",
      LibraryUrl: "https://ui.shadcn.com/",
      IsDeleted: 0,
   },
   {
      IDLibrary: "lib-2",
      LibraryName: "Magic UI",
      LibraryDescription: "Beautiful UI components built with React",
      LibraryUrl: "https://magicui.design/",
      IsDeleted: 0,
   },
   {
      IDLibrary: "lib-3",
      LibraryName: "Smooth UI",
      LibraryDescription: "Smooth and elegant UI components library",
      LibraryUrl: "https://smoothui.dev/",
      IsDeleted: 0,
   },
   {
      IDLibrary: "lib-4",
      LibraryName: "Aceternity",
      LibraryDescription: "Modern UI components with stunning animations",
      LibraryUrl: "https://ui.aceternity.com/",
      IsDeleted: 0,
   },
   {
      IDLibrary: "lib-5",
      LibraryName: "Badtz UI",
      LibraryDescription: "Creative and playful UI component library",
      LibraryUrl: "https://www.badtz-ui.com/",
      IsDeleted: 0,
   },
];

export const fetchLibraries = async () => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 300));
   return MOCK_LIBRARIES;
};

export function useGetLibraries() {
   const [libraries, setLibraries] = useState<Library[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const getLibraries = async () => {
      setIsLoading(true);
      setError(null);
      const data = await fetchLibraries();
      setLibraries(data);
      setIsLoading(false);
   };

   useEffect(() => {
      getLibraries();
   }, []);

   return {
      libraries,
      isLoading,
      error,
      refetch: getLibraries,
   };
}
