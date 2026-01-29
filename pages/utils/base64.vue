<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Base64 Encoder/Decoder</h1>
    <p class="text-gray-600 mb-8">Codifique ou decodifique texto e arquivos em Base64.</p>
    
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Upload de arquivo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Upload de arquivo
          </label>
          <div class="flex items-center gap-3">
            <label class="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Selecionar arquivo
              <input
                type="file"
                @change="handleFileUpload"
                class="hidden"
              />
            </label>
            <button
              v-if="fileName"
              @click="clearFile"
              class="px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              Limpar
            </button>
          </div>
          <p v-if="fileName" class="mt-2 text-sm text-gray-600">
            📁 {{ fileName }} ({{ fileSize }})
          </p>
        </div>

        <!-- Divisor -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <!-- Textarea para entrada -->
        <div>
          <label for="input" class="block text-sm font-medium text-gray-700 mb-2">
            Texto de entrada
          </label>
          <textarea
            id="input"
            v-model="inputText"
            rows="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Digite ou cole o texto aqui..."
            :disabled="!!fileName"
          ></textarea>
        </div>

        <!-- Botões de ação -->
        <div class="flex gap-3">
          <button
            @click="pasteFromClipboard"
            :disabled="!!fileName"
            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Colar
          </button>
          <button
            @click="encode"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Codificar
          </button>
          <button
            @click="decode"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Decodificar
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="result !== null">
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">
              Resultado
            </label>
            <div class="flex gap-2">
              <button
                v-if="!hasError && isDecoded"
                @click="downloadFile"
                class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
              >
                💾 Download
              </button>
              <button
                v-if="!hasError"
                @click="copyToClipboard"
                class="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
              >
                {{ copied ? 'Copiado!' : 'Copiar' }}
              </button>
              <button
                @click="clearResult"
                class="bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
              >
                Limpar
              </button>
            </div>
          </div>
          <div class="relative">
            <textarea
              v-model="result"
              rows="6"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono text-sm"
              :class="{ 'border-red-300 bg-red-50': hasError }"
            ></textarea>
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
const hasError = ref(false)
const fileName = ref('')
const fileSize = ref('')
const fileContent = ref('')
const originalFileName = ref('')
const isDecoded = ref(false)

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const detectFileType = (bytes: Uint8Array): { mime: string; ext: string } => {
  // Verifica os primeiros bytes (magic numbers) para identificar o tipo
  const getHex = (arr: Uint8Array, start: number, length: number): string => {
    return Array.from(arr.slice(start, start + length))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return { mime: 'image/png', ext: 'png' }
  }
  
  // JPEG
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { mime: 'image/jpeg', ext: 'jpg' }
  }
  
  // GIF
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return { mime: 'image/gif', ext: 'gif' }
  }
  
  // WebP
  if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return { mime: 'image/webp', ext: 'webp' }
  }
  
  // PDF
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return { mime: 'application/pdf', ext: 'pdf' }
  }
  
  // ZIP
  if (bytes[0] === 0x50 && bytes[1] === 0x4B && (bytes[2] === 0x03 || bytes[2] === 0x05)) {
    return { mime: 'application/zip', ext: 'zip' }
  }
  
  // RAR
  if (bytes[0] === 0x52 && bytes[1] === 0x61 && bytes[2] === 0x72 && bytes[3] === 0x21) {
    return { mime: 'application/x-rar-compressed', ext: 'rar' }
  }
  
  // 7Z
  if (bytes[0] === 0x37 && bytes[1] === 0x7A && bytes[2] === 0xBC && bytes[3] === 0xAF) {
    return { mime: 'application/x-7z-compressed', ext: '7z' }
  }
  
  // MP3
  if ((bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) || 
      (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0)) {
    return { mime: 'audio/mpeg', ext: 'mp3' }
  }
  
  // MP4
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
    return { mime: 'video/mp4', ext: 'mp4' }
  }
  
  // AVI
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x41 && bytes[9] === 0x56 && bytes[10] === 0x49) {
    return { mime: 'video/x-msvideo', ext: 'avi' }
  }
  
  // DOCX/XLSX/PPTX (todos são ZIP com estrutura específica)
  if (bytes[0] === 0x50 && bytes[1] === 0x4B) {
    // Verifica se tem estrutura Office
    const content = new TextDecoder().decode(bytes.slice(0, Math.min(500, bytes.length)))
    if (content.includes('word/')) return { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' }
    if (content.includes('xl/')) return { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ext: 'xlsx' }
    if (content.includes('ppt/')) return { mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ext: 'pptx' }
  }
  
  // Tenta detectar texto UTF-8
  const sample = bytes.slice(0, Math.min(1000, bytes.length))
  let isText = true
  for (let i = 0; i < sample.length; i++) {
    const byte = sample[i]
    // Verifica se é um byte de controle não-texto (exceto \n, \r, \t)
    if (byte < 32 && byte !== 10 && byte !== 13 && byte !== 9) {
      isText = false
      break
    }
  }
  
  if (isText) {
    return { mime: 'text/plain', ext: 'txt' }
  }
  
  // Binário desconhecido
  return { mime: 'application/octet-stream', ext: 'bin' }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  fileName.value = file.name
  fileSize.value = formatFileSize(file.size)
  originalFileName.value = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    const arrayBuffer = e.target?.result as ArrayBuffer
    const bytes = new Uint8Array(arrayBuffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    fileContent.value = btoa(binary)
    inputText.value = ''
  }
  reader.readAsArrayBuffer(file)
}

const clearFile = () => {
  fileName.value = ''
  fileSize.value = ''
  fileContent.value = ''
  originalFileName.value = ''
  result.value = null
}

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    inputText.value = text
  } catch (err) {
    console.error('Erro ao colar:', err)
  }
}

const encode = () => {
  const source = fileContent.value || inputText.value
  
  if (!source) {
    result.value = ''
    hasError.value = false
    isDecoded.value = false
    return
  }

  try {
    if (fileContent.value) {
      result.value = fileContent.value
    } else {
      result.value = btoa(inputText.value)
    }
    hasError.value = false
    isDecoded.value = false
  } catch (err) {
    result.value = 'Erro ao codificar o texto'
    hasError.value = true
    isDecoded.value = false
  }
}

const decode = () => {
  const source = inputText.value
  
  if (!source) {
    result.value = ''
    hasError.value = false
    isDecoded.value = false
    return
  }

  try {
    const decoded = atob(source)
    result.value = decoded
    hasError.value = false
    isDecoded.value = true
  } catch (err) {
    result.value = 'Erro: texto inválido em Base64'
    hasError.value = true
    isDecoded.value = false
  }
}

const downloadFile = () => {
  if (!result.value || hasError.value) return

  try {
    const base64 = inputText.value
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Detecta o tipo de arquivo
    const fileType = detectFileType(bytes)
    
    // Define o nome do arquivo
    let downloadName = originalFileName.value || `decoded-file.${fileType.ext}`
    
    // Se tem nome original mas sem extensão, adiciona a extensão detectada
    if (originalFileName.value && !originalFileName.value.includes('.')) {
      downloadName = `${originalFileName.value}.${fileType.ext}`
    }

    const blob = new Blob([bytes], { type: fileType.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = downloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    // Fallback para texto
    const blob = new Blob([result.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'decoded.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

const clearResult = () => {
  result.value = null
  hasError.value = false
  isDecoded.value = false
  inputText.value = ''
}
</script>

