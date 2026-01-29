<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Extrair Números</h1>
    <p class="text-gray-600 mb-8">Extraia apenas os números de um texto, removendo letras, espaços e símbolos.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Textarea para entrada de texto -->
        <div>
          <label for="input" class="block text-sm font-medium text-gray-700 mb-2">
            Texto original
          </label>
          <textarea
            id="input"
            v-model="inputText"
            rows="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Digite ou cole o texto aqui..."
          ></textarea>
        </div>

        <!-- Botões de ação -->
        <div class="flex gap-3">
          <button
            @click="pasteFromClipboard"
            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Colar da Área de Transferência
          </button>
          <button
            @click="extractNumbers"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Extrair Números
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="result !== null">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Resultado (apenas números)
          </label>
          <div class="relative">
            <textarea
              v-model="result"
              rows="8"
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
    console.error('Erro ao colar da área de transferência:', err)
    alert('Não foi possível colar da área de transferência. Verifique as permissões do navegador.')
  }
}

const extractNumbers = () => {
  if (!inputText.value) {
    result.value = ''
    return
  }

  // Remove tudo que não for número (0-9)
  const numbers = inputText.value.replace(/[^0-9]/g, '')
  result.value = numbers
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

<style>

</style>
