import { ref, onMounted } from 'vue'

export function useBreakpoint() {
  const isDesktop = ref(false)

  onMounted(() => {
    const mql = window.matchMedia('(min-width: 640px)')
    isDesktop.value = mql.matches

    const handler = (e: MediaQueryListEvent) => {
      isDesktop.value = e.matches
    }

    mql.addEventListener('change', handler)
  })

  return { isDesktop }
}