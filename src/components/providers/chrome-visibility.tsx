"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const ChromeVisibilityContext = createContext<{
  visible: boolean;
  setVisible: (v: boolean) => void;
} | null>(null);

export function ChromeVisibilityProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <ChromeVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </ChromeVisibilityContext.Provider>
  );
}

export function useChromeVisibility() {
  const ctx = useContext(ChromeVisibilityContext);
  if (!ctx) {
    throw new Error(
      "useChromeVisibility must be used inside ChromeVisibilityProvider"
    );
  }
  return ctx;
}
