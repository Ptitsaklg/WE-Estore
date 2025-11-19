import { useHeaders } from '../utils/http-headers';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isAuthenticated }: any = useNuxtApp()
  const headers = useHeaders()

  try {
    const fromAdminLayout = from?.meta?.layout
    const toAdminLayout = to?.meta?.layout

    if (fromAdminLayout === 'admin' || toAdminLayout === 'admin') {
      const { data, error: authenticatedError } = await useFetch("/api/admin/isAuthenticated", {
        headers: {
          ...headers
        },
      });

    if (import.meta.client && typeof $isAuthenticated === 'function') {
      $isAuthenticated(authenticatedError)
    }
    }

  } catch (error: any) {
    console.log(error?.message)
  }
})