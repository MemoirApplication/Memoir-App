import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

import { Toaster } from "sonner";
import ConvexClientProvider from "@/components/ConvexProviderWithAuth";
import { auth, signOut } from "@/auth";
import { ReactNode } from "react";

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
      <body className="min-h-full">
        <Providers>
          <Toaster position="bottom-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
