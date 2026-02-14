import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "Chennai Turbo Riders | India's Premier F4 Racing Team",
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
  icons: { icon: "/images/logos/CTR_yellow.png" },
  openGraph: {
    title: "Chennai Turbo Riders | India's Premier F4 Racing Team",
    description:
      "Official website of Chennai Turbo Riders — competing at the highest level of Indian motorsport.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-carbon-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
