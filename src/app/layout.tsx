import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Next blog | Home",
  description: "A Next.js blog app where user can read and write blog posts",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${inter.className}`}>
      <Analytics />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
