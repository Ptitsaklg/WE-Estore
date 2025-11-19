<script setup lang="ts">
const props = defineProps(['productData', 'categories']);
const emit = defineEmits(['getProducts', 'deleteProduct', 'uploadImage']);
const productStore = useProductStore();
const { search } = storeToRefs(productStore);

const searchProduct = _debounce(async function(event) {
  search.value=event[0].target.value
  await productStore.fetchProducts()
}, 1000);
</script>

<template>
  <div class="relative w-full max-w-sm items-center my-5">
    <Input
      placeholder="Найти..."
      type="text"
      class="pl-10"
      v-model="search"
      @input="searchProduct"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-1">
      <Icon size="30" name="material-symbols:search" class="text-gray-500" />
    </span>
  </div>

  <ScrollArea class="w-[calc(100vw-50px)] sm:w-full">
    <Table>
      <TableCaption>Список продуктов</TableCaption>
      <TableHeader >
        <TableRow>
          <TableHead >№</TableHead>
          <TableHead>Продукт</TableHead>
          <TableHead>Цвет</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead class="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(product, index) in productData?.products" :key="product.id">
          <TableCell class="font-medium">
            {{
              (productStore.productData?.metadata?.page - 1) *
              productStore.productData?.metadata?.limit + (index + 1)
            }}
          </TableCell>
          <TableCell>{{ product?.name }}</TableCell>
          <TableCell>{{ product?.color }}</TableCell>
          <TableCell>{{ product?.category?.name }}</TableCell>
          <TableCell>{{ product?.price }}</TableCell>
          <TableCell class="text-right">             
            <ProductsProductModalUpdate 
              :categories="categories" 
              :product="product" 
              @getProducts="emit('getProducts')"
            />
            <Icon 
              name="material-symbols:delete-outline" 
              size="30" 
              class="ml-1 text-gray-500 hover:text-[#FF961C] cursor-pointer" 
              @click="emit('deleteProduct', product)"
            />
            <ProductsUploadImage :productId="product.id" @uploadImage="emit('uploadImage')"></ProductsUploadImage>
            <ProductsShowUploadImage :images="product.images"></ProductsShowUploadImage>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>

  <Pagination
    v-slot="{ page }"
    :items-per-page="productStore.productData?.metadata?.limit"
    :total="productStore.productData?.metadata?.total"
    :default-page="productStore.productData?.metadata?.page"
    @update:page="productStore.changePage"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious
        :disabled="productStore.productData?.metadata?.page === 1"
        @click="productStore.changePage(productStore.productData?.metadata?.page - 1)"
      />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis v-if="items.length > 5" />

      <PaginationNext
        :disabled="productStore.productData?.metadata?.page === productStore.productData?.metadata?.totalPages"
        @click="productStore.changePage(productStore.productData?.metadata?.page + 1)"
      />
    </PaginationContent>
  </Pagination>
</template>