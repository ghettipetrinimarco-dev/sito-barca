import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {children}
      </body>
    </html>
  );
}
