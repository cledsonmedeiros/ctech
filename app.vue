<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { site } from '~/config/site'

const route = useRoute()
// Endereço canônico sem barra final (exceto a home) e sem query string.
const canonical = computed(() => site.url + (route.path === '/' ? '/' : route.path.replace(/\/+$/, '')))

// Padrões do site inteiro; cada página sobrescreve com usePageSeo().
useHead({
  titleTemplate: (title?: string) => (title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`),
  link: [{ rel: 'canonical', href: canonical }],
})

useSeoMeta({
  description: site.description,
  ogDescription: site.description,
  ogTitle: `${site.name} — ${site.tagline}`,
  ogSiteName: site.name,
  ogType: 'website',
  ogLocale: site.locale,
  ogUrl: canonical,
  ogImage: `${site.url}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Logo da CTECH',
  twitterCard: 'summary_large_image',
})
</script>
