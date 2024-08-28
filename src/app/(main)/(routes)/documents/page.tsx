"use client";

import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import DocumentGraph from "@/components/documentGraph";
import { useLocalization } from "../../contexts/LocalizationContext";
import { useTheme } from "next-themes";
import { WavyBackground } from "@/components/wavy-background";

export default function Documents() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const { dict } = useLocalization();
  const welcomeMessage = dict.main.documents.welcome.replace(
    "{firstName}",
    user?.username || "User"
  );

  const { theme } = useTheme() || "dark";

  const isDarkMode = theme === "dark";

  const bgfill = isDarkMode ? "black" : "white";

  // Function to create a new note
  const onCreate = () => {
    const promise = create({ title: "Untitled" });
    // Shows a toast with the status
    toast.promise(promise, {
      loading: dict.main.components.item.toastCreateLoading,
      success: dict.main.components.item.toastCreateSuccess,
      error: dict.main.components.item.toastCreateError,
    });
  };

  return (
    <>
      <WavyBackground
        className="absolute z-10 mx-auto"
        key={theme}
        backgroundFill={bgfill}
      >
        <div className="relative z-30 h-screen text-foreground ">
          {/* Main content area */}
          <div
            className={`fixed end-0 h-screen flex-growtext-foreground transition-all duration-300 w-[calc(100%-18rem)]`}
          >
            <div className="flex flex-col items-center justify-center mt-72">
              <Card className="p-5 bg-background bg-opacity-60 backdrop-blur-lg">
                <h1 className="select-none ">{welcomeMessage}</h1>
                {/* <h2 className="select-none mt-2 ">start by creating a new note</h2> */}
                <Button // Create note button
                  onClick={onCreate} // Calls the onCreate function when pressed
                  variant="light"
                  color="secondary"
                  className="mt-2"
                >
                  <PlusCircle />
                  {dict.main.documents.create}
                </Button>
              </Card>
            </div>
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none bg-background w-[700px]"
            >
              <div className="object-cover">{/* <DocumentGraph /> */}</div>
            </Card>
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
