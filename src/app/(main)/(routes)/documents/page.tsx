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
          <div className="h-full flex  flex-col justify-center items-center space-y-4">
            <h2>Hey {user?.firstName}, Welcome to Memroir</h2>
          </div>
          {/* <App /> */}
        </div>
      </div>
    </>
  );
}
