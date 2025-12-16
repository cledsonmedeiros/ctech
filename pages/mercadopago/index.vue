<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
      <div class="flex items-start gap-4">
        <div class="flex-1">
          <h1 class="text-2xl font-semibold">Credenciamento Mercado Pago</h1>
          <p class="text-sm text-gray-600 mt-1">Teste o widget de carteira do Mercado Pago. Insira a chave pública e o
            preferenceId para inicializar.</p>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-700">Chave pública</label>
          <input v-model="publicKey" class="mt-1 w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700">Preference ID</label>
          <input v-model="preferenceId" class="mt-1 w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>

      <div class="mt-4 flex items-center gap-3">
        <button @click="startMercadoPago" :disabled="loading"
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60">
          <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          </svg>
          <span>{{ loading ? 'Carregando...' : 'Iniciar Mercado Pago' }}</span>
        </button>

        <button @click="clearWidget" type="button"
          class="inline-flex items-center gap-2 border px-3 py-2 rounded text-sm">
          Limpar widget
        </button>

        <div class="ml-auto text-sm text-gray-600">Status: <span
            :class="{ 'text-green-600': status.startsWith('Widget'), 'text-red-600': status.startsWith('Erro') }"
            class="font-medium">{{ status }}</span></div>
      </div>

      <div class="mt-6">
        <div id="walletBrick_container"
          class="min-h-[120px] border border-dashed rounded p-4 flex items-center justify-center bg-gray-50">
          <div v-if="!loading && !hasWidget" class="text-gray-500 text-sm">Aqui será exibido o widget da carteira do
            Mercado Pago.</div>
        </div>
      </div>

      <div class="mt-4 text-xs text-gray-500">
        <p>Se o SDK não estiver carregado automaticamente, o script será carregado dinamicamente do
          <code>https://sdk.mercadopago.com/js/v2</code>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
definePageMeta({
  layout: false
})

import { ref, onMounted } from 'vue'

const defaultPublicKey = "APP_USR-8682f2ea-a55b-4f0c-8729-4b62cd33767c";
const defaultPreferenceId = "2964216101-a551f9da-46e7-4875-b216-fa38c9b88447";

const publicKey = ref(defaultPublicKey);
const preferenceId = ref(defaultPreferenceId);
const loading = ref(false);
const status = ref('Pronto');
const hasWidget = ref(false);

function clearWidget() {
  const container = document.getElementById('walletBrick_container');
  if (container) container.innerHTML = '';
  hasWidget.value = false;
  status.value = 'Widget limpo';
}

async function loadMercadoPagoSdk() {
  if (typeof window === 'undefined') return null;
  if (window.MercadoPago) return window.MercadoPago;

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-mercadopago-sdk]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.MercadoPago));
      existing.addEventListener('error', () => reject(new Error('Falha ao carregar SDK')));
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('data-mercadopago-sdk', 'true');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => resolve(window.MercadoPago);
    script.onerror = () => reject(new Error('Falha ao carregar SDK do Mercado Pago'));
    document.head.appendChild(script);
  });
}

async function startMercadoPago() {
  loading.value = true;
  status.value = 'Carregando SDK...';
  try {
    const MercadoPago = await loadMercadoPagoSdk();
    if (!MercadoPago && !window.MercadoPago) {
      throw new Error('SDK não disponível após tentativa de carregamento.');
    }

    const mp = new window.MercadoPago(publicKey.value, { locale: 'pt-BR' });
    const bricksBuilder = mp.bricks();

    const container = document.getElementById('walletBrick_container');
    if (!container) throw new Error('Container "walletBrick_container" não encontrado.');

    container.innerHTML = '';

    await bricksBuilder.create('wallet', 'walletBrick_container', {
      initialization: {
        preferenceId: preferenceId.value,
      }
    });

    hasWidget.value = true;
    status.value = 'Widget carregado com sucesso.';
  } catch (err) {
    console.error(err);
    status.value = 'Erro: ' + (err && err.message ? err.message : String(err));
  } finally {
    loading.value = false;
  }
}

if (process.client) {
  onMounted(async () => {
    // tentar iniciar automaticamente
    await startMercadoPago();
  });
}
</script>
