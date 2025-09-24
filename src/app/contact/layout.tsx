import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact 4kphotoz LLC | Professional Photography & Print Services | Hayward California",
  description: "Contact 4kphotoz LLC for professional photography, graphic design, print lab, and photo booth services. Located in Hayward, California. Call (510) 828-1061 or email info@4kphotoz.com for fast quotes.",
  keywords: [
    "contact 4kphotoz",
    "photography services Hayward",
    "print lab Hayward California",
    "graphic design Hayward",
    "photo booth rental Hayward",
    "4kphotoz phone number",
    "4kphotoz email",
    "photography studio Hayward",
    "print services Hayward",
    "professional photographer Hayward",
    "graphic designer Hayward",
    "photo booth rental Hayward",
    "4kphotoz address",
    "photography quote California",
    "print quote Bay Area",
    "design quote California",
    "photo booth quote Hayward",
    "professional services Hayward",
    "creative services California",
    "visual services Bay Area"
  ],
  openGraph: {
    title: "Contact 4kphotoz LLC | Professional Photography & Print Services | Hayward California",
    description: "Contact 4kphotoz LLC for professional photography, graphic design, print lab, and photo booth services. Located in Hayward, California. Call (510) 828-1061 or email info@4kphotoz.com for fast quotes.",
    url: "https://4kphotoz.com/contact",
    images: [
      {
        url: "https://4kphotoz.com/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact 4kphotoz LLC - Professional Photography & Print Services in Hayward California",
      },
    ],
  },
  twitter: {
    title: "Contact 4kphotoz LLC | Professional Photography & Print Services | Hayward California",
    description: "Contact 4kphotoz LLC for professional photography, graphic design, print lab, and photo booth services. Located in Hayward, California.",
    images: ["https://4kphotoz.com/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://4kphotoz.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
