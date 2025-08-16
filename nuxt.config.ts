// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

app: {
    head: {
      title: 'My Tailwind Nuxt App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  // Enable the 'pages' directory for file-based routing
  pages: true

})
