"use client";

import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ColorProvider } from "./(main)/contexts/ColorContext";
import { EdgeStoreProvider } from "../lib/edgestore";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system" //system default theme
        enableSystem
        // disableTransitionOnChange
      >
        <EdgeStoreProvider>
          <ColorProvider>{children}</ColorProvider>
        </EdgeStoreProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
