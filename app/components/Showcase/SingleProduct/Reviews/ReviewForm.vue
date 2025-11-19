<script setup>
const productShowcaseStore = useProductShowcaseStore();
const { singleProductData } = storeToRefs(productShowcaseStore);
const productReviewStore = useProductReviewStore();

const userCookie = useCookie('user', userCookieSettings);
const hovered = ref(0);
const rating = ref(null);
const loading = ref(false);
const productReviewInput = ref({
  userId: userCookie.value?.data?.user?.id,
  starNumber: null,
  productId: null,
  comment: ''
})

function getSelectedStarNumber(val) {
  const productId = singleProductData.value?.products?.id;
  productReviewInput.value.starNumber = val
  productReviewInput.value.productId = productId
}

async function addComment() {
  try {
    loading.value = true;
    const res = await $fetch("/api/showcase/create-review", {
      method: "POST",
      body: productReviewInput.value,
    });

    await productReviewStore.fetchProductReviews(productReviewInput.value.productId)
    productReviewInput.value.comment = ''

  } catch (error) {
      showLoginOrSignUpError(error)
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="addComment" class="w-full text-gray-500">
    <div class="p-5 mt-3 grid gap-2 border rounded-lg">
      <div class="text-center mb-1.5">
        <label class="text-sm block m-auto">
          Ваша оценка товара <span class="text-red-500">*</span>
        </label>
        <div class="flex justify-center gap-1 mt-2">
          <label
            v-for="i in 5"
            :key="i"
            class="grid p-1 rounded cursor-pointer transition duration-150"
            @click="getSelectedStarNumber(i)"
            :class="[
              rating < i && i > hovered
                ? 'bg-white text-gray-300 border border-gray-300 shadow-sm'
                : 'text-amber-400 bg-amber-50 border border-amber-400 shadow-[0_0px_4px_0_rgba(249,191,59,0.21)]'
            ]"
          >
            <input
              type="radio"
              class="absolute opacity-0 appearance-none"
              name="rating"
              :value="i"
              v-model="rating"
              required
            />
            <IconsStarIcon />
          </label>
        </div>
      </div>

      <div class="w-full">
        <label for="content" class="text-sm mb-0.5 block">
          Напишите свой отзыв <span class="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          v-model="productReviewInput.comment"
          required
          class="bg-white border border-gray-300 shadow-sm rounded-md w-full py-2 px-4 outline-none 
          focus:ring-2 focus:ring-amber-400"
        ></textarea>
      </div>

      <div class="text-center mt-3">
        <button
          :disabled="loading"
          type="submit"
          class="flex gap-4 justify-center items-center font-semibold rounded-md w-full p-2
           bg-amber-300 text-amber-900 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          <ShowcaseProductsLoadingIcon
            v-if="loading"
            stroke="4"
            size="16"
            color="#78350F"
          />
          <span>Отправить</span>
        </button>
      </div>
    </div>
  </form>
</template>
