<script setup>
const props = defineProps(['products']);
const config = useRuntimeConfig();
const shoppingCartStore = useShoppingCartStore();
const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL;

function addQuantity(productId, quantity) {
  shoppingCartStore.addQuantity(productId, parseInt(quantity.toString()))
}

function reduceQuantity(productId, quantity) {
  shoppingCartStore.reduceQuantity(productId, parseInt(quantity.toString()))
}
</script>

<template>
  <div class="flex items-center gap-3 group" v-for="product in products" :key="product?.id">
    <NuxtLink :to="`/product/${product?.slug}`">
      <NuxtImg
        width="64"
        height="64"
        class="w-16 h-16 rounded-md skeleton"
        :src="product?.images.length > 0 ? product?.images[0]?.url : FALL_BACK_IMG_URL"
        :alt="'product name'"
        loading="lazy" 
      />
    </NuxtLink>
    <div class="flex-1">
      <div class="flex gap-x-2 gap-y-1 flex-wrap items-center">
        <NuxtLink class="leading-tight" :to="`/product/${product?.slug}`">{{product?.name}}</NuxtLink>
      </div>
      <ShowcaseProductsProductPrice 
        class="mt-1 text-xs"  
        :sale-price="product?.totalProductPrice + ' &#8381'" 
        :regular-price="computeRegularPrice(product?.totalProductPrice)  + ' &#8381'"
      />
    </div>
  
    <div class="inline-flex gap-2 items-end">
      <ShowcaseShopElementsQuantityInput 
        @addQuantity="addQuantity" 
        @reduceQuantity="reduceQuantity" 
        :quantity="product?.quantity" 
        :productId="product?.id"
      />
      
      <div class="text-xs text-gray-700 flex leading-none items-center">
        <button
          @click="shoppingCartStore.removeProductFromCart(product?.id)"
          aria-label="Remove Item"
          type="button"
          class="flex items-center gap-1 hover:text-red-500 cursor-pointer">
          <IconsTrashIcon/>
        </button>
      </div>
    </div>
  </div>
</template>