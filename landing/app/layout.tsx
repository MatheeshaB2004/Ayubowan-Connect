import type { Metadata } from "next";
import { Arima, Nunito } from "next/font/google";
import "../styles/globals.css";
import "../styles/components/Header.css";
import "../styles/components/Footer.css";
import GlobalHeader from "../components/header_footer/GlobalHeader";
import Footer from "../components/header_footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const arima = Arima({ subsets: ["latin"], variable: "--font-arima" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Ayubowan Connect",
  description: "A cultural connection platform for Sri Lanka connecting travelers, vendors, and authentic experiences.",
  icons: {
    icon: "/logo.png",
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
        className={`${arima.variable} ${nunito.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <GlobalHeader />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
