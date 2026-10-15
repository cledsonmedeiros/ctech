<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700">CTECH</NuxtLink>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <article class="bg-white rounded-xl shadow-md p-6 sm:p-10 text-gray-700 leading-relaxed space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Política de Privacidade do ReplayCam</h1>
          <p class="text-sm text-gray-500 mt-2">Última atualização: {{ updatedAt }}</p>
        </div>

        <p>
          Esta política explica como o aplicativo <strong>ReplayCam</strong> para Android, desenvolvido pela
          <strong>CTECH</strong>, trata as informações do seu aparelho. Em resumo: o ReplayCam funciona totalmente
          offline e <strong>não coleta, não envia e não compartilha nenhum dado pessoal</strong>.
        </p>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">1. O que o aplicativo faz</h2>
          <p>
            O ReplayCam mantém um buffer de vídeo dos últimos segundos capturados pela câmera e, quando você pede,
            salva um trecho (replay) com os segundos anteriores e posteriores ao acionamento.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">2. Permissões utilizadas</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Câmera:</strong> necessária para exibir a imagem e gravar o buffer de vídeo. Sem ela, o
              aplicativo não funciona.
            </li>
            <li>
              <strong>Microfone (opcional):</strong> usado para incluir o áudio nos replays. Se você negar, o
              aplicativo grava apenas vídeo.
            </li>
          </ul>
          <p>
            O aplicativo <strong>não possui permissão de acesso à internet</strong>. Por isso, nenhuma imagem, áudio ou
            informação pode sair do seu aparelho por meio dele.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">3. Dados armazenados no seu aparelho</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Buffer de vídeo temporário:</strong> pequenos trechos gravados em uma área privada do aplicativo,
              substituídos continuamente e apagados quando a gravação é encerrada ou o aplicativo é reaberto.
            </li>
            <li>
              <strong>Replays salvos:</strong> os vídeos que você escolhe guardar são salvos na Galeria do aparelho, na
              pasta <code class="bg-gray-100 px-1 rounded">Movies/ReplayCam</code>. Eles são seus: você pode
              visualizar, compartilhar ou apagar esses arquivos a qualquer momento pela Galeria.
            </li>
            <li>
              <strong>Preferências:</strong> configurações como duração do replay, resolução e lanterna ficam salvas
              apenas no aparelho.
            </li>
          </ul>
          <p>
            Esses dados não são incluídos no backup automático do Android e não são acessados pela CTECH.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">4. Coleta e compartilhamento</h2>
          <p>
            O ReplayCam não exige conta ou login e não usa anúncios, ferramentas de análise (analytics), relatórios de
            falhas enviados pela rede ou qualquer serviço de terceiros. A CTECH não coleta, não vende e não compartilha
            dados dos usuários.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">5. Controles remotos e botões</h2>
          <p>
            O aplicativo pode ser acionado pelos botões de volume, por controles Bluetooth de selfie ou por botões de
            fones de ouvido. Esses comandos são tratados apenas como teclas pressionadas, localmente, enquanto a
            gravação está ativa.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">6. Responsabilidade ao gravar</h2>
          <p>
            Ao gravar pessoas, respeite a legislação aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD), e o
            direito de imagem de terceiros. Os vídeos gerados ficam sob sua guarda e responsabilidade.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">7. Crianças</h2>
          <p>
            O ReplayCam não é direcionado a crianças e não coleta dados de nenhum usuário, inclusive de crianças.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">8. Alterações nesta política</h2>
          <p>
            Se o funcionamento do aplicativo mudar de forma que afete a sua privacidade, esta página será atualizada
            antes da nova versão, com a data de atualização revisada.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">9. Contato</h2>
          <p>
            Dúvidas sobre esta política podem ser enviadas para
            <a href="mailto:contato@ctech.foo" class="text-blue-600 hover:underline">contato@ctech.foo</a>.
          </p>
        </section>
      </article>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <p class="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} CTech. Todos os direitos reservados.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const updatedAt = '15 de outubro de 2026'

useHead({
  title: 'Política de Privacidade do ReplayCam | CTECH',
  meta: [{ name: 'description', content: 'Como o aplicativo ReplayCam trata os dados do seu aparelho.' }]
})
</script>
