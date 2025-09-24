import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Photography Services | Sports, Events & Portraits | Bay Area California",
  description: "Professional photography services in California. Sports photography, event photography, portraits, media day, athletic photography, school photography, and marketing photography. Fast turnaround times.",
  keywords: [
    "professional photography California",
    "sports photography Bay Area",
    "event photography California", 
    "portrait photography Hayward",
    "athletic photography services",
    "media day photography California",
    "school photography Bay Area",
    "little league photography",
    "wedding photography California",
    "corporate photography Bay Area",
    "marketing photography services",
    "branding photography California",
    "fast photography turnaround",
    "professional photographer Hayward",
    "sports action photography",
    "team photography California",
    "senior portrait photography",
    "family photography Bay Area",
    "graduation photography California",
    "dance photography services"
  ],
  openGraph: {
    title: "Professional Photography Services | Sports, Events & Portraits | Bay Area California",
    description: "Professional photography services in California. Sports photography, event photography, portraits, media day, athletic photography, school photography, and marketing photography. Fast turnaround times.",
    url: "https://4kphotoz.vercel.app/photography",
    images: [
      {
        url: "https://4kphotoz.vercel.app/photography-og.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Photography Services - Sports, Events & Portraits in Bay Area California",
      },
    ],
  },
  twitter: {
    title: "Professional Photography Services | Sports, Events & Portraits | Bay Area California",
    description: "Professional photography services in California. Sports photography, event photography, portraits, media day, athletic photography, school photography, and marketing photography.",
    images: ["https://4kphotoz.vercel.app/photography-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.vercel.app/photography",
  },
};

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
