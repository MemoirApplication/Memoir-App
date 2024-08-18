"use client";
import React from "react";
import { EditorProvider } from "@/app/(main)/contexts/EditorContext";
import { Spinner } from "@nextui-org/spinner";
import { useColor } from "@/app/(main)/contexts/ColorContext";
import { useTheme } from "next-themes";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { color } = useColor(); // Use color from ColorContext
  const { theme } = useTheme(); // Use theme from next-themes
  const themeClass = `${color}-${theme}`;

  // Shows a spinner if the page is loading
  // if (isLoading) {
  //   return (
  //     <div className="themeClass text-foreground bg-background h-screen flex items-center justify-center">
  //       <Spinner color="secondary" className="py-4 mt-10" />
  //     </div>
  //   );
  // }


  return (
    <div className="flex h-screen">
      <main className={themeClass}>
        <EditorProvider>
          {children}
        </EditorProvider>
      </main>
    </div>
  );
};

export default MainLayout;
