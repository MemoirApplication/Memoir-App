"use client";
import React, { useState } from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";
import { SidebarProvider } from "./contexts/SidebarContext";
import { Sidebar } from "./_components/Sidebar";
import { useColor } from "@/app/(main)/contexts/ColorContext";
import { useTheme } from "next-themes";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { color } = useColor(); // Use color from ColorContext
  const { theme } = useTheme(); // Use theme from next-themes
  const themeClass = `${color}-${theme}`;

  // Shows a spinner if the page is loading
  if (isLoading) {
    return (
      <div className="themeClass text-foreground bg-background h-screen flex items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }

  // Redirects the user to the root page if the user isnt authenticated
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen">
      <main className={themeClass}>
        <SearchCommand />
        <CoverImageModal />
        {/* Wraps the page with the sidebar context provider */}
        <SidebarProvider>
          <div className="z-50">
            <Sidebar />
          </div>
          {children}
        </SidebarProvider>
      </main>
    </div>
  );
};

export default MainLayout;
