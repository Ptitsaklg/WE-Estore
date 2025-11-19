<script setup>
const props = defineProps(['productData']);
</script>

<template>
  <div class="grid gap-8">
    <ShowcaseProductsProductCard class="w-full" :productData="productData"/>
  </div>
</template>