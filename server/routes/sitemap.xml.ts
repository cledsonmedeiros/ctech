import { navigationItems } from '../../config/navigation'
import { site } from '../../config/site'

// Só páginas públicas; as de teste do Mercado Pago e os redirecionamentos ficam de fora (noindex).
const STATIC_PATHS = ['/', '/utils', '/replaycam/privacidade']

export default defineEventHandler((event) => {
  const paths = [...STATIC_PATHS, ...navigationItems.flatMap((section) => section.items.map((item) => item.path))]
  const urls = [...new Set(paths)]
    .map((path) => `  <url><loc>${site.url}${path === '/' ? '/' : path}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
