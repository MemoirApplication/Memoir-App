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
import App from "../../_components/blocksnote";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

export default function Documents() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      <div className="relative pl-6 h-screen min-h-full flex flex-col w-screen">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar isBordered={true} height="44px">
            <NavbarContent as="div" justify="end">
              {/* <UserButton /> */}
            </NavbarContent>
          </Navbar>
        </div>

        {/* Main content */}
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
    </>
  );
}
