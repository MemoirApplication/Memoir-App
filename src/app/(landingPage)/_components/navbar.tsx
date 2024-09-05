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
import { Sun, Moon, Github } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/spinner";
// Import Clerk
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Logo } from "./Logo";
import { useConvexAuth } from "convex/react";
import { useLocalization } from "@/app/(main)/contexts/LocalizationContext";
import Image from "next/image";

export const NavigationBar = () => {
  // const { isAuthenticated, isLoading } = useConvexAuth();
  const { isLoaded } = useSession();
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { dict } = useLocalization();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  //Timeout for Spinner
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Logo />
        <h1 className="font-bold font-sans">Memoir</h1>
        <Button
          isIconOnly
          variant="light"
          as={Link}
          href="https://github.com/MemoirApplication/Memoir-App"
          className="ml-4"
        >
          <Github />
          {/* <Image src={"./github.svg"} alt="github" width={24} height={24} /> */}
        </Button>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="/documents">
            {dict.landingPage.components.navbar.docs}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            {dict.landingPage.components.navbar.features}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            {dict.landingPage.components.navbar.integrations}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex gap-x-2 justify-center">
            <SignedOut>
              <SignInButton>
                <Button
                  as={Link}
                  color="secondary"
                  radius="md"
                  variant="light"
                  className="font-bold text-secondary-600"
                >
                  <div>{dict.landingPage.components.navbar.signin}</div>
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  as={Link}
                  color="secondary"
                  radius="md"
                  variant="shadow"
                >
                  {dict.landingPage.components.navbar.signup}
                </Button>
              </SignUpButton>
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
                    {dict.landingPage.components.navbar.open}
                  </Button>
                  <UserButton />
                </div>
              )}
            </SignedIn>
          </div>
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
                {dict.landingPage.components.navbar.dark}
              </DropdownItem>
              <DropdownItem
                className="text-foreground "
                variant="faded"
                key="light"
                startContent={<Sun />}
                onClick={() => setTheme("light")}
              >
                {dict.landingPage.components.navbar.light}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
