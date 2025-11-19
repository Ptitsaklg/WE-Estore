<script setup >
const props = defineProps(['productData']);
const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);
const config = useRuntimeConfig();
const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL;

</script>

<template>
  <ScrollArea class="h-[calc(100vh-120px)] ">
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-if="!productData?.products?.length">Нет таких товаров</div>
      <div v-else class="relative group" v-for="product in productData?.products" :key="product?.id">
        <NuxtLink :to="`/product/${product?.slug}`" :title="product?.name">
          <NuxtImg
            :width="imgWidth"
            :height="imgHeight"
            :src="product?.images?.length > 0 ? product?.images[0]?.url : FALL_BACK_IMG_URL"
            :alt="product?.name"
            :title="product?.name"
            :loading="'lazy'"
            :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
            class="rounded-lg object-top object-cover w-full aspect-9/8"
            placeholder-class="blur-xl"
          />
        </NuxtLink>
        <div class="p-2">
          <ShowcaseProductsStarRating :rating="computeProductReview(product)" />

          <NuxtLink :to="`/product/${product?.slug}`" :title="product?.name">
            <h2 class="mb-2 font-light leading-tight group-hover:text-primary">{{product?.name}}</h2>
          </NuxtLink>
          
          <ShowcaseProductsProductPrice 
            class="text-sm" 
            :sale-price="product?.price +' &#8381'" 
            :regular-price="computeRegularPrice(product?.price) + ' &#8381'" 
          />
        </div>
      </div>
    </div>
  </ScrollArea>
</template>