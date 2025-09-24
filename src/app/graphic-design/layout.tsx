import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Graphic Design Services | Logos, Posters, Banners & Social Media | California",
  description: "Professional graphic design services in California. Custom logos, posters, banners, social media graphics, business cards, flyers, and branding design. Unlimited revisions and fast turnaround.",
  keywords: [
    "graphic design services California",
    "logo design Bay Area",
    "poster design California",
    "banner design Hayward",
    "social media graphics California",
    "business card design Bay Area",
    "flyer design California",
    "brochure design services",
    "branding design California",
    "marketing materials design",
    "custom graphics California",
    "print design services Bay Area",
    "web graphics design",
    "vehicle wrap design California",
    "signage design Bay Area",
    "packaging design California",
    "professional graphic designer",
    "creative design services",
    "unlimited revisions design",
    "fast graphic design turnaround"
  ],
  openGraph: {
    title: "Professional Graphic Design Services | Logos, Posters, Banners & Social Media | California",
    description: "Professional graphic design services in California. Custom logos, posters, banners, social media graphics, business cards, flyers, and branding design. Unlimited revisions and fast turnaround.",
    url: "https://4kphotoz.com/graphic-design",
    images: [
      {
        url: "https://4kphotoz.com/graphic-design-og.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Graphic Design Services - Logos, Posters, Banners & Social Media in California",
      },
    ],
  },
  twitter: {
    title: "Professional Graphic Design Services | Logos, Posters, Banners & Social Media | California",
    description: "Professional graphic design services in California. Custom logos, posters, banners, social media graphics, business cards, flyers, and branding design.",
    images: ["https://4kphotoz.com/graphic-design-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.com/graphic-design",
  },
};

export default function GraphicDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
