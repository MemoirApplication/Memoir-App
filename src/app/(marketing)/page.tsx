"use client";
import { SignedInHeading } from "./_components/signedInHeading";
import { Footer } from "./_components/footer";

const MarketingPage = () => {
  return (
    <div className=" text-foreground bg-background min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start   text-center gap-y-8 flex-1 pb-10 px-6">
        <SignedInHeading />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
