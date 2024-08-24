"use client";

import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import headingImage from "./android-chrome-512x512.png";
import Image from "next/image";
import { useConvexAuth } from "convex/react";
export const SignedInHeading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4 pt-40">
      <div className="drop-shadow-2xl  flex justify-center">
        <Image src={headingImage} alt="Logo" width={200} height={200} />
      </div>
      <div className="drop-shadow-2xl space-y-4 items-center justify-center">
        <p className="drop-shadow-2xl mb-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/90 to-black/60 dark:from-white/90 dark:to-white/60">
          Welcome to Memoir
        </p>
        {isAuthenticated && !isLoading && (
          <Button
            variant="shadow"
            color="secondary"
            className="mt-6 drop-shadow-2xl"
            onClick={() => {
              window.location.href = "/documents";
            }}
          >
            Open Memoir
          </Button>
        )}
      </div>
      <br></br>
      <Card
        shadow="lg"
        isHoverable
        isFooterBlurred
        className="bg-opacity-60 backdrop-blur-lg"
      >
        <CardBody>
          <p>Your Ideas, Documents and Plans all together in one place.</p>
        </CardBody>
      </Card>
    </div>
  );
};
