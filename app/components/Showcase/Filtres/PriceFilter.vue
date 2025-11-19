<script setup>
const productShowcaseStore = useProductShowcaseStore();
const { selectedPrices } = storeToRefs(productShowcaseStore);

const emit = defineEmits(['fetchProducts']);
const minPrice = 0;
const maxPrice = 100000;
const currencySymbol = '&#8381';

const price = ref([minPrice, maxPrice]);
const isOpen = ref(true);

const applyPrice = () => {
  emit('fetchProducts', price.value)
};

watch(price, applyPrice)

watch(selectedPrices, (val) => {
  if (!val.length) {
    price.value = [minPrice, maxPrice];
  }
});

</script>

<template>
  <div>
    <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center" @click="isOpen = !isOpen">
      <span>Цена</span> 
      <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
    </div>
    <div v-show="isOpen" class="mt-3 grid gap-4 grid-cols-2">
      <div class="flex relative items-center">
        <label for="price-from" class="leading-none px-2 text-gray-400 absolute" v-html="currencySymbol" />
        <input
          id="price-from"
          v-model="price[0]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6"
          type="number"
          placeholder="От"
          min="0" 
        />
      </div>
      <div class="flex relative items-center">
        <label for="price-to" class="leading-none px-2 text-gray-400 absolute" v-html="currencySymbol" />
        <input
          id="price-to"
          v-model="price[1]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6"
          type="number"
          placeholder="До"
          min="1"
        />
      </div>
      <div class="mx-1 mt-1 col-span-full">
        <Slider 
          v-model="price" 
          :default-value="[0]"
          :max="100000"
          :step="1"

        />
      </div>
    </div>
  </div>
</template>

