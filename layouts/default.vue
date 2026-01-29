<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
              CTECH
            </NuxtLink>
          </div>
          <button 
            @click="toggleMenu" 
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <aside 
          :class="[
            'lg:w-64 lg:block',
            menuOpen ? 'block' : 'hidden'
          ]"
        >
          <nav class="bg-white rounded-lg shadow-md p-4 sticky top-8">
            <div v-for="section in navigation" :key="section.title" class="mb-6 last:mb-0">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                {{ section.title }}
              </h3>
              <ul class="space-y-2">
                <li v-for="item in section.items" :key="item.path">
                  <NuxtLink
                    :to="item.path"
                    class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    active-class="bg-blue-100 text-blue-700 font-medium"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
          <slot />
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} CTech. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { navigationItems } from '~/config/navigation'

const navigation = navigationItems
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
</style>
