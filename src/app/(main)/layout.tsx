"use client";
import React, { useState } from "react"; 
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";

const MainLayout = ({ children, isCollapsed }: { children: React.ReactNode, isCollapsed: boolean, toggleSidebar: () => void }) => {
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
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
