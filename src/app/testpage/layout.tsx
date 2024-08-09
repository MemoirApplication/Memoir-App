"use client";
import React, { useState } from "react";
import { useColor } from "@/app/(main)/contexts/ColorContext";
import { useTheme } from "next-themes";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { color } = useColor(); // Use color from ColorContext
  const { theme } = useTheme(); // Use theme from next-themes
  const themeClass = `${color}-${theme}`;

  return (
    <div className="flex h-screen">
      <main className={themeClass}>{children}</main>
    </div>
  );
};

export default MainLayout;
