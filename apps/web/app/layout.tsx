import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist ,Livvic,Momo_Trust_Display} from "next/font/google";
import { cn } from "@repo/ui/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const livvic = Livvic({
  variable: "--font-livvic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const momoTrustDisplay = Momo_Trust_Display({
  variable: "--font-momo-trust-display",
  subsets: ["latin"],
  weight:"400"
});

export const metadata: Metadata = {
  title: "oceanside",
  description: "end to end copy of riverside app to show i know it all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable,livvic.variable,momoTrustDisplay.variable)}>
      <body
        className={`bg-deep-space-blue-200 ${geist.variable} ${geistSans.variable} ${geistMono.variable} ${livvic.variable} ${momoTrustDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
