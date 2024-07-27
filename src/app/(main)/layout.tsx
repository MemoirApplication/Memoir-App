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
      <div className="text-foreground bg-background h-screen h-full flex items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div>
      <main>
        <div className="grid-cols-2 flex">
          <Sidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
