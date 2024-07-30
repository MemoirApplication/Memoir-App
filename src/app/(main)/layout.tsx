"use client";
import React, { useState } from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";
import { Sidebar } from "./_components/Sidebar";
import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Menu } from "lucide-react";
import { Button } from "@nextui-org/button";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
        <div className=" h-screen bg-background text-foreground w-screen">
          <div className="relative z-50 mb-10">
            <Sidebar isCollapsed={isCollapsed} />
          </div>
          <div
            className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
          >
            <Navbar isBordered={true} height="h-16">
              <NavbarContent as="div" justify="start">
                <Button
                  onClick={toggleSidebar}
                  variant="light"
                  color="secondary"
                  isIconOnly
                  size="sm"
                >
                  <Menu />
                </Button>
              </NavbarContent>
            </Navbar>
          </div>

          {/* Main BlockNote  */}
          <div
            className={`fixed right-0 h-screen flex-grow bg-background text-foreground transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
          >
            <div className="m-10">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
