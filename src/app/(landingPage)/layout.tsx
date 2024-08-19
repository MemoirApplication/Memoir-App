"use client";

import { ThemeProvider } from "next-themes";
import { NavigationBar } from "./_components/navbar";
const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider>
        <main className="violet-light dark:violet-dark select-none h-max text-foreground bg-background min-h-full flex flex-col">
          <div className="fixed top-0 right-0 left-0 z-50">
            <NavigationBar />
          </div>
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
};

export default LandingPageLayout;
