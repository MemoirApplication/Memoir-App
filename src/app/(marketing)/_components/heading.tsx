import React from "react";
import { Textarea } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4 pt-40">
      <h1 className="text-5xl font-bold">
        Welcome to <span className="underline">Memoir</span>
      </h1>
      <br></br>
      <Card shadow="lg" isHoverable isFooterBlurred>
        <CardBody>
          <p>Your Ideas, Documents and Plans all together in one place.</p>
        </CardBody>
      </Card>
    </div>
  );
};
