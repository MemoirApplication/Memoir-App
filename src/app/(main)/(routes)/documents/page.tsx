"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import App from "../../_components/blocksnote";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";

export default function Documents() {
  const { user } = useUser();
  return (
    <>
      <div className="pl-6 h-screen min-h-full flex flex-col w-screen">
        {/*  */}

        {/* navbar div */}
        <div className="">
          <Navbar position="static" isBordered={true}>
            <NavbarContent as="div" justify="end">
              <UserButton />
            </NavbarContent>
          </Navbar>
        </div>

        {/*  */}
        <div>
          {/* // to-do fix pos  */}
          <div className="h-screen flex flex-col items-center justify-center">
            <h2 className="select-none">
              Hey {user?.firstName}, Welcome to Memroir
            </h2>
            <Button variant="light" color="secondary" className="mt-2">
              <PlusCircle />
              Create Note
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
