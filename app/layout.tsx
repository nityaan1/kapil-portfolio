import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: set once a production domain is confirmed (PRD open item #7)
  title: "Kapil Taneja — Enterprise Account Director, Dell Technologies",
  description:
    "Two decades scaling enterprise technology businesses across Dell, HP, Vodafone Idea, and Airtel — turning CXO trust into sustained, measurable growth.",
  openGraph: {
    title: "Kapil Taneja — Enterprise Account Director, Dell Technologies",
    description:
      "Two decades scaling enterprise technology businesses across Dell, HP, Vodafone Idea, and Airtel.",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
