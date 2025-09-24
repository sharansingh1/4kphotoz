import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Print Lab Services | Banners, Posters, Business Cards & Custom Printing | California",
  description: "Professional print lab services in California. High-quality banner printing, poster printing, business cards, stickers, flyers, brochures, and custom printing. Fast 24-48 hour turnaround.",
  keywords: [
    "print lab services California",
    "banner printing Bay Area",
    "poster printing California",
    "business card printing Hayward",
    "sticker printing California",
    "flyer printing Bay Area",
    "brochure printing California",
    "custom printing services",
    "large format printing California",
    "vinyl banner printing Bay Area",
    "poster printing services",
    "business card design printing",
    "sticker and decal printing",
    "marketing materials printing",
    "promotional printing California",
    "rush printing services Bay Area",
    "high quality printing California",
    "professional print lab Hayward",
    "fast printing turnaround",
    "custom size printing California"
  ],
  openGraph: {
    title: "Professional Print Lab Services | Banners, Posters, Business Cards & Custom Printing | California",
    description: "Professional print lab services in California. High-quality banner printing, poster printing, business cards, stickers, flyers, brochures, and custom printing. Fast 24-48 hour turnaround.",
    url: "https://4kphotoz.com/print-lab",
    images: [
      {
        url: "https://4kphotoz.com/print-lab-og.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Print Lab Services - Banners, Posters, Business Cards & Custom Printing in California",
      },
    ],
  },
  twitter: {
    title: "Professional Print Lab Services | Banners, Posters, Business Cards & Custom Printing | California",
    description: "Professional print lab services in California. High-quality banner printing, poster printing, business cards, stickers, flyers, brochures, and custom printing.",
    images: ["https://4kphotoz.com/print-lab-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.com/print-lab",
  },
};

export default function PrintLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
