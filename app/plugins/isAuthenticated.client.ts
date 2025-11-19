export default defineNuxtPlugin({
  name: 'isAuthenticated',
  parallel: true,
  async setup (nuxtApp) {
    nuxtApp.provide('isAuthenticated', (error:any) => {
      const statusCode = error.value?.statusCode
      if (statusCode === 401) {
        window.location.href='/auth/login'
        showError('Unauthenticated!')
      }
    })
  }
})