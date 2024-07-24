import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';
import { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Community Gardens",
  description: "Manage your community gardens effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
