<script setup>
const showMobileFilter = ref(false);
const shoppingCartStore = useShoppingCartStore();
const { showCart } = storeToRefs(shoppingCartStore);
const { isDesktop } = useBreakpoint();

</script>

<template>
  <div class="sm:hidden flex items-center gap-2 p-2">
    <Icon 
      name="mage:filter" 
      size="24" 
      @click="showMobileFilter = true" 
      class="text-[#555] hover:text-[#FF961C]" 
    />
    <span class="text-sm font-medium text-[#555]">ФИЛЬТРЫ</span>
  </div>

  <div class="grid items-start sm:flex sm:justify-center" >
    <div v-if="isDesktop" class="hidden sm:block">
      <ShowcaseFiltresFilterPanel />
    </div>
    <ShowcaseShopElementsCart v-show="showCart"/>
   
    <div class=" p-2 sm:p-6">
      <ShowcaseProductsProductGrid />
    </div>
  </div>

  <div
    v-show="showMobileFilter"
    class="fixed inset-0 bg-white z-[999] flex flex-col p-4 sm:hidden"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-bold text-lg text-[#555]">Фильтры</h2>
      <IconsCloseIcon
        class="cursor-pointer text-gray-500"
        @click="showMobileFilter = false"
      />
    </div>
    <ShowcaseFiltresFilterPanel />
  </div>
</template>