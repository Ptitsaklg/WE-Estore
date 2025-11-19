<script setup>
import { useWebSocket } from '@vueuse/core'

const wsUrl = 'ws://localhost:3000/api/admin/dashboard/_ws';
const { status, data: wsData, send, open, close } = useWebSocket(wsUrl);

const { stripe } = useClientStripe();

const shoppingCartStore = useShoppingCartStore();
const { shoppingCartData, totalPrice } = storeToRefs(shoppingCartStore);

const userCookie = useCookie("user", userCookieSettings);
const isLoading = ref(false);
let elements = null;
let cardElement = null;

const createStripeElements = () => {
  elements = stripe.value.elements();
  cardElement = elements.create("card", { hidePostalCode: true });
  cardElement.mount("#card-element");
};

async function createPayment() {
  isLoading.value = true;

  try {
    const { clientSecret, error, message } = await $fetch("/api/showcase/create-payment", {
      method: "POST",
      body: {
        userData: userCookie.value?.data?.user,
        productData: shoppingCartData.value,
        totalPrice: totalPrice.value,
      },
    });

    if (error || !clientSecret) {
      throw new Error(error?.message || "Failed to create payment");
    }

    const { paymentIntent, error: confirmError } = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: userCookie.value?.data?.user?.email,
        },
      },
    });

    if (confirmError) {
      throw new Error(confirmError.message);
    }

    send('success-payment');
    shoppingCartStore.clearOutCart();
  } catch (err) {
    console.error("Payment error:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  watchEffect(() => {
    if (stripe.value) createStripeElements();
  });
});
</script>

<template>
  <div>
    <div id="card-element" class=" mb-4 border-2 rounded-md px-2 py-4"></div>
    <Button
      v-if="userCookie"
      @click="createPayment"
      :disabled="isLoading"
      class="flex h-[44px] text-lg bg-[#333333] cursor-pointer min-w-[150px] gap-4 items-center justify-center"
    >
      <span v-if="isLoading">В процессе...</span>
      <span v-else>Оплатить сейчас {{ shoppingCartStore.formatToRubCurrency(totalPrice) }}</span>
    </Button>
    <div v-else>
      <p class="mt-1 text-gray-500">
        Войдите в систему, чтобы обработать платеж или просмотреть заказы.
        <NuxtLink href="/auth/login" class="text-bold text-[#FF961C]">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>