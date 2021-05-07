export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'keskidi.site',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources'
  ],

  //
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
    ]
  },

  watchers: {
    webpack: {
      ignored: /node_modules/
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false, // remove automatic rebuild client when --> npm run dev is running
  },

  axios: {
    baseURL: 'https://api.keskidi.site'
  },

  router: {
    middleware: ['init-app'],
    linkActiveClass: 'isActive'

  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    },
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  }
}
