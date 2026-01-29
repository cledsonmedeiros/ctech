<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">UUID Generator</h1>
    <p class="text-gray-600 mb-8">Gere UUIDs (Universally Unique Identifiers) versão 4.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Opções de quantidade -->
        <div>
          <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
            Quantidade de UUIDs
          </label>
          <input
            id="quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Opções de formato -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Formato
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="uppercase"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Maiúsculas</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="withBraces"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Com chaves {}</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="withoutHyphens"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Sem hífens</span>
            </label>
          </div>
        </div>

        <!-- Botão de ação -->
        <div>
          <button
            @click="generateUUIDs"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Gerar UUIDs
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="result">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            UUIDs Gerados
          </label>
          <div class="relative">
            <textarea
              v-model="result"
              :rows="Math.min(quantity, 10)"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono text-sm"
            ></textarea>
            <button
              @click="copyToClipboard"
              class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
            >
              {{ copied ? 'Copiado!' : 'Copiar' }}
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const quantity = ref(1)
const uppercase = ref(false)
const withBraces = ref(false)
const withoutHyphens = ref(false)
const result = ref('')
const copied = ref(false)

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const formatUUID = (uuid: string): string => {
  let formatted = uuid

  if (withoutHyphens.value) {
    formatted = formatted.replace(/-/g, '')
  }

  if (uppercase.value) {
    formatted = formatted.toUpperCase()
  }

  if (withBraces.value) {
    formatted = `{${formatted}}`
  }

  return formatted
}

const generateUUIDs = () => {
  const count = Math.min(Math.max(quantity.value, 1), 100)
  const uuids: string[] = []

  for (let i = 0; i < count; i++) {
    const uuid = generateUUID()
    uuids.push(formatUUID(uuid))
  }

  result.value = uuids.join('\n')
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>
