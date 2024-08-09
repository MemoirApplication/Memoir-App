"use client";

import React, { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import ColorSwitcher from "@/components/ColorSwitcher";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function TestPage() {
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <>
      <div className="h-full w-full bg-rose-500">
        <p>I WILL CRYYY</p>
        <Button color="secondary">WAA</Button>
        <Spinner color="secondary"></Spinner>
        <ColorSwitcher />
        <Button
          variant="light"
          color="default"
          isIconOnly
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <ThemeIcon size={20} />
        </Button>
      </div>
    </>
  );
}
