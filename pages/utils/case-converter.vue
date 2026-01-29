<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Case Converter</h1>
    <p class="text-gray-600 mb-8">Converta texto entre diferentes formatos de nomenclatura.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Textarea para entrada -->
        <div>
          <label for="input" class="block text-sm font-medium text-gray-700 mb-2">
            Texto de entrada
          </label>
          <textarea
            id="input"
            v-model="inputText"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Digite o texto aqui..."
          ></textarea>
        </div>

        <!-- Botões de ação -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            @click="pasteFromClipboard"
            class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Colar
          </button>
          <button
            @click="convert('camel')"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            camelCase
          </button>
          <button
            @click="convert('pascal')"
            class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            PascalCase
          </button>
          <button
            @click="convert('snake')"
            class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            snake_case
          </button>
          <button
            @click="convert('kebab')"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            kebab-case
          </button>
          <button
            @click="convert('constant')"
            class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            CONSTANT_CASE
          </button>
          <button
            @click="convert('lower')"
            class="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            lowercase
          </button>
          <button
            @click="convert('upper')"
            class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            UPPERCASE
          </button>
          <button
            @click="convert('title')"
            class="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Title Case
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="result !== null">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Resultado
          </label>
          <div class="relative">
            <textarea
              v-model="result"
              rows="4"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono"
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

const inputText = ref('')
const result = ref<string | null>(null)
const copied = ref(false)

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    inputText.value = text
  } catch (err) {
    console.error('Erro ao colar:', err)
  }
}

const splitWords = (text: string): string[] => {
  // Separa por espaços, underscores, hífens e mudanças de case
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0)
}

const convert = (caseType: string) => {
  if (!inputText.value.trim()) {
    result.value = ''
    return
  }

  const words = splitWords(inputText.value)

  switch (caseType) {
    case 'camel':
      result.value = words
        .map((word, index) => 
          index === 0 
            ? word.toLowerCase() 
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('')
      break

    case 'pascal':
      result.value = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')
      break

    case 'snake':
      result.value = words.map(word => word.toLowerCase()).join('_')
      break

    case 'kebab':
      result.value = words.map(word => word.toLowerCase()).join('-')
      break

    case 'constant':
      result.value = words.map(word => word.toUpperCase()).join('_')
      break

    case 'lower':
      result.value = inputText.value.toLowerCase()
      break

    case 'upper':
      result.value = inputText.value.toUpperCase()
      break

    case 'title':
      result.value = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
      break

    default:
      result.value = inputText.value
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value || '')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>
