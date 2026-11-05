// Dados do site e dos produtos: fonte única para SEO, home, rodapé e sitemap.
export const site = {
  url: 'https://ctech.foo',
  name: 'CTECH',
  tagline: 'software house',
  description:
    'Software house que cria aplicações web e mobile, produtos próprios e ferramentas gratuitas para desenvolvedores.',
  locale: 'pt_BR',
  email: 'contato@ctech.foo',
}

export const products = [
  {
    name: 'divideaí',
    url: 'https://divideai.ctech.foo',
    external: true,
    logo: '/products/divideai.svg',
    description:
      'Divida a conta do restaurante com os amigos: igualmente ou pelo que cada um consumiu, com gorjeta personalizada. Grátis, sem cadastro e funciona offline.',
    cta: 'Abrir o divideaí',
  },
  {
    name: 'ReplayCam',
    url: '/replaycam/privacidade',
    external: false,
    // Símbolo para fundo claro, do guia da marca do ReplayCam (docs/marca no repositório do app).
    logo: '/products/replaycam.svg',
    description:
      'App Android que guarda os últimos segundos da câmera e salva o replay quando você pede. Funciona offline e não coleta dados pessoais.',
    cta: 'Política de privacidade',
  },
]
