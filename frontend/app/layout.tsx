import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
import GlobalHeader from '@/components/header_footer/GlobalHeader';
import Footer from '@/components/header_footer/Footer';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <GlobalHeader />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}