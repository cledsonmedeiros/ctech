<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">JSON Formatter</h1>
    <p class="text-gray-600 mb-8">Formate, valide e minifique JSON.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Textarea para entrada -->
        <div>
          <label for="input" class="block text-sm font-medium text-gray-700 mb-2">
            JSON de entrada
          </label>
          <textarea
            id="input"
            v-model="inputText"
            rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder='{"exemplo": "cole seu JSON aqui"}'
          ></textarea>
        </div>

        <!-- Opções de indentação -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Indentação
          </label>
          <div class="flex gap-3">
            <label class="flex items-center">
              <input
                v-model="indentation"
                type="radio"
                value="2"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span class="ml-2 text-sm text-gray-700">2 espaços</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="indentation"
                type="radio"
                value="4"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span class="ml-2 text-sm text-gray-700">4 espaços</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="indentation"
                type="radio"
                value="tab"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span class="ml-2 text-sm text-gray-700">Tab</span>
            </label>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex gap-3">
          <button
            @click="pasteFromClipboard"
            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Colar
          </button>
          <button
            @click="formatJSON"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Formatar
          </button>
          <button
            @click="minifyJSON"
            class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Minificar
          </button>
        </div>

        <!-- Status de validação -->
        <div v-if="validationMessage" class="p-3 rounded-md" :class="isValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
          <p class="text-sm font-medium">{{ validationMessage }}</p>
        </div>

        <!-- Resultado -->
        <div v-if="result !== null">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Resultado
          </label>
          <div class="relative">
            <textarea
              v-model="result"
              rows="10"
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

const inputText = ref('')
const result = ref<string | null>(null)
const copied = ref(false)
const indentation = ref('2')
const validationMessage = ref('')
const isValid = ref(false)

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    inputText.value = text
  } catch (err) {
    console.error('Erro ao colar:', err)
  }
}

const formatJSON = () => {
  if (!inputText.value.trim()) {
    validationMessage.value = 'Por favor, insira um JSON'
    isValid.value = false
    return
  }

  try {
    const parsed = JSON.parse(inputText.value)
    const indent = indentation.value === 'tab' ? '\t' : parseInt(indentation.value)
    result.value = JSON.stringify(parsed, null, indent)
    validationMessage.value = '✓ JSON válido'
    isValid.value = true
  } catch (err: any) {
    result.value = null
    validationMessage.value = `✗ Erro: ${err.message}`
    isValid.value = false
  }
}

const minifyJSON = () => {
  if (!inputText.value.trim()) {
    validationMessage.value = 'Por favor, insira um JSON'
    isValid.value = false
    return
  }

  try {
    const parsed = JSON.parse(inputText.value)
    result.value = JSON.stringify(parsed)
    validationMessage.value = '✓ JSON válido e minificado'
    isValid.value = true
  } catch (err: any) {
    result.value = null
    validationMessage.value = `✗ Erro: ${err.message}`
    isValid.value = false
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
