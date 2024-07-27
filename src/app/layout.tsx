import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { ConvexClientProvider } from "@/components/convex-provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memoir App",
  description: "Memoir app description",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-full">
        <ConvexClientProvider>
          <Providers>{children}</Providers>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
