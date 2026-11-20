"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("motwani-theme", "light");
    } catch {
      // Ignore if localStorage is unavailable
    }
  }, []);

  const toggleTheme = () => {
    // Night mode removed as requested by user - force light mode
    try {
      document.documentElement.setAttribute("data-theme", "light");
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
