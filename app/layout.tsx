import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ModalProvider } from './components/Modal/ModalContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Next-Shop',
  description: 'Next.js + Tailwind магазин',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <ModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Global portal root for modals */}
          <div id="modal-root" />
        </ModalProvider>
      </body>
    </html>
  );
}
