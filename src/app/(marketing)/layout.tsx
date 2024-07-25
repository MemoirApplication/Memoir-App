"use client";

import { NavigationBar } from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="h-max text-foreground bg-background min-h-full flex flex-col">
        <ClerkProvider>
          <NavigationBar />
          {children}
        </ClerkProvider>
      </main>
    </div>
  );
};

export default MarketingLayout;
