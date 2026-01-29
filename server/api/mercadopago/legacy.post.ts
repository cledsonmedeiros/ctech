export default defineEventHandler(async (event) => {
  // Determina a base URL de acordo com o ambiente
  // import.meta.dev é true em desenvolvimento e false em produção
  const baseUrl = import.meta.dev
    ? 'http://localhost:14567'
    : 'https://api.acoes.cc'

  const targetUrl = `${baseUrl}/v1/usuarios/supplier/legacy`
  console.log('🚀 Tentando conectar em:', targetUrl)

  try {
    // Valida o body da request
    const body = await readBody(event)

    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Body da requisição inválido'
      })
    }

    const { code, state } = body

    if (!code || typeof code !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Parâmetro "code" é obrigatório'
      })
    }

    if (!state || typeof state !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Parâmetro "state" é obrigatório'
      })
    }

    const query = {
      supplier: 'mercadopago',
      supplier_variant: 'legacy',
      app_key: 'CTECH_GENERIC_SUPPLIERS',
      code,
      state
    }

    // Faz a requisição para a API externa
    console.log('📤 Enviando requisição com:', query)

    const response = await $fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      query,
      // Não seguir redirects automaticamente para capturar o status 303
      redirect: 'manual',
      // Ignora erros de redirect para podermos tratar manualmente
      ignoreResponseError: true
    })

    console.log('📥 Resposta recebida:', response)

    // Se a resposta for uma string de redirect (303 See Other)
    if (typeof response === 'string' && response.includes('Redirecting to')) {
      // Extrai a URL da string usando regex
      const match = response.match(/Redirecting to (.+)/)
      if (match && match[1]) {
        const redirectUrl = match[1]
        console.log('✅ URL de redirect extraída:', redirectUrl)
        
        return {
          statusCode: 303,
          redirectUrl
        }
      }
    }

    // Se a resposta já contiver redirectUrl
    if (response && typeof response === 'object' && 'redirectUrl' in response) {
      return response
    }

    // Se a API externa retornar sucesso mas não for redirect,
    // retornamos a resposta como está
    return response
  } catch (error: any) {
    // Trata erros de fetch
    if (error.response) {
      const status = error.response.status || error.statusCode

      // Status 303 (See Other) é o sucesso esperado com redirect
      if (status === 303) {
        const redirectUrl = error.response.headers.get('location')

        if (!redirectUrl) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'URL de redirecionamento não encontrada na resposta'
          })
        }

        // Retorna o status 303 e a URL de redirect para o cliente
        setResponseStatus(event, 303)
        setResponseHeader(event, 'Location', redirectUrl)

        return {
          statusCode: 303,
          redirectUrl
        }
      }

      // Para outros erros, tenta extrair o body da resposta
      let errorBody = null
      try {
        errorBody = await error.response.json()
      } catch {
        // Se não conseguir fazer parse do JSON, tenta como texto
        try {
          errorBody = await error.response.text()
        } catch {
          // Se falhar completamente, deixa null
        }
      }

      throw createError({
        statusCode: status,
        statusMessage: error.response.statusText || 'Erro na API externa',
        message: errorBody?.message || 'Erro ao processar autenticação',
        data: errorBody
      })
    }

    // Erro de conexão ou outro erro não relacionado a HTTP
    if (error.cause?.code === 'ECONNREFUSED') {
      throw createError({
        statusCode: 503,
        statusMessage: 'Service Unavailable',
        message: 'Não foi possível conectar à API externa'
      })
    }

    // Propaga outros erros já tratados
    if (error.statusCode) {
      throw error
    }

    // Erro genérico
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Erro interno do servidor',
      data: error.data || null
    })
  }
})
