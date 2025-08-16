import type { Metadata } from "next";
import '@fontsource/inter/variable.css';
import { Geist, Geist_Mono } from "next/font/google";
import Header from '../components/Header';
import LayoutWrapper from '../components/LayoutWrapper';
import DevPanel from '../components/DevPanel';
import NextAuthProvider from '../components/NextAuthProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat Terminal",
  description: "Retro terminal-style AI chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <div className="min-h-screen max-w-[1900px] mx-auto">
            <Header />
            <LayoutWrapper>{children}</LayoutWrapper>
            <DevPanel />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
