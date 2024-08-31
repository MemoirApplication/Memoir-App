"use client";

import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import headingImage from "./android-chrome-512x512.png";
import Image from "next/image";
import { useConvexAuth } from "convex/react";
import { useLocalization } from "@/app/(main)/contexts/LocalizationContext";


export const SignedInHeading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { dict } = useLocalization();


  return (
    <div className="max-w-3xl space-y-4 pt-40">
      <div className="drop-shadow-2xl  flex justify-center">
        <Image src={headingImage} alt="Logo" width={200} height={200} />
      </div>
      <div className="drop-shadow-2xl space-y-4 items-center justify-center">
        <p className="drop-shadow-2xl leading-normal mb-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/90 to-black/60 dark:from-white/90 dark:to-white/60">
          {dict.landingPage.components.signedInHeading.welcome}
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
            {dict.landingPage.components.signedInHeading.open}
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
          <p dir="auto">{dict.landingPage.components.signedInHeading.card}</p>
        </CardBody>
      </Card>
    </div>
  );
};
