import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { JoJoEffects } from "@/components/JoJoEffects";
import { JoJoPopupAds } from "@/components/JoJoPopupAds";
import { StandBattle } from "@/components/StandBattle";
import { ToBeContinued } from "@/components/ToBeContinued";
import { ChaoticEffectsWrapper } from "@/components/ChaoticEffectsWrapper";
import { ForgiveFatherPopup } from "@/components/ForgiveFatherPopup";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JoJo's Bizarre Bazaar - Menacing Merchandise",
  description: "The most bizarre ecommerce store in the multiverse! Featuring Stands, manga, figures, and artifacts from the JoJo universe. ゴゴゴゴ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navigation />
        {children}
        <JoJoEffects />
        <JoJoPopupAds />
        <StandBattle />
        <ToBeContinued />
        <ForgiveFatherPopup />
        <ChaoticEffectsWrapper />
        <Toaster />
      </body>
    </html>
  );
}
