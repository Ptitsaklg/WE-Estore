<script setup >
const productShowcaseStore = useProductShowcaseStore();
const { productData } = storeToRefs(productShowcaseStore);
await productShowcaseStore.fetchProducts(undefined, undefined, undefined, undefined, true)



</script>

<template>
  <ShowcaseProductsProductCard :productData="productData" />
</template>

