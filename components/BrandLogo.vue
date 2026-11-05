<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2.5" :aria-label="`${site.name} — página inicial`">
    <img src="/icon.svg" :width="size" :height="size" alt="" class="block" />
    <span
      class="font-extrabold tracking-tight"
      :class="[dark ? 'text-white' : 'text-gray-900', textClass]"
    >{{ site.name }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { site } from '~/config/site'

withDefaults(defineProps<{ size?: number; dark?: boolean; textClass?: string }>(), {
  size: 32,
  dark: false,
  textClass: 'text-2xl',
})
</script>
