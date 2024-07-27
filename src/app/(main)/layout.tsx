"use client";
import React from "react";
import { Sidebar } from "./_components/Sidebar";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="text-foreground bg-background h-full flex items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="select-none h-max flex w-screen text-foreground bg-background min-h-full">
      <main className="h-full min-h-full flex  overflow-y-auto">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
