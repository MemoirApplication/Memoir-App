"use client";
import React from "react";
import {Button} from "@nextui-org/react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-7xl font-bold">
        Welcome to <span className="underline">Memoir</span>
      </h1>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents and Plans all together in one place.
      </h1>
      <Button color="primary" variant="shadow">
        Test
      </Button>
    </div>
  );
};