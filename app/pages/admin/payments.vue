<script setup>
definePageMeta({
  layout: 'admin'
})

const checkoutStore = useCheckoutStore();
const { paymentData } = storeToRefs(checkoutStore);
await checkoutStore.fetchPaymentData();
</script>

<template>
  <div class="text-xl sm:text-2xl font-bold underline mb-5">Платежи</div>
  <div class="max-w-4xl mx-auto">
    <ShowcaseCheckoutCustomerOder :userOders="paymentData?.userOrders"/>
  </div>
</template>