import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import VerticalNavbar from "@/components/VerticalNavbar";
import { Separator } from "@/components/ui/separator";
import { Suspense } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { SectionsProvider } from "@/components/context/section-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paste UI Library",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body className={cn(inter.className, 'dark h-full w-full')}>
        <Toaster />
        <SectionsProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Navbar></Navbar>
          <Separator></Separator>
          <div className="flex h-full overflow-hidden">
            <Suspense>
              <VerticalNavbar></VerticalNavbar>
            </Suspense>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
        </SectionsProvider>
      </body>
    </html>
  );
}
