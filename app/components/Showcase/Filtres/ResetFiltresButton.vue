<script setup>
const productShowcaseStore = useProductShowcaseStore();
const { selectedCategories, selectedPrices, selectedColors, selectedStar } = storeToRefs(productShowcaseStore);

async function resetFilter() {
  selectedCategories.value=[]
  selectedPrices.value=[]
  selectedColors.value=[]
  selectedStar.value=null
  await productShowcaseStore.fetchProducts(
    selectedCategories.value,
    selectedPrices.value,
    selectedColors.value,
    selectedStar.value)
}
</script>

<template>
  <Button @click="resetFilter" class="mt-8 bg-[#333333] cursor-pointer">
    Очистить фильтры
  </Button>
</template>