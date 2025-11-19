import { defineStore } from "pinia";

interface Product {
  id: number | null;
  name: string;
  color: string;
  categoryId: number | null;
  price: number
}

export const useProductStore = defineStore('product-store', () => {
  const productInput = ref<Product>({
    id: null,
    name: '',
    color: '',
    categoryId: null,
    price: 0 
  });
  const search = ref('');
  const productData = ref<any>(null);
  const page = ref(1);
  const limit = ref(10);
  const headers = useHeaders();
  const productColors = ref(['red','black','white','green','blue','yellow','orange','gray']);

  
  async function fetchProducts() {

    if (search.value && page.value !== 1) {
      page.value = 1;
    }

    const data = await $fetch('/api/admin/product/get', {
      headers: {
        ...headers
      },
      query: {
        search: search.value,
        page: page.value,
        limit: limit.value,
      }
    });
    productData.value = data;
    limit.value = productData.value?.metadata.limit;
    page.value = productData.value?.metadata.page;

  }


  async function deleteProduct(id: number) {
    const res = await $fetch("/api/admin/product/delete", {
      headers: {
        ...headers
      },
      method: 'DELETE',
      body: JSON.stringify({ id: id })
    });

  }


  async function changePage(newPage: number) {
    page.value = newPage
    await fetchProducts()
  }


  function uploadImagePayload(productId: number, file: string) {
    return new Promise((resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productId", productId.toString());

        const requestOptions = {
          headers:{
            ...headers
          },
          method: "POST",
          body: formData,
        };

        resolve(requestOptions)

      } catch (error) {
        reject(error)
      }
    })
  }


  return { 
    productInput,
    search,
    productData,
    fetchProducts,
    changePage,
    deleteProduct,
    uploadImagePayload,
    productColors,
    
  }
});