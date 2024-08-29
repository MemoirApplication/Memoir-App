"use client";

import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { FileIcon, PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import DocumentGraph from "@/components/documentGraph";
import { useLocalization } from "../../contexts/LocalizationContext";
import { useTheme } from "next-themes";
import { WavyBackground } from "@/components/wavy-background";
import { Divider, ScrollShadow } from "@nextui-org/react";
import { RecentDocumentList } from "../../_components/recent-list";

export default function Documents() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const { dict } = useLocalization();
  const welcomeMessage = dict.main.documents.welcome.replace(
    "{firstName}",
    user?.username || "User"
  );

  const greeting = (() => {
    const currentHour = new Date().getHours();
    const baseGreeting =
      currentHour >= 5 && currentHour < 12
        ? dict.main.documents.morning
        : currentHour >= 12 && currentHour < 17
          ? dict.main.documents.afternoon
          : dict.main.documents.evening; // This covers all times from 5 PM to 5 AM
    return `${baseGreeting}${user?.username ? `, ${user.username}` : ""}`;
  })();

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
            <div className="flex justify-between m-9">
              <p className="text-5xl font-bold select-none text-foreground">
                {greeting}
              </p>
            </div>
            <div className="mx-9">
              <p className="text-2xl font-bold select-none text-foreground mb-3">
                {dict.main.documents.recentPages}
              </p>
              <div className="flex overflow-x-auto overflow-visible">
                <ScrollShadow
                  orientation="horizontal"
                  className="flex overflow-x-auto space-x-4"
                >
                  <RecentDocumentList />
                </ScrollShadow>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Card className="fixed bottom-0 p-5 bg-opacity-80 backdrop-blur-lg w-auto rounded-b-none">
                <h1 className="select-none ">{welcomeMessage}</h1>
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

            {/* <Card
              isFooterBlurred
              radius="lg"
              className="border-none bg-background w-[700px]"
            >
              <div className="object-cover">
                <DocumentGraph />
                </div>
            </Card> */}
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
