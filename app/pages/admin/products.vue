<script setup>
definePageMeta({
  layout: 'admin'
})

const categoryStore = useCategoryStore();
const { data } = await categoryStore.fetchCategories()

const productStore = useProductStore();
const { productData,   } = storeToRefs(productStore);
await productStore.fetchProducts();

async function deleteProduct(product) {
  const confirmed = window.confirm(`Вы уверены, что хотите удалить продукт "${product?.name}"?`);
  if (!confirmed) return;
  await productStore.deleteProduct(product?.id)
  await productStore.fetchProducts()
}

</script>

<template>
  <div class="text-xl sm:text-2xl font-bold underline mb-5">Продукты</div>
  <div class="max-w-4xl mx-auto">
    <ProductsProductModalCreate 
      :categories="data?.categories"  
      @getProducts="productStore.fetchProducts" 
      class="place-self-end mb-4"
    />
    <ProductsProductTable 
      :categories="data?.categories" 
      :productData="productData"  
      @deleteProduct="deleteProduct"
      @getProducts="productStore.fetchProducts"
      @uploadImage="productStore.fetchProducts"
    />
  </div>
</template>