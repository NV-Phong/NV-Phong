"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScrollContextType {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within ScrollProvider");
  }
  return context;
}
