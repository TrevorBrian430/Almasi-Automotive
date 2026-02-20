import type { Metadata, Viewport } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppFloat from "@/components/ui/whatsapp-float";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Almasi Automotive | Kenya's Most Exclusive Car Dealership",
  description:
    "Curating the world's finest automobiles for East Africa's most discerning individuals. Direct imports, exceptional financing, white-glove concierge.",
  keywords: [
    "luxury cars Kenya",
    "car dealership Nairobi",
    "import cars Kenya",
    "Land Cruiser Kenya",
    "G-Wagon Nairobi",
    "Almasi Automotive",
  ],
};

import { getContent } from "@/lib/actions";
import ConditionalLayout from "@/components/layout/conditional-layout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: content } = await getContent();

  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${manrope.variable} antialiased bg-midnight text-platinum`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ConditionalLayout>
            <Footer />
            <WhatsAppFloat phone={content?.contact?.phone} />
          </ConditionalLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
