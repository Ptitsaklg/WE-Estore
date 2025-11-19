<script setup>
const shoppingCartStore = useShoppingCartStore();
const { shoppingCartData } = storeToRefs(shoppingCartStore);

</script>

<template>
  <div class="relative cursor-pointer inline-flex" @click="shoppingCartStore.toggleShoppingCart">
    <Icon name="ion:cart-outline" size="26" class="text-[#555]"/>
    <span 
      v-if="shoppingCartData.length > 0 ? true : false" 
      class="bg-primary rounded-full text-white leading-none absolute
      min-w-[16px] p-[3px] -top-1 -right-4 md:-right-2 text-[10px] inline-flex justify-center items-center"
    >
      {{shoppingCartData.length}}
    </span> 
  </div>
</template>

