<script setup>
const userCookie = useCookie('user', userCookieSettings);
const userId = userCookie.value?.data?.user?.id;

const checkoutStore = useCheckoutStore();
await checkoutStore.fetchCustomerOder(userId);
</script>

<template>
  <div class="grid items-start">
    <div class="container flex flex-col items-center justify-evenly gap-8 my-16 p-2 ">
      <div class="grid w-full max-w-2xl gap-8 md:flex-1">
        <div class="mt-2">
          <h2 class="mb-4 text-xl font-semibold">Оплата картой</h2>
        </div>
        <ShowcaseCheckoutStripeElement />
      </div>

      <ShowcaseCheckoutOderSummary>
        <ShowcaseShopElementsCartCard :products="shoppingCartData" />
      </ShowcaseCheckoutOderSummary>
    </div>
  </div>
</template>
