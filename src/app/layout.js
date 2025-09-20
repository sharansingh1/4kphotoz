import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-accent",
});

export const metadata = {
  title: "4kphotoz LLC - Your #1 Photography & Print Solution",
  description: "Serving California with blazing fast turnaround times. Professional photography, graphic design, print lab, and photo booth rentals all under one roof.",
  keywords: "photography, print lab, graphic design, photo booth, California, Bay Area, sports photography, event photography, portraits",
  authors: [{ name: "4kphotoz LLC" }],
  creator: "4kphotoz LLC",
  publisher: "4kphotoz LLC",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://4kphotoz.com",
    siteName: "4kphotoz LLC",
    title: "4kphotoz LLC - Your #1 Photography & Print Solution",
    description: "Serving California with blazing fast turnaround times. Professional photography, graphic design, print lab, and photo booth rentals all under one roof.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "4kphotoz LLC - Professional Photography & Print Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4kphotoz LLC - Your #1 Photography & Print Solution",
    description: "Serving California with blazing fast turnaround times. Professional photography, graphic design, print lab, and photo booth rentals all under one roof.",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ff6b35",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "4kphotoz LLC",
              "description": "Professional photography, graphic design, print lab, and photo booth rental services",
              "url": "https://4kphotoz.com",
              "logo": "https://4kphotoz.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-510-828-1061",
                "contactType": "customer service",
                "email": "info@4kphotoz.com"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "25509 Industrial Blvd, O10",
                "addressLocality": "Hayward",
                "addressRegion": "CA",
                "postalCode": "94545",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://instagram.com/4kphotoz",
                "https://facebook.com/4kphotoz",
                "https://tiktok.com/@4kphotoz",
                "https://youtube.com/@4kphotoz",
                "https://linkedin.com/company/4kphotoz"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
