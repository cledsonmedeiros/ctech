<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Gerador de Senhas</h1>
    <p class="text-gray-600 mb-8">Gere senhas seguras e personalizáveis.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Configurações -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Comprimento da senha -->
          <div>
            <label for="length" class="block text-sm font-medium text-gray-700 mb-2">
              Comprimento: {{ length }} caracteres
            </label>
            <input
              id="length"
              v-model.number="length"
              type="range"
              min="4"
              max="128"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>128</span>
            </div>
          </div>

          <!-- Quantidade de senhas -->
          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
              Quantidade de senhas
            </label>
            <input
              id="quantity"
              v-model.number="quantity"
              type="number"
              min="1"
              max="50"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Opções de caracteres -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Tipos de caracteres
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                v-model="includeUppercase"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-3 text-sm text-gray-700">
                Maiúsculas (A-Z)
              </span>
            </label>

            <label class="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                v-model="includeLowercase"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-3 text-sm text-gray-700">
                Minúsculas (a-z)
              </span>
            </label>

            <label class="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                v-model="includeNumbers"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-3 text-sm text-gray-700">
                Números (0-9)
              </span>
            </label>

            <label class="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                v-model="includeSymbols"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-3 text-sm text-gray-700">
                Símbolos (!@#$%&*)
              </span>
            </label>
          </div>
        </div>

        <!-- Opções avançadas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Opções avançadas
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="excludeSimilar"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">
                Excluir caracteres similares (i, l, 1, L, o, 0, O)
              </span>
            </label>

            <label class="flex items-center">
              <input
                v-model="excludeAmbiguous"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">
                Excluir caracteres ambíguos ({`{`, `}`, `[`, `]`, `(`, `)`, `/`, `\\`, `'`, `"`, `` ` ``, `~`, `,`, `;`, `:`, `.`, `<`, `>`})
              </span>
            </label>
          </div>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Botão de gerar -->
        <div>
          <button
            @click="generatePasswords"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            🔐 Gerar Senhas
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="passwords.length > 0">
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">
              Senhas geradas ({{ passwords.length }})
            </label>
            <button
              @click="copyAllPasswords"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
            >
              {{ copiedAll ? 'Copiado!' : 'Copiar Todas' }}
            </button>
          </div>

          <div class="space-y-2 max-h-96 overflow-y-auto">
            <div
              v-for="(password, index) in passwords"
              :key="index"
              class="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md group"
            >
              <code class="flex-1 font-mono text-sm break-all">{{ password }}</code>
              <button
                @click="copyPassword(password, index)"
                class="shrink-0 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
              >
                {{ copiedIndex === index ? '✓' : 'Copiar' }}
              </button>
            </div>
          </div>

          <!-- Indicador de força -->
          <div v-if="passwords.length > 0" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Força da senha:</span>
              <span class="text-sm font-bold" :class="strengthColor">{{ strengthText }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :class="strengthBarColor"
                :style="{ width: `${strengthPercentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const length = ref(28)
const quantity = ref(1)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const excludeSimilar = ref(true)
const excludeAmbiguous = ref(true)
const passwords = ref<string[]>([])
const copiedIndex = ref<number | null>(null)
const copiedAll = ref(false)
const errorMessage = ref('')

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SIMILAR = 'il1Lo0O'
const AMBIGUOUS = '{}[]()/\\\'"`~,;:.<>'

const getCharacterSet = (): string => {
  let charset = ''
  
  if (includeUppercase.value) charset += UPPERCASE
  if (includeLowercase.value) charset += LOWERCASE
  if (includeNumbers.value) charset += NUMBERS
  if (includeSymbols.value) charset += SYMBOLS
  
  if (excludeSimilar.value) {
    charset = charset.split('').filter(char => !SIMILAR.includes(char)).join('')
  }
  
  if (excludeAmbiguous.value) {
    charset = charset.split('').filter(char => !AMBIGUOUS.includes(char)).join('')
  }
  
  return charset
}

const generatePassword = (charset: string, len: number): string => {
  const array = new Uint32Array(len)
  crypto.getRandomValues(array)
  
  let password = ''
  for (let i = 0; i < len; i++) {
    password += charset[array[i] % charset.length]
  }
  
  return password
}

const calculateStrength = (password: string): number => {
  let strength = 0
  
  // Comprimento
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 20
  if (password.length >= 16) strength += 20
  
  // Variedade de caracteres
  if (/[a-z]/.test(password)) strength += 10
  if (/[A-Z]/.test(password)) strength += 10
  if (/[0-9]/.test(password)) strength += 10
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10
  
  return Math.min(strength, 100)
}

const strengthPercentage = computed(() => {
  if (passwords.value.length === 0) return 0
  return calculateStrength(passwords.value[0])
})

const strengthText = computed(() => {
  const strength = strengthPercentage.value
  if (strength < 40) return 'Fraca'
  if (strength < 60) return 'Média'
  if (strength < 80) return 'Forte'
  return 'Muito Forte'
})

const strengthColor = computed(() => {
  const strength = strengthPercentage.value
  if (strength < 40) return 'text-red-600'
  if (strength < 60) return 'text-yellow-600'
  if (strength < 80) return 'text-blue-600'
  return 'text-green-600'
})

const strengthBarColor = computed(() => {
  const strength = strengthPercentage.value
  if (strength < 40) return 'bg-red-500'
  if (strength < 60) return 'bg-yellow-500'
  if (strength < 80) return 'bg-blue-500'
  return 'bg-green-500'
})

const generatePasswords = () => {
  errorMessage.value = ''
  
  // Validações
  if (!includeUppercase.value && !includeLowercase.value && !includeNumbers.value && !includeSymbols.value) {
    errorMessage.value = 'Selecione pelo menos um tipo de caractere'
    return
  }
  
  const charset = getCharacterSet()
  
  if (charset.length === 0) {
    errorMessage.value = 'Nenhum caractere disponível com as opções selecionadas'
    return
  }
  
  if (length.value < 4) {
    errorMessage.value = 'O comprimento mínimo é 4 caracteres'
    return
  }
  
  const count = Math.min(Math.max(quantity.value, 1), 50)
  const generatedPasswords: string[] = []
  
  for (let i = 0; i < count; i++) {
    generatedPasswords.push(generatePassword(charset, length.value))
  }
  
  passwords.value = generatedPasswords
}

const copyPassword = async (password: string, index: number) => {
  try {
    await navigator.clipboard.writeText(password)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}

const copyAllPasswords = async () => {
  try {
    await navigator.clipboard.writeText(passwords.value.join('\n'))
    copiedAll.value = true
    setTimeout(() => {
      copiedAll.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>
