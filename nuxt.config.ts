export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@pinia/nuxt'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Castle Admin - Quest Board',
      meta: [
        { name: 'description', content: 'Administration interface for the Quests Microservice. Manage quests, players and progression.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true }
})
