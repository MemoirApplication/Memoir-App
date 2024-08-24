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
import { Sun, Moon } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/spinner";
// Import Clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { useConvexAuth } from "convex/react";

export const NavigationBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isLoaded } = useSession();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  //Timeout for Spinner
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Logo />
        <p>Memoir</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="/documents">
            Docs
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <SignedOut>
            <SignInButton>
              <Button as={Link} color="secondary" radius="md" variant="shadow">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {loading && isLoaded ? (
              <Spinner color="secondary" />
            ) : (
              <div className="flex gap-4">
                <Button
                  as={Link}
                  color="secondary"
                  radius="md"
                  variant="shadow"
                  href="/documents"
                >
                  Open Memoir
                </Button>
                <UserButton />
              </div>
            )}
          </SignedIn>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="bordered" color="default">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown Menu with icons">
              <DropdownItem
                className="text-foreground "
                variant="faded"
                key="dark"
                startContent={<Moon />}
                onClick={() => setTheme("dark")}
              >
                Dark
              </DropdownItem>
              <DropdownItem
                className="text-foreground "
                variant="faded"
                key="light"
                startContent={<Sun />}
                onClick={() => setTheme("light")}
              >
                Light
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
