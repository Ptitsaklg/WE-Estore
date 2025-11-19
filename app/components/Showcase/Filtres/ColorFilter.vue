<script setup >
const props = defineProps({
  colors: Array
});

const productShowcaseStore = useProductShowcaseStore();
const { selectedColors: selectedColorsStore } = storeToRefs(productShowcaseStore);

const selectedColors = ref([]);
const isOpen = ref(true);

const emit = defineEmits(['fetchProducts']);

const checkboxChanged = (color) => {
  const colorExist = selectedColors.value.includes(color);

  if (colorExist) {
    selectedColors.value = selectedColors.value.filter(c => c !== color);
  } else {
    selectedColors.value.push(color);
  }

  selectedColorsStore.value = [...selectedColors.value];
  emit('fetchProducts', selectedColors.value);
};

watch(selectedColorsStore, (val) => {
  if (!val.length) {
    selectedColors.value = [];
  }
});
</script>

<template>
  <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center" @click="isOpen = !isOpen">
    <span>Цвет</span>
    <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
  </div>
  <div 
    v-show="isOpen" 
    class="mt-3 mr-6 max-h-[240px] grid grid-cols-[repeat(auto-fit,_minmax(24px,_1fr))] gap-1.5 overflow-auto"
  >
    <div 
      v-for="(color, index) in colors"
      :key="color + index" 
      class="relative w-full aspect-square rounded-md shadow-sm"
    >
      <input
        :id="color"
        type="checkbox"
        class="peer sr-only"
        :value="color"
        @change="checkboxChanged(color)"
        :checked="selectedColors.includes(color)"
      />
      <label
        :for="color"
        class="block w-full h-full rounded-md transition-all duration-200"
        :class="['cursor-pointer', selectedColors.includes(color) ? 'saturate-100' : 'saturate-75',]"
        :style="{ backgroundColor: color }"
      >
        <span
          v-if="selectedColors.includes(color)"
          class="absolute top-1/2 left-1/2 w-1/4 h-2/5 border-b-2 border-r-2"
          :class="[color === 'white' || color === 'yellow' ? 'border-gray-600' : 'border-white',]"
          style="transform: translate(-50%, -50%) rotate(45deg);"
        ></span>
      </label>
    </div>
  </div>
</template>
