import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahaaq Auto Exchange | Premium Luxury Car Dealership in Jacksonville, FL",
  description: "Jacksonville's premier auto exchange for luxury pre-owned vehicles. Featuring a curated selection of Toyota, Lexus, Mercedes-Benz, and BMW. Best prices and quality guaranteed in North Florida.",
  keywords: ["Ahaaq Auto Exchange", "luxury car dealer Jacksonville FL", "used cars Jacksonville", "premium auto exchange Florida", "Lexus dealer Jacksonville", "BMW Jacksonville FL"],
  alternates: {
    canonical: "https://ahaaq-auto-exchange.vercel.app",
  },
  openGraph: {
    title: "Ahaaq Auto Exchange | Jacksonville's Luxury Car Destination",
    description: "Find your next luxury vehicle at Ahaaq Auto Exchange. Quality inspected, market-leading prices.",
    url: "https://ahaaq-auto-exchange.vercel.app",
    siteName: "Ahaaq Auto Exchange",
    images: [
      {
        url: "/images/jacksonville-luxury-cars-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury vehicles at Ahaaq Auto Exchange Jacksonville",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-zinc-900 antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
