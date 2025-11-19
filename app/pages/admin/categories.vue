<script setup>

definePageMeta({
  layout: 'admin'
})

const categoryStore = useCategoryStore();

const { data, getCategories } = await categoryStore.fetchCategories()

</script>

<template>
  <div class="text-xl sm:text-2xl font-bold underline mb-5">Категории</div>
  <div class="max-w-4xl mx-auto">
    <CategoriesCategoryModalCreate @getCategories="getCategories" class="place-self-end mb-4"></CategoriesCategoryModalCreate>
    <CategoriesCategoryTable :categories="data?.categories" @getCategories="getCategories"></CategoriesCategoryTable>
  </div>
</template>