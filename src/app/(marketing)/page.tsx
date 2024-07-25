"use client";

import React from "react";
import { SignedInHeading } from "./_components/signedInHeading";
import { Footer } from "./_components/footer";
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { Image } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";

const MarketingPage = () => {
  let [value, setValue] = React.useState(parseDate("2024-03-07"));

  // Creates a new editor instance.
  // const editor = useCreateBlockNote();
  // const editor = useCreateBlockNote({
  //   initialContent: [
  //     {
  //       type: "paragraph",
  //       content: "Welcome to this demo!",
  //     },
  //     {
  //       type: "paragraph",
  //       content: "You'll see that the text is now blue",
  //     },
  //     {
  //       type: "paragraph",
  //       content:
  //         "Press the '/' key - the hovered Slash Menu items are also blue",
  //     },
  //     {
  //       type: "paragraph",
  //     },
  //   ],
  // });

  return (
    <div className="text-foreground bg-background min-h-max flex flex-col ">
      <div className="flex flex-col items-center justify-center md:justify-start   text-center gap-y-8 flex-1 pb-10 px-6">
        <SignedInHeading />
      </div>

      <div className="pt-8 mt-5 flex justify-center justfy-between items-center drop-shadow-2xl pb-6">
        <Textarea
          isReadOnly
          label="Description"
          color="secondary"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your description"
          defaultValue="A beautiful UI built with NextUI & React library that provides a set of accessible, reusable, and beautiful components."
          className="max-w-xs pr-6"
        />
        <Calendar
          color="secondary"
          aria-label="Date (Controlled)"
          value={value}
          onChange={setValue}
        />
      </div>

      <div className="object-fill pt-10  flex justify-center justfy-between items-center  ">
        <Image
          isBlurred
          isZoomed
          width={550}
          src="./screenshot.png"
          alt="screenshot"
          className="m-5"
        />
      </div>

      {/* <div className="  object-fill h-48 w-96 pt-8 mt-4  justify-center items-center px-8 mx-6 drop-shadow-2xl">
        <BlockNoteView editor={editor} />
      </div> */}

      <div className="flex flex-col  justify-center md:justify-start items-center  pb-10 mt-80">
        <Footer />
      </div>
    </div>
  );
};

export default MarketingPage;
