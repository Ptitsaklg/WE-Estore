<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
  label: { type: String, default: "" },
  showCount: { type: Boolean, default: false },
});
const emit = defineEmits(['fetchProducts']);

const isOpen = ref(true);
const productShowcaseStore = useProductShowcaseStore();
const { selectedCategories } = storeToRefs(productShowcaseStore);

const checked = ref([]);

const checkboxChanged = (categoryId) => {
  if (selectedCategories.value.includes(categoryId)) {
    selectedCategories.value = selectedCategories.value.filter(id => id !== categoryId)
  } else {
    selectedCategories.value.push(categoryId)
  }

  selectedCategories.value = [...checked.value];
  emit('fetchProducts', selectedCategories.value)
};

watch(selectedCategories, (val) => {
  if (!val.length) {
    checked.value = [];
  }
});
</script>

<template>
  <div v-if="categories?.length">
    <div class="cursor-pointer flex font-semibold mt-8 justify-between items-center" @click="isOpen = !isOpen">
      <span>Категории</span>
      <Icon
        name="ion:chevron-down-outline"
        class="transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </div>
    <div v-show="isOpen" class="mt-3 mr-1 max-h-[240px] grid gap-1.5 overflow-auto">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex gap-2 items-center"
      >
        <input
          :id="category.id"
          type="checkbox"
          v-model="checked"
          :value="category?.id"
          @change="checkboxChanged(category?.id)"
          class="mt-0.5"
        />

        <label :for="category.id" class="cursor-pointer m-0 text-sm flex-1 leading-tight">
          <span v-html="category.name" />
          <small
            v-if="showCount"
            class="ml-1 text-gray-400 tabular-nums"
            aria-hidden="true"
          >
            ({{ categories?.length || 0 }})
          </small>
        </label>
      </div>
    </div>
  </div>
</template>