import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ProgressBar from "@/components/ProgressBar";
import ClientEffects from "@/components/ClientEffects";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranit Katwe ~ Portfolio",
  description: "Data Scientist & AI Engineer",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono antialiased bg-[#0A0A0A] text-[#E8E8E8]">
        <ProgressBar />
        <CustomCursor />
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
