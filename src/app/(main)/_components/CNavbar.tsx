"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Menu,
  Star,
  Ellipsis,
  MessageSquareText,
  Share,
  PanelLeft,
  Sun,
  Moon,
  StarOff,
} from "lucide-react";
import { Title } from "@/app/(main)/_components/title";
import { useTheme } from "next-themes";
import { useSidebar } from "../contexts/SidebarContext";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

export const CNavbar = ({ document }) => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const update = useMutation(api.documents.update);

  const toggleFav = () => {
    update({
      id: document._id,
      isFav: !document.isFav,
    });
  };

  return (
    // <div className=" h-screen bg-background text-foreground w-screen">
    <div
      className={`flex items-center h-11 top-0 right-0 bg-opacity-50 backdrop-blur-lg drop-shadow-md bg-background text-default-foreground border-b border-default-200 justify-between`}
    >
      {/* items on the left */}
      <div className="flex items-center gap-x-2 pl-2">
        <Button
          onClick={toggleSidebar}
          variant="light"
          color="default"
          isIconOnly
          size="sm"
        >
          <Menu size={20} />
          {/* <PanelLeft size={20} /> */}
        </Button>
        <Title initialData={document} />
      </div>

      {/* items on the right */}
      <div className="flex items-center gap-x-2 pr-2">
        <Button variant="light" color="default" isIconOnly size="sm">
          <MessageSquareText size={20} />
        </Button>
        <Button variant="light" color="default" isIconOnly size="sm">
          <Share size={20} />
        </Button>
        <Button
          variant="light"
          color="default"
          isIconOnly
          size="sm"
          onClick={() => {
            toggleFav();
          }}
        >
          {document.isFav ? <Star size={20} /> : <StarOff size={20} />}
        </Button>
        <Button
          variant="light"
          color="default"
          isIconOnly
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <ThemeIcon size={20} />
        </Button>
        <Button variant="light" color="default" isIconOnly size="sm">
          <Ellipsis size={20} />
        </Button>
        {/* <p>end of nav bar</p> */}
      </div>
    </div>
  );
};
