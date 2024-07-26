"use client";
import React from "react";
import { Sidebar } from "./_components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="select-none h-full flex">
      <Sidebar />
      <main className="h-full flex flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
