"use client";
import { SignedInHeading } from "./_components/signedInHeading";

const MarketingPage = () => {
  return (
    <div className=" text-foreground bg-background min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start   text-center gap-y-8 flex-1 pb-10 px-6">
        <SignedInHeading />
      </div>
    </div>
  );
};

export default MarketingPage;
