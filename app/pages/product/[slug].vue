<script setup>
const route = useRoute();
const userCookie = useCookie('user', userCookieSettings);
const productShowcaseStore = useProductShowcaseStore();
const { fetchSingleProductData, singleProductData, sameCategoryProduct } = storeToRefs(productShowcaseStore);

const productReviewStore = useProductReviewStore();
const { productReviewData } = storeToRefs(productReviewStore);

const shoppingCartStore = useShoppingCartStore();
const { shoppingCartData, showCart, defaultQuantity } = storeToRefs(shoppingCartStore);

productShowcaseStore.fetchSingleProductData(route.params?.slug).then(async () => {
  const categoryId = singleProductData.value?.products?.categoryId;
  const productId = singleProductData.value?.products?.id;
  await productReviewStore.fetchProductReviews(productId);
  await productShowcaseStore.fetchProductWithSameCategory(categoryId);
});

function handleAddToCart(product) {
  if (userCookie.value) {
    shoppingCartStore.addProductToCart(product);
  } else {
    alert("Войдите в аккаунт чтобы добавить товар в корзину");
  }
}
</script>

<template>
  <main class="relative p-2 sm:p-4 mx-auto xl:max-w-7xl">
    <div>
      <ShowcaseShopElementsCart v-show="showCart" />

      <div class="flex flex-col gap-10 sm:flex-row sm:justify-between lg:gap-24">
        <ShowcaseProductsProductImageGallery 
          :images="singleProductData?.products?.images" 
          class="relative flex-1"
          @select="selectedImage = $event"
        />

        <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between mb-4">
            <div class="flex-1">
              <h1 class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-semibold mr-2">
                {{ singleProductData?.products?.name }}
              </h1>
              <ShowcaseProductsStarRating :rating="computeProductReview(singleProductData?.products)"/>
            </div>
            <ShowcaseProductsProductPrice
              class="text-xl"
              :sale-price="singleProductData?.products?.price + ' &#8381'"
              :regular-price="computeRegularPrice(singleProductData?.products?.price)  + ' &#8381'"
            />
          </div>
          <hr />
          <div
            class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12
             bg-white md:static md:bg-transparent bg-opacity-90 md:p-0"
          >
            <input
              v-model="defaultQuantity"
              type="number"
              min="1"
              aria-label="Quantity"
              class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 
              items-center justify-center focus:outline-none"
            />
            <ShowcaseProductsAddToCartButton
              class="flex-1 w-full md:max-w-xs"
              @click="handleAddToCart({
                ...singleProductData?.products,
                selectedImage
              })"
              :disabled="false"
              :class="{ loading: true }"
            />
          </div>
          <div class="grid gap-2 my-8 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Категория:</span>
              <div class="product-categories">
                <NuxtLink class="hover:text-primary" title="category-name">
                  {{ singleProductData?.products?.category?.name}}
                </NuxtLink>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div class="my-32">
        <ShowcaseProductsProductTabs />
      </div>

      <div class="my-32">
        <div class="mb-4 text-xl font-semibold">
          Ещё может подойти
        </div>
        <LazyShowcaseSingleProductReviewsProductRow
          :productData="sameCategoryProduct"

        />
      </div>
    </div>
  </main>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}
</style>