import { defineStore } from "pinia";

export const useProductShowcaseStore = defineStore('product-showcase-store', () => {
  const productData = ref<any>(null);
  const page = ref(1);
  const limit = ref(10);
  const search = ref('');

  const selectedCategories = ref<number[]>([]);
  const selectedPrices = ref<number[]>([]);
  const selectedColors = ref<string[]>([]);
  const singleProductData = ref<any>(null);
  const sameCategoryProduct = ref<any>({ products: [] });
  const selectedStar = ref<number>();


  async function fetchProducts(categories?: number[], prices?: number[], colors?: string[], starRating?: number,  showAll: boolean = false ) {
    const params: Record<string, any> = {};

    if (categories && categories?.length > 0) {
      params['categories'] = categories.toString()
    }
    if (prices && prices?.length > 0) {
      params['prices'] = prices.toString()
    }
    if (colors && colors?.length > 0) {
      params['colors'] = colors.toString()
    }

    if (starRating && typeof starRating === 'number') {
      params['starRating'] = starRating
    }

    const data = await $fetch("/api/showcase/get-product", {
      query: {
        ...params,
        page: page.value,
        limit: showAll ? 0 : limit.value
      }
    });

    productData.value = data
    limit.value = productData.value?.metadata.limit
    page.value = productData.value?.metadata.page
  }

  async function fetchProductWithSameCategory(categoryId: number) {
    const data = await $fetch("/api/showcase/get-same-category-product", {
      query: {
        categoryId: categoryId,
      }
    });

    sameCategoryProduct.value = data
  }


  async function fetchSingleProductData(slug: string) {
    const data = await $fetch("/api/showcase/single-product", {
      query: {
        slug: slug,
      }
    });
    
    singleProductData.value = data
  }

  return { 
    fetchProductWithSameCategory, 
    selectedStar, 
    productData, 
    fetchProducts, 
    selectedCategories, 
    selectedPrices, 
    selectedColors, 
    sameCategoryProduct, 
    fetchSingleProductData, 
    singleProductData,

   }
})