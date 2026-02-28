import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "My Hometown Media — Malaysia's Leading Social Media Marketing Agency",
  description:
    "Empowering brands through social media marketing, content creation, and digital engagement. 9M+ followers, 100M+ monthly traffic across Malaysia.",
  openGraph: {
    title: "My Hometown Media — Malaysia's Leading Social Media Marketing Agency",
    description:
      "Empowering brands through social media marketing, content creation, and digital engagement. 9M+ followers, 100M+ monthly traffic across Malaysia.",
    url: "https://my-home-town-media.vercel.app",
    siteName: "My Hometown Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Hometown Media — Malaysia's Leading Social Media Marketing Agency",
    description:
      "Empowering brands through social media marketing, content creation, and digital engagement. 9M+ followers, 100M+ monthly traffic across Malaysia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
