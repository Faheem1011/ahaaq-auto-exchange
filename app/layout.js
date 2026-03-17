import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahaaq Auto Exchange | Premium Cars",
  description: "Buy all best cars at best prices. Quality Toyota, Lexus, Mercedes, BMW and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-zinc-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
