"use client";

import React from "react";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="h-max text-foreground bg-background min-h-full flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
