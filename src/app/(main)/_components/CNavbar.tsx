"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Menu, Star, Ellipsis, MessageSquareText, Share, PanelLeft } from "lucide-react";
import { Title } from "@/app/(main)/_components/title";
import { useTheme } from "next-themes";
import { useSidebar } from "../contexts/SidebarContext";

export const CNavbar = ({ document }) => {
  const { isCollapsed, toggleSidebar } = useSidebar(); // Use context here

  return (
    // <div className=" h-screen bg-background text-foreground w-screen">
    <div
      className={`flex items-center h-11 top-0 right-0 bg-opacity-50 backdrop-blur-lg drop-shadow-md bg-default-300 text-default-foreground border-b border-default justify-between`}
    >
      {/* items on the left */}
      <div className="flex items-center gap-x-2 pl-2">
          <Button
            onClick={toggleSidebar}
            variant="light"
            color="secondary"
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
        <Button 
          variant="light" 
          color="secondary" 
          isIconOnly 
          size="sm">
          <MessageSquareText size={20} />
        </Button>
        <Button 
          variant="light" 
          color="secondary" 
          isIconOnly 
          size="sm">
          <Share size={20} />
        </Button>
        <Button           
          variant="light" 
          color="secondary" 
          isIconOnly 
          size="sm">
          <Star size={20} />
        </Button>
        <Button 
          variant="light" 
          color="secondary" 
          isIconOnly 
          size="sm">
          <Ellipsis size={20} />
        </Button>
        {/* <p>end of nav bar</p> */}
      </div>
    </div>
  );
};
