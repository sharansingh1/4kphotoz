import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/moreau-catholic/'],
    },
    sitemap: 'https://4kphotoz.com/sitemap.xml',
  }
}
