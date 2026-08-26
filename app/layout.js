import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  metadataBase: new URL("https://ahhaqautoexchange.net"),
  title: "Ahaaq Auto Exchange | Quality Used Cars, Auto Repair & Body Shop | Jacksonville, FL",
  description: "Jacksonville's premier dealership for quality pre-owned vehicles, certified mechanical auto repair, full collision body shop, and window tinting at 6615 N Main St, Jacksonville, FL 32208.",
  keywords: [
    "Ahaaq Auto Exchange",
    "used cars Jacksonville FL",
    "cars for sale Jacksonville 32208",
    "used SUVs Jacksonville FL",
    "cheap cars Jacksonville under 5000",
    "buy here pay here Jacksonville",
    "auto repair Jacksonville FL",
    "body shop Jacksonville",
    "used car dealership North Main St Jacksonville"
  ],
  authors: [{ name: "Ahaaq Auto Exchange" }],
  creator: "Ahaaq Auto Exchange",
  publisher: "Ahaaq Auto Exchange",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://ahhaqautoexchange.net",
  },
  openGraph: {
    title: "Ahaaq Auto Exchange | Quality Used Cars & Auto Repair | Jacksonville, FL",
    description: "Find quality used vehicles and certified auto service in Jacksonville, FL. Guaranteed financing approval & top-dollar trade-ins at 6615 N Main St.",
    url: "https://ahhaqautoexchange.net",
    siteName: "Ahaaq Auto Exchange",
    images: [
      {
        url: "/images/Jacksonville-ahaaq-hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Ahaaq Auto Exchange Dealership in Jacksonville, FL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahaaq Auto Exchange | Quality Used Cars in Jacksonville, FL",
    description: "Browse affordable used cars, SUVs, and trucks for sale with guaranteed financing in Jacksonville, FL.",
    images: ["/images/Jacksonville-ahaaq-hero-banner.webp"],
  },
  other: {
    "google-adsense-account": "ca-pub-2258356814887246",
    "geo.region": "US-FL",
    "geo.placename": "Jacksonville, Florida",
    "geo.position": "30.3879;-81.6528",
    "ICBM": "30.3879, -81.6528",
  },
};

import SplashScreen from "@/components/SplashScreen";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SmokeCursor from "@/components/SmokeCursor"; // Exhaust effects
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

export default function RootLayout({ children }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
  const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-2258356814887246";

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense Verification & Auto Ads */}
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-['Inter'] bg-[#FAFAFA] text-zinc-900 antialiased">
        <SmokeCursor />
        <SplashScreen>
          {children}
        </SplashScreen>
        <CookieConsent />
        <WhatsAppFloat />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
