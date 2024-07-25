"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system" //system default theme
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
