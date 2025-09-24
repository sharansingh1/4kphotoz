import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photo Booth Rental Services | Mirror Booth & Stationary Booth | Bay Area California",
  description: "Professional photo booth rental services in California. Mirror photo booth ($75/hour) and stationary photo booth ($100/hour) with photographer. Perfect for weddings, parties, corporate events, and celebrations.",
  keywords: [
    "photo booth rental California",
    "mirror photo booth Bay Area",
    "stationary photo booth California",
    "photo booth rental Hayward",
    "wedding photo booth California",
    "corporate photo booth Bay Area",
    "party photo booth California",
    "event photo booth services",
    "photo booth rental pricing",
    "instant photo booth California",
    "professional photo booth Bay Area",
    "photo booth with photographer",
    "custom photo booth California",
    "photo booth props California",
    "digital photo booth Bay Area",
    "photo booth gallery California",
    "photo booth rental packages",
    "photo booth for events California",
    "photo booth rental near me",
    "affordable photo booth California"
  ],
  openGraph: {
    title: "Photo Booth Rental Services | Mirror Booth & Stationary Booth | Bay Area California",
    description: "Professional photo booth rental services in California. Mirror photo booth ($75/hour) and stationary photo booth ($100/hour) with photographer. Perfect for weddings, parties, corporate events, and celebrations.",
    url: "https://4kphotoz.vercel.app/photo-booth",
    images: [
      {
        url: "https://4kphotoz.vercel.app/photo-booth-og.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Booth Rental Services - Mirror Booth & Stationary Booth in Bay Area California",
      },
    ],
  },
  twitter: {
    title: "Photo Booth Rental Services | Mirror Booth & Stationary Booth | Bay Area California",
    description: "Professional photo booth rental services in California. Mirror photo booth ($75/hour) and stationary photo booth ($100/hour) with photographer.",
    images: ["https://4kphotoz.vercel.app/photo-booth-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.vercel.app/photo-booth",
  },
};

export default function PhotoBoothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
