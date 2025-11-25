import type { Metadata } from "next";
import { Inter, Playfair_Display, Arima, Nunito } from "next/font/google";
import "../styles/globals.css";
import "../styles/components/Header.css";
import "../styles/components/Footer.css";
import "../styles/pages/Landing.css";
import { AuthProvider } from "../context/AuthContext";
import GlobalHeader from "../components/header_footer/GlobalHeader";
import Footer from "../components/header_footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const arima = Arima({ subsets: ["latin"], variable: "--font-arima" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Ayubowan Connect",
  description: "A cultural connection platform for Sri Lanka connecting travelers, vendors, and authentic experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${playfair.variable} ${arima.variable} ${nunito.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <GlobalHeader />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
