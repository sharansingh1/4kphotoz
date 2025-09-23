import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photo Gallery - 4kphotoz LLC",
  description: "Browse our complete photography portfolio across all services - Portraits, Events, Media Day, Sports Action, and Marketing & Branding.",
  keywords: "photo gallery, photography portfolio, portraits, events, sports photography, media day, marketing photography, California, Bay Area",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
