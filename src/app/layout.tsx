import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";
import { AuthProvider } from "@/components/features/auth/AuthContext";

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
      <body className="bg-canvas text-on-surface antialiased h-screen overflow-hidden flex">
        <AuthProvider>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
