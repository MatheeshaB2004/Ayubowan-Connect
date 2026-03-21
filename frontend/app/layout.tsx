import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Arima, Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalHeader from "@/components/header_footer/GlobalHeader";
import Footer from "@/components/header_footer/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import ChatWidget from "@/components/common/ChatWidget";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import "../styles/design-tokens.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayubowan Connect",
  description: "Connect with authentic Sri Lankan experiences",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
          className={`${nunito.variable} ${arima.variable} font-sans antialiased flex flex-col min-h-screen`}
        >
          <AuthProvider>
            <CartProvider>
              <Toaster position="top-center" />
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