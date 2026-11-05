import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

interface PageSeo {
  /** Título da página (o app.vue acrescenta " | CTECH"). Sem título, usa o padrão do site. */
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  /** Páginas internas ou de teste: fora do Google, mas os links continuam sendo seguidos. */
  noindex?: boolean
}

/** Título, descrição e prévia de link (Open Graph) de uma página. */
export function usePageSeo({ title, description, noindex = false }: PageSeo) {
  useSeoMeta({
    title: () => toValue(title),
    ogTitle: () => toValue(title),
    description: () => toValue(description),
    ogDescription: () => toValue(description),
    robots: noindex ? 'noindex, follow' : undefined,
  })
}
