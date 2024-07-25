"use client";
import { useAuth } from "@clerk/clerk-react";

import React from "react";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  return (
    <div>
      <main className="h-max text-foreground bg-background min-h-full flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
