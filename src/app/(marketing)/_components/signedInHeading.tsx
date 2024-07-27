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
      <div className="drop-shadow-2xl">
        <h1 className="drop-shadow-2xl text-5xl font-bold">
          Welcome to <span className="underline">Memoir</span>
        </h1>
        {isAuthenticated && !isLoading && (
          <Button
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
      <Card shadow="lg" isHoverable isFooterBlurred>
        <CardBody>
          <p>Your Ideas, Documents and Plans all together in one place.</p>
        </CardBody>
      </Card>
    </div>
  );
};
