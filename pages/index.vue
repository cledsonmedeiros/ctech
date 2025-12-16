<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CTECH
            </span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#servicos" @click.prevent="scrollToSection('servicos')" class="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Serviços</a>
            <a href="#tecnologias" @click.prevent="scrollToSection('tecnologias')" class="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Tecnologias</a>
            <a href="#contato" @click.prevent="scrollToSection('contato')" class="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Contato</a>
            <NuxtLink
              to="/utils"
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Ferramentas
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div class="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Transformamos
            <span class="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ideias em Realidade
            </span>
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Somos uma software house especializada em criar soluções tecnológicas inovadoras 
            que impulsionam o crescimento do seu negócio.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contato"
              @click.prevent="scrollToSection('contato')"
              class="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Comece seu projeto
            </a>
            <NuxtLink
              to="/utils"
              class="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Explore ferramentas
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600">50+</div>
            <div class="mt-2 text-gray-600">Projetos entregues</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600">30+</div>
            <div class="mt-2 text-gray-600">Clientes satisfeitos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600">5+</div>
            <div class="mt-2 text-gray-600">Anos de experiência</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600">99%</div>
            <div class="mt-2 text-gray-600">Satisfação</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div id="servicos" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Nossos Serviços</h2>
          <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Soluções completas para seu negócio
          </p>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Oferecemos uma ampla gama de serviços tecnológicos para atender suas necessidades
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Desenvolvimento Web</h3>
            <p class="text-gray-600 leading-relaxed">
              Criamos aplicações web modernas, responsivas e de alta performance utilizando as melhores 
              tecnologias como React, Vue.js e Node.js.
            </p>
          </div>

          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Apps Mobile</h3>
            <p class="text-gray-600 leading-relaxed">
              Desenvolvemos aplicativos nativos e híbridos para iOS e Android com excelente 
              experiência de usuário e performance otimizada.
            </p>
          </div>

          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-purple-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Cloud & DevOps</h3>
            <p class="text-gray-600 leading-relaxed">
              Implementamos soluções em nuvem escaláveis e configuramos pipelines de CI/CD 
              para otimizar seu fluxo de desenvolvimento.
            </p>
          </div>

          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-pink-500 to-pink-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">UI/UX Design</h3>
            <p class="text-gray-600 leading-relaxed">
              Criamos interfaces intuitivas e atraentes focadas na experiência do usuário, 
              aumentando engajamento e conversão.
            </p>
          </div>

          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Consultoria</h3>
            <p class="text-gray-600 leading-relaxed">
              Oferecemos consultoria técnica e estratégica para auxiliar na tomada de decisões 
              e otimização de processos tecnológicos.
            </p>
          </div>

          <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Manutenção & Suporte</h3>
            <p class="text-gray-600 leading-relaxed">
              Garantimos o funcionamento contínuo das suas aplicações com suporte técnico 
              especializado e atualizações regulares.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Technologies Section -->
    <div id="tecnologias" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Tecnologias</h2>
          <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Trabalhamos com o que há de melhor
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">⚛️</div>
            <span class="text-sm font-semibold text-gray-700">React</span>
          </div>
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">💚</div>
            <span class="text-sm font-semibold text-gray-700">Vue.js</span>
          </div>
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">🚀</div>
            <span class="text-sm font-semibold text-gray-700">Node.js</span>
          </div>
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">🐍</div>
            <span class="text-sm font-semibold text-gray-700">Python</span>
          </div>
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">🔷</div>
            <span class="text-sm font-semibold text-gray-700">TypeScript</span>
          </div>
          <div class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-2">☁️</div>
            <span class="text-sm font-semibold text-gray-700">AWS</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-linear-to-r from-blue-600 to-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl mb-6">
          Pronto para começar seu projeto?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Entre em contato conosco e descubra como podemos transformar suas ideias em realidade
        </p>
        <a
          href="#contato"
          class="inline-block px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Fale com nossa equipe
        </a>
      </div>
    </div>

    <!-- Contact Section -->
    <div id="contato" class="py-20 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Entre em contato</h2>
          <p class="text-xl text-gray-600">Estamos prontos para ouvir suas ideias</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
              <input
                type="text"
                id="subject"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
              <textarea
                id="message"
                rows="5"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Conte-nos sobre seu projeto..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full px-6 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              CTECH
            </h3>
            <p class="text-gray-400">
              Transformando ideias em soluções tecnológicas inovadoras desde 2020.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul class="space-y-2">
              <li><a href="#servicos" class="text-gray-400 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#tecnologias" class="text-gray-400 hover:text-white transition-colors">Tecnologias</a></li>
              <li><NuxtLink to="/utils" class="text-gray-400 hover:text-white transition-colors">Ferramentas</NuxtLink></li>
              <li><a href="#contato" class="text-gray-400 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {{ new Date().getFullYear() }} CTECH Software House. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 64 // altura do navbar fixo
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>