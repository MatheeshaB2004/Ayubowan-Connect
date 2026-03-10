import type { Metadata } from "next";
import { Geist, Geist_Mono, Arima } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalHeader from "@/components/header_footer/GlobalHeader";
import Footer from "@/components/header_footer/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import ChatWidget from "@/components/common/ChatWidget";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
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
        <head>
          {/* Font Awesome icons */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          />
        </head>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} ${arima.variable} antialiased flex flex-col min-h-screen`}
        >
          <AuthProvider>
            <CartProvider>
              <GlobalHeader />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
              <ScrollToTopButton />
              <ChatWidget />
            </CartProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
