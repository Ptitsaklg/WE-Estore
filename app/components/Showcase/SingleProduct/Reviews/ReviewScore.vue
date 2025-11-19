<script setup>
const show = ref(false);
const userCookie = useCookie('user', userCookieSettings);
const productShowcaseStore = useProductShowcaseStore();
const { singleProductData } = storeToRefs(productShowcaseStore);

const displayMissingStars = (starPercents = []) =>
  [1, 2, 3, 4, 5].map(star =>
    starPercents.find(r => r.star === star) ?? { id: null, productId: null, times: 0, star }
  );

function handlerWriteReview() {
  if (userCookie.value) {
    show.value = !show.value;
  } else {
    alert("Войдите в аккаунт, чтобы написать отзыв");
  }
}
</script>

<template>
  <div>
    <h4 class="font-semibold text-2xl text-gray-500">Оценка покупателей</h4>
    <div class="my-2">
      <ShowcaseProductsStarRating :rating="computeProductReview(singleProductData?.products)" class="text-sm mr-2"/>
    </div>
    <div class="my-4">
      <div
        v-for="rating in displayMissingStars(singleProductData?.products?.starPercents)"
        :key="rating"
        class="flex gap-4 items-center"
      >
        <div class="flex text-sm gap-1 items-center">
          {{ rating?.star }}
          <Icon class="text-yellow-400" name="ion:star" />
        </div>
        <div class="flex-1 relative">
          <div class="rounded-full bg-gray-200 h-2.5 w-full"></div>
          <div
            class="rounded-full bg-yellow-400 h-2.5 top-0 left-0 absolute"
            :style="{width: (rating?.star * rating?.times * 100) / (5 * rating?.times) + '%',}"
          ></div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-xl mb-2 text-gray-500">Расскажите, что вы думаете о товаре?</div>
    <div class="text-sm mb-4 text-gray-500">
      Поделитесь своим мнением о продукте — другим покупателям будет интересно услышать ваш отзыв.
    </div>
    <Button @click="handlerWriteReview" class="bg-[#333333] cursor-pointer w-full p-2">
      {{ show ? "Закрыть" : "Напишите отзыв" }}
    </Button>
    <ShowcaseSingleProductReviewsReviewForm v-show="show"/>
  </div>
</template>