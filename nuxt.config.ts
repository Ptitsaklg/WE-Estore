import { fileURLToPath } from 'url';
import { URL } from 'url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '#utils': fileURLToPath(new URL('./server/utils', import.meta.url))
  },
  nitro: {
    preset: 'node-server',
    experimental: {
      websocket: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    // '@prisma/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@unlok-co/nuxt-stripe',
    '@vueuse/nuxt',
  ],
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
      },
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      options: {},
    },
  },
  runtimeConfig: {
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    DATABASE_URL:  process.env.DATABASE_URL,
    public: {
      FALL_BACK_IMG_URL: process.env.FALL_BACK_IMG_URL,
      DEFAULT_USER_AVATAR: process.env.DEFAULT_USER_AVATAR
    }
  },

})