module.exports = {
  mode: 'universal',
  head: {
    title: 'Room',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#fff' },
  css: ['@/assets/css/main.css'],
  plugins: [
    {
      src: '@/plugins/socket',
      ssr: false,
    },
  ],
  components: [{ path: '~/components/base/', prefix: 'base', extensions: ['vue'] }],
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/postcss8'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  server: {
    host: process.env.BASE_HOST || '',
    port: process.env.BASE_PORT || '',
  },
}
