import type { Metadata } from "next";
import { Geist, Geist_Mono, Arima } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalHeader from "../components/header_footer/GlobalHeader";
import Footer from "../components/header_footer/Footer";
import "./globals.css";
import "../styles/Header.css";
import "../styles/Footer.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayubowan Connect",
  description: "Connect with authentic Sri Lankan experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${arima.variable} antialiased flex flex-col min-h-screen`}
        >
          <GlobalHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
