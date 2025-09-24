import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photo Gallery | Professional Photography Portfolio | 4kphotoz LLC California",
  description: "Browse our professional photography gallery showcasing sports photography, event photography, portraits, media day, athletic photography, and marketing photography. High-quality images from 4kphotoz LLC in California.",
  keywords: [
    "photography gallery California",
    "professional photography portfolio Bay Area",
    "sports photography gallery California",
    "event photography portfolio Bay Area",
    "portrait photography gallery California",
    "athletic photography portfolio",
    "media day photography gallery",
    "school photography portfolio California",
    "wedding photography gallery Bay Area",
    "corporate photography portfolio California",
    "marketing photography gallery",
    "branding photography portfolio California",
    "4kphotoz gallery",
    "photography examples California",
    "professional photographer portfolio Bay Area",
    "photography showcase California",
    "visual portfolio Bay Area",
    "photography samples California",
    "creative photography gallery",
    "photography work examples"
  ],
  openGraph: {
    title: "Photo Gallery | Professional Photography Portfolio | 4kphotoz LLC California",
    description: "Browse our professional photography gallery showcasing sports photography, event photography, portraits, media day, athletic photography, and marketing photography. High-quality images from 4kphotoz LLC in California.",
    url: "https://4kphotoz.vercel.app/gallery",
    images: [
      {
        url: "https://4kphotoz.vercel.app/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Gallery - Professional Photography Portfolio from 4kphotoz LLC California",
      },
    ],
  },
  twitter: {
    title: "Photo Gallery | Professional Photography Portfolio | 4kphotoz LLC California",
    description: "Browse our professional photography gallery showcasing sports photography, event photography, portraits, media day, athletic photography, and marketing photography.",
    images: ["https://4kphotoz.vercel.app/gallery-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.vercel.app/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
