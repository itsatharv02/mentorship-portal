import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mentora - Learn from people who've been there",
  description:
    "1:1 mentorship with industry experts. Build skills, grow your network and take the next step in your career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
