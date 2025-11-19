import { defineStore } from "pinia";

export const useUserStore = defineStore('user-store', () => {
  const search = ref('');
  const userData = ref<any>(null);
  const page = ref(1);
  const limit = ref(10);
  const headers = useHeaders();
  const userError = ref<any>(null);

  async function fetchUsers() {
    try {
      userError.value = null;

      if (search.value && page.value !== 1) {
        page.value = 1;
      }

      const data = await $fetch('/api/admin/user/get', {
        headers: {
          ...headers
        },
        query: {
          search: search.value,
          page: page.value,
          limit: limit.value,
        }
      });

      userData.value = data;
      limit.value = userData.value?.metadata?.limit;
      page.value = userData.value?.metadata?.page;
    } catch (err: any) {
      console.error('Ошибка при загрузке пользователей:', err);
      userError.value = err;
    }
  }

  
  async function changePage(newPage: number) {
    page.value = newPage
    await fetchUsers()
  }

  return { 
    fetchUsers,
    search,
    changePage,
    userData,
    userError,
  }
});