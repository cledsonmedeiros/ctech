<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">String Concat</h1>
    <p class="text-gray-600 mb-8">Concatene e formate linhas de texto com caracteres personalizados.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Textarea para entrada de linhas -->
        <div>
          <label for="lines" class="block text-sm font-medium text-gray-700 mb-2">
            Linhas de texto
          </label>
          <textarea
            id="lines"
            v-model="inputLines"
            rows="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Digite as linhas aqui..."
          ></textarea>
        </div>

        <!-- Input para o caractere -->
        <div>
          <label for="character" class="block text-sm font-medium text-gray-700 mb-2">
            Caractere para envolver
          </label>
          <input
            id="character"
            v-model="wrapCharacter"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: aspas simples ou duplas"
          />
        </div>

        <!-- Checkbox para adicionar vírgula -->
        <div class="flex items-center">
          <input
            id="addComma"
            v-model="addComma"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="addComma" class="ml-2 block text-sm text-gray-700">
            Adicionar vírgula no final de cada linha
          </label>
        </div>

        <!-- Checkbox para não adicionar vírgula na última linha -->
        <div class="flex items-center ml-6" v-if="addComma">
          <input
            id="skipLastComma"
            v-model="skipLastComma"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="skipLastComma" class="ml-2 block text-sm text-gray-700">
            Não adicionar vírgula na última linha
          </label>
        </div>

        <!-- Checkbox para remover duplicadas -->
        <div class="flex items-center">
          <input
            id="removeDuplicates"
            v-model="removeDuplicates"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="removeDuplicates" class="ml-2 block text-sm text-gray-700">
            Remover linhas duplicadas
          </label>
        </div>

        <!-- Botão de ação -->
        <div>
          <button
            @click="processLines"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Processar
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="result">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Resultado
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

const inputLines = ref('')
const wrapCharacter = ref("")
const addComma = ref(true)
const skipLastComma = ref(true)
const removeDuplicates = ref(true)
const result = ref('')
const copied = ref(false)

const processLines = () => {
  if (!inputLines.value.trim()) {
    return
  }

  let lines = inputLines.value.split('\n')
  
  // Remover duplicadas se opção estiver marcada
  if (removeDuplicates.value) {
    lines = [...new Set(lines)]
  }
  
  const processedLines = lines.map((line, index) => {
    if (!line.trim()) {
      return line
    }

    let processed = `${wrapCharacter.value}${line}${wrapCharacter.value}`
    
    // Adicionar vírgula conforme as opções
    if (addComma.value) {
      const isLastLine = index === lines.length - 1
      if (!isLastLine || !skipLastComma.value) {
        processed += ','
      }
    }
    
    return processed
  })

  result.value = processedLines.join('\n')
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

<style>

</style>