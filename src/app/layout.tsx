import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";



const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: { template: "%s | SportNest", default: "SportNest — Book Premium Sports Facilities" },
  description:
    "Book premium sports facilities instantly. Football turfs, basketball courts, swimming pools, and more. Join 12,000+ athletes on SportNest.",
  keywords: ["sports", "facility booking", "football turf", "basketball court", "swimming pool"],
  openGraph: {
    title: "SportNest — Book Premium Sports Facilities",
    description: "Book premium sports facilities instantly. Football turfs, basketball courts, swimming pools, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 text-center">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
