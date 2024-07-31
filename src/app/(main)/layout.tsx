"use client";
import React, { useState } from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="text-foreground bg-background h-screen flex items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen">
      <main>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
