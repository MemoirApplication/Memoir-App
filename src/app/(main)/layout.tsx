"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
      <Sidebar />
      <main className="flex-grow bg-background text-foreground">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
