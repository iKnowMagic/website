// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'iknowmagic',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ]
    }
  }
})
