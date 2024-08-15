import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { ConvexClientProvider } from "@/components/convex-provider";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Memoir App",
  description: "Beautiful Note-Taking App with much better UI and Features",
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

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full">
        <ConvexClientProvider>
          <Providers>
            <Toaster position="bottom-center" />
            {children}
          </Providers>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
