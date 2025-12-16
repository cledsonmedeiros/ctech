<template>
  <div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Ferramentas & Utilitários</h1>
    <p class="text-lg text-gray-600 mb-8">
      Uma coleção de ferramentas úteis para desenvolvedores.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="section in navigation" :key="section.title">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ section.title }}</h2>
        <div class="space-y-3">
          <NuxtLink
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
          >
            <h3 class="font-medium text-gray-900 mb-1">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigationItems } from '~/config/navigation'

const navigation = navigationItems
</script>

<style>
</style>
