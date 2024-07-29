"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import App from "../../_components/blocksnote";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusCircle, Menu } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import MainLayout from "../../layout";
import { Sidebar } from "../../_components/Sidebar";

export default function Documents() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Navbar */}
      <div className="relative h-screen bg-background text-foreground w-screen">
        <div className="z-50">
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

        {/* Main content */}
        <div
          className={`fixed right-0 h-screen flex-grow bg-background text-foreground transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
        >
          <div className="flex flex-col items-center justify-center mt-60">
            <h2 className="select-none">
              Hey {user?.firstName}, Welcome to Memoir
            </h2>
            <Button
              onClick={onCreate}
              variant="light"
              color="secondary"
              className="mt-2"
            >
              <PlusCircle />
              Create Note
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
