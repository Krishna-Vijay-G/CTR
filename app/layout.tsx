import type { Metadata, Viewport } from "next";
import { Rajdhani, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chennaiturboriders.in"),
  title: {
    default: "Chennai Turbo Riders | India's Premier F4 Racing Team",
    template: "%s | Chennai Turbo Riders",
  },
  description:
    "Official website of Chennai Turbo Riders — India's Premier Formula 4 Racing Team competing in the Indian Racing League.",
  keywords: [
    "Chennai Turbo Riders",
    "CTR",
    "Formula 4",
    "Indian Racing League",
    "IRL",
    "Motorsport India",
    "F4 Racing",
  ],
  icons: { icon: "/images/logos/CTR_New_yellow.png" },
  openGraph: {
    title: "Chennai Turbo Riders | India's Premier F4 Racing Team",
    description:
      "India's Premier Formula 4 Racing Team competing at the highest level of Indian motorsport.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${rajdhani.variable} ${inter.variable}`}>
      <body>
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
