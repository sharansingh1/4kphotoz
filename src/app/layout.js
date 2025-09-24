import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";

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
  title: {
    default: "4kphotoz LLC - Professional Photography & Print Services | Bay Area California",
    template: "%s | 4kphotoz LLC - Professional Photography & Print Services"
  },
  description: "Professional photography, graphic design, print lab, and photo booth rentals in California. Serving Bay Area with blazing fast turnaround times. Sports photography, event photography, portraits, banners, posters, and more.",
  keywords: [
    "photography services California",
    "Bay Area photographer", 
    "professional photography Hayward",
    "sports photography California",
    "event photography Bay Area",
    "portrait photography California",
    "graphic design services",
    "print lab California",
    "photo booth rental Bay Area",
    "banner printing California",
    "poster printing Hayward",
    "business card printing",
    "school photography California",
    "athletic photography",
    "media day photography",
    "little league photography",
    "wedding photography Bay Area",
    "corporate photography California",
    "marketing photography",
    "branding photography",
    "custom printing services",
    "fast turnaround photography",
    "professional print lab",
    "photo booth rental California",
    "mirror photo booth",
    "stationary photo booth",
    "digital photography services",
    "print design California",
    "visual marketing services",
    "creative photography studio"
  ],
  authors: [{ name: "4kphotoz LLC" }],
  creator: "4kphotoz LLC",
  publisher: "4kphotoz LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://4kphotoz.vercel.app",
    siteName: "4kphotoz LLC",
    title: "4kphotoz LLC - Professional Photography & Print Services | Bay Area California",
    description: "Professional photography, graphic design, print lab, and photo booth rentals in California. Serving Bay Area with blazing fast turnaround times. Sports photography, event photography, portraits, banners, posters, and more.",
    images: [
      {
        url: "https://4kphotoz.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "4kphotoz LLC - Professional Photography & Print Services in Bay Area California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4kphotoz LLC - Professional Photography & Print Services | Bay Area California",
    description: "Professional photography, graphic design, print lab, and photo booth rentals in California. Serving Bay Area with blazing fast turnaround times.",
    images: ["https://4kphotoz.vercel.app/og-image.jpg"],
    creator: "@4kphotoz",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ff6b35",
  alternates: {
    canonical: "https://4kphotoz.vercel.app",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code from Google Search Console
  },
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
              "description": "Professional photography, graphic design, print lab, and photo booth rental services serving California with blazing fast turnaround times",
              "url": "https://4kphotoz.vercel.app",
              "logo": "https://4kphotoz.vercel.app/logo.png",
              "image": "https://4kphotoz.vercel.app/og-image.jpg",
              "foundingDate": "2020",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-510-828-1061",
                  "contactType": "customer service",
                  "email": "info@4kphotoz.com",
                  "availableLanguage": "English"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-510-828-1061",
                  "contactType": "sales",
                  "email": "support@4kphotoz.com",
                  "availableLanguage": "English"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "25509 Industrial Blvd, O10",
                "addressLocality": "Hayward",
                "addressRegion": "CA",
                "postalCode": "94545",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "37.6688",
                "longitude": "-122.0808"
              },
              "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 10:00-16:00"
              ],
              "priceRange": "$$",
              "areaServed": [
                {
                  "@type": "State",
                  "name": "California"
                },
                {
                  "@type": "City",
                  "name": "Hayward"
                },
                {
                  "@type": "City", 
                  "name": "San Francisco"
                },
                {
                  "@type": "City",
                  "name": "Oakland"
                },
                {
                  "@type": "City",
                  "name": "San Jose"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "37.6688",
                  "longitude": "-122.0808"
                },
                "geoRadius": "100000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Photography and Print Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Professional Photography",
                      "description": "Sports photography, event photography, portraits, media day, athletic photography, school photography, and marketing photography"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Graphic Design",
                      "description": "Logo design, poster design, banner design, social media graphics, business cards, flyers, and branding design"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Print Lab Services",
                      "description": "Banner printing, poster printing, business cards, stickers, flyers, brochures, and custom printing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Photo Booth Rental",
                      "description": "Mirror photo booth and stationary photo booth rental for events, weddings, parties, and corporate events"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://instagram.com/4kphotoz", // Update with actual Instagram URL
                "https://facebook.com/4kphotoz", // Update with actual Facebook URL
                "https://tiktok.com/@4kphotoz", // Update with actual TikTok URL
                "https://youtube.com/@4kphotoz", // Update with actual YouTube URL
                "https://linkedin.com/company/4kphotoz" // Update with actual LinkedIn URL
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
