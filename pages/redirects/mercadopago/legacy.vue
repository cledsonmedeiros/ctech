<script setup lang="ts">
definePageMeta({
  layout: false
})
const route = useRoute()
const router = useRouter()

interface ProcessingState {
  isLoading: boolean
  error: string | null
  errorDetails: Record<string, any> | null
}

const state = reactive<ProcessingState>({
  isLoading: true,
  error: null,
  errorDetails: null
})

const validateQueryParams = (): { code: string; state: string } | null => {
  const { code, state: queryState } = route.query

  if (!code || typeof code !== 'string') {
    return null
  }

  if (!queryState || typeof queryState !== 'string') {
    return null
  }

  return { code, state: queryState }
}

const processLegacyAuth = async () => {
  const params = validateQueryParams()

  if (!params) {
    state.error = 'Parâmetros inválidos: code e state são obrigatórios'
    state.isLoading = false
    return
  }

  try {
    const response = await $fetch('/api/mercadopago/legacy', {
      method: 'POST',
      body: {
        code: params.code,
        state: params.state
      },
      redirect: 'manual'
    })

    // Log para debug
    console.log('Response recebida:', response)

    // Se chegou aqui, o servidor pode ter retornado dados em vez de redirect
    // Vamos verificar se há uma URL de redirect no response
    if (response && typeof response === 'object' && 'redirectUrl' in response) {
      window.location.href = (response as any).redirectUrl
    } else {
      state.error = 'Resposta inesperada do servidor'
      state.errorDetails = {
        message: 'A resposta não contém redirectUrl',
        receivedResponse: response
      }
      state.isLoading = false
    }
  } catch (error: any) {
    state.isLoading = false

    // Log para debug
    console.error('Erro capturado:', error)
    console.log('Error status:', error.statusCode, error.status)
    console.log('Error data:', error.data)

    // Se for um erro de redirect (303), o fetch vai lançar um erro
    // mas queremos seguir o redirect
    if (error.statusCode === 303 || error.status === 303) {
      const redirectUrl = error.data?.redirectUrl || error.response?.headers?.get('location')
      if (redirectUrl) {
        window.location.href = redirectUrl
        return
      }
    }

    state.error = error.data?.message || error.message || 'Erro ao processar autenticação'
    state.errorDetails = {
      statusCode: error.statusCode || error.status,
      message: error.message,
      data: error.data,
      fullError: error
    }
  }
}

onMounted(() => {
  processLegacyAuth()
})
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Loading State -->
      <div v-if="state.isLoading" class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div class="text-center space-y-2">
            <h2 class="text-2xl font-bold text-gray-900">
              Processando autenticação
            </h2>
            <p class="text-gray-600">
              Aguarde enquanto validamos suas credenciais...
            </p>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div class="bg-linear-to-r from-blue-500 to-purple-600 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="state.error" class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div class="text-center space-y-2">
            <h2 class="text-2xl font-bold text-gray-900">
              Erro no processamento
            </h2>
            <p class="text-red-600 font-medium">
              {{ state.error }}
            </p>
          </div>

          <!-- Error Details -->
          <div v-if="state.errorDetails" class="w-full bg-red-50 border border-red-200 rounded-lg p-4">
            <details class="cursor-pointer">
              <summary class="text-sm font-semibold text-red-900 hover:text-red-700">
                Detalhes do erro
              </summary>
              <pre
                class="mt-3 text-xs text-red-800 overflow-x-auto whitespace-pre-wrap">{{ JSON.stringify(state.errorDetails, null, 2) }}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
