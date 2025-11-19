export default defineNuxtPlugin({
  name: 'logout',
  parallel: true,
  async setup(nuxtApp) {
    nuxtApp.provide('logout', () => {
      const userCookie = useCookie('user', userCookieSettings);
      userCookie.value = null
      window.location.href = '/auth/login'
    })
  }
})