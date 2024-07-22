"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SunMoon, Moon } from "lucide-react";

import { useTheme } from "next-themes";

export const NavigationBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Memoir Logo</p>
      </NavbarBrand>

      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="shadow" color="secondary">
              <SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown Menu with icons">
            <DropdownItem
              key="light"
              startContent={<SunMoon />}
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownItem>
            <DropdownItem
              key="dark"
              startContent={<Moon />}
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" color="foreground">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="secondary"
            radius="md"
            variant="shadow"
            href="#"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
