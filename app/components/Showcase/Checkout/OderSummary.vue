<script setup>
const shoppingCartStore = useShoppingCartStore();
const {shoppingCartData, totalPrice} = storeToRefs(shoppingCartStore);

onMounted(() => {
  shoppingCartStore.getCartDataFromLocalStorage()
})
</script>

<template>
  <aside 
      class="bg-white rounded-lg shadow-lg mb-8 w-full min-h-[280px] p-4 sm:p-8 relative md:max-w-md md:top-32 
      md:sticky"
    >
      <h2 class="mb-6 text-xl font-semibold leading-none">Ваши заказы</h2>
      <ul class="flex flex-col gap-4 overflow-y-auto">
        <ShowcaseShopElementsCartCard :products="shoppingCartData" />
      </ul>
      <div class="grid gap-1 text-sm font-semibold text-gray-500">
        <div class="flex justify-between items-center mt-4">
          <span>Итого:</span>
          <span 
            class="text-lg font-bold text-gray-700 tabular-nums" 
            v-html="shoppingCartStore.formatToRubCurrency(totalPrice)" 
          />
        </div>
      </div>
  </aside>
</template>