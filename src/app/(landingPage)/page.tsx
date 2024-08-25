"use client";

import React from "react";
import { SignedInHeading } from "./_components/signedInHeading";
import { Footer } from "./_components/footer";
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { Textarea } from "@nextui-org/react";
import { BackgroundGradientAnimation } from "@/components/background-gradient-animation";
import { useTheme } from "next-themes";

const MarketingPage = () => {
  const today = new Date().toISOString().split("T")[0]; // Gets today's date in "YYYY-MM-DD" format
  let [value, setValue] = React.useState(parseDate(today));
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  const gradientBackgroundStart = isDarkMode
    ? "rgb(0, 0, 0)"
    : "rgb(255, 255, 255)";
  const gradientBackgroundEnd = isDarkMode
    ? "rgb(20, 20 ,20)"
    : "rgb(230, 230, 230)";
  const firstColor = isDarkMode ? "37, 99, 235" : "96, 165, 250"; // Blue
  const secondColor = isDarkMode ? "109, 40, 217" : "139, 92, 246"; // Violet
  const thirdColor = isDarkMode ? "15, 118, 110" : "20, 184, 166"; // Teal
  const fourthColor = isDarkMode ? "190, 18, 60" : "255, 160, 122"; // Rose
  const fifthColor = isDarkMode ? "217, 119, 6" : "244, 63, 94"; // Amber

  return (
    <BackgroundGradientAnimation
      key={theme}
      interactive={false}
      gradientBackgroundStart={gradientBackgroundStart}
      gradientBackgroundEnd={gradientBackgroundEnd}
      firstColor={firstColor}
      secondColor={secondColor}
      thirdColor={thirdColor}
      fourthColor={fourthColor}
      fifthColor={fifthColor}
    >
      <div className="absolute inset-0 z-10 items-center justify-center text-foreground h-max min-w-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 pb-10 px-6">
          <SignedInHeading />
        </div>
        {/*
        <div className="pt-8 mt-5 flex justify-center justfy-between items-center min-w-full drop-shadow-2xl pb-6">
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
        */}

        {/* <div className="  object-fill h-48 w-96 pt-8 mt-4  justify-center items-center px-8 mx-6 drop-shadow-2xl">
        <BlockNoteView editor={editor} />
      </div> */}

        <div className="flex flex-col  justify-center md:justify-start items-center  pb-10 mt-80"></div>
        <Footer />
      </div>
    </BackgroundGradientAnimation>
  );
};

export default MarketingPage;
