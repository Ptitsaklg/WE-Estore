<script setup>
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);

</script>

<template>
  <Button
    type="submit"
    class="flex h-[44px] font-bold text-lg bg-[#333333] cursor-pointer min-w-[150px] gap-4 items-center justify-center"
    :class="{ disabled: false }"
    :disabled="disabled"
   >
    <span>Добавить в корзину</span>
    <ShowcaseProductsLoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
  </Button>
</template>