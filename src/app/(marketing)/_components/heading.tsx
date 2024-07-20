import React from "react";
import { Textarea } from "@nextui-org/react";


export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-5xl font-bold">
        Welcome to <span className="underline">Memoir</span>
      </h1>
      <br></br>
      <Textarea
      isReadOnly
      variant="bordered"
      size="lg"
      labelPlacement="outside"
      placeholder="Enter your description"
      defaultValue="Your Ideas, Documents and Plans all together in one place."
      className="max-w-3xs"
    />
    </div>
  );
};