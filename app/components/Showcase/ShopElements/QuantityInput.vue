<script setup lang="ts">
const props = defineProps({
  quantity: Number,
  productId: Number
})
const emit = defineEmits(['addQuantity', 'reduceQuantity'])

const localQuantity = ref(props.quantity)

watch(() => props.quantity, (val) => {
  localQuantity.value = val
})
</script>

<template>
  <div class="flex rounded bg-white text-sm leading-none shadow-sm ">
    <button
      @click="emit('reduceQuantity', props.productId, 1)"
      type="button"
      class=" border-r w-6 h-6 border rounded-l"
    >
      <IconsRemoveIcon/>
    </button>

    <input
      type="number"
      v-model="localQuantity"
      min="0"
      aria-label="Quantity"
      class="flex items-center justify-center w-8 px-2 text-right text-xs border-y"
      readonly
    />

    <button
      @click="emit('addQuantity', props.productId, 1)"
      type="button"
      class=" border-l w-6 h-6 border rounded-r"
    >
      <IconsAddIcon/>
    </button>
  </div>
</template>

<style scoped>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>