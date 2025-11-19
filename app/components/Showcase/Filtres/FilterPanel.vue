<script setup lang="ts">

const categoryStore = useCategoryStore();
const { data } = await categoryStore.fetchCategories();
const productStore = useProductStore();
const { productColors } = storeToRefs(productStore);

const productShowcaseStore = useProductShowcaseStore();
const { selectedCategories, selectedPrices, selectedColors, selectedStar } = storeToRefs(productShowcaseStore);

async function fetchProductByCategories(categories:number[]) {
  selectedCategories.value = categories
  await productShowcaseStore.fetchProducts(selectedCategories.value, selectedPrices.value, selectedColors.value)
}

async function fetchProductByColors(colors:string[]) {
  selectedColors.value = colors
  await productShowcaseStore.fetchProducts(
    selectedCategories.value,
    selectedPrices.value, 
    selectedColors.value, 
    selectedStar.value
    )
}

async function fetchProductByPrice(prices:number[]){
  selectedPrices.value = prices
  await productShowcaseStore.fetchProducts(selectedCategories.value, selectedPrices.value,
  selectedColors.value, selectedStar.value)
}


async function fetchProductByStars(starRating:number){
  selectedStar.value = starRating
  await productShowcaseStore.fetchProducts(selectedCategories.value, selectedPrices.value,
  selectedColors.value, selectedStar.value)
}

</script>

<template>
  <div class="border-2 p-4 sm:m-6 rounded-md sm:w-2xs">
    <header class="flex items-center justify-center gap-2">
      <Icon name="mage:filter" size="26"/>
      <p class="text-gray-500 font-bold">ФИЛЬТРЫ</p>
    </header>
    <div class=" grow">
      <div class="grid gap-2">
        <ShowcaseFiltresPriceFilter @fetchProducts="fetchProductByPrice"/>
        <ShowcaseFiltresCategoryFilter @fetchProducts="fetchProductByCategories" :categories="data?.categories"/>
        <ShowcaseFiltresColorFilter @fetchProducts="fetchProductByColors" :colors="productColors" />
        <ShowcaseFiltresStarRatingFilter @fetchProducts="fetchProductByStars"  />
        <ShowcaseFiltresResetFiltresButton />
      </div>
    </div>
  </div>
</template>
