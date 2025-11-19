import { defineStore } from "pinia";

interface Category {
  id: number | null;
  name: string;
}

export const useCategoryStore = defineStore('category-store', () => {
  const categoryInput = ref<Category>({
    id: null,
    name: '',
  });
  const headers = useHeaders();

  async function fetchCategories() {
    const { data, refresh: getCategories } = await useFetch('/api/admin/category/get-categories', {
      headers: {
        ...headers
      },
    });
    return { data, getCategories }
  }

  return { categoryInput, fetchCategories }
});





