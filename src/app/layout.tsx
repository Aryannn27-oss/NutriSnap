import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriSnap - Premium AI-Powered Nutrition Tracking",
  description: "Identify food, track calories, and monitor macros from meal photos instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-on-surface antialiased h-screen overflow-hidden flex flex-col lg:flex-row">
        {/* Sidebar for Desktop */}
        <Sidebar />

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col h-full overflow-hidden lg:pl-64">
          {/* Header (Top Nav) - Hidden on desktop, sidebar handles branding */}
          <div className="lg:hidden">
            <Header />
          </div>

          {/* Scrollable Page Container */}
          <div className="flex-1 overflow-y-auto w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
