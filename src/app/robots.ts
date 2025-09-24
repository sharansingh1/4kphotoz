import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/moreau-catholic/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/moreau-catholic/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/moreau-catholic/'],
      },
    ],
    sitemap: 'https://4kphotoz.vercel.app/sitemap.xml',
    host: 'https://4kphotoz.vercel.app',
  }
}
