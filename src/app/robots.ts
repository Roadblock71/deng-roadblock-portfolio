import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://deng-roadblock-portfolio.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Keep your admin panel hidden from Google!
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}