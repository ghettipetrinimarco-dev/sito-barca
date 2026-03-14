import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ventum — Premium Sailing Catamaran",
  description:
    "Private catamaran cruises, professional sailing instruction and adventure on the Mediterranean. Ventum offers premium sailing experiences, training, and unforgettable moments at sea.",
  keywords: [
    "sailing catamaran",
    "sailing courses",
    "Mediterranean cruise",
    "yacht charter",
    "wingfoil",
    "sushi sailor",
    "RYA Yachtmaster",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#0a0a0a] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
