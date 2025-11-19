import { defineStore } from "pinia";

export const useCheckoutStore = defineStore('checkout-store', () => {
  const customerOderData = ref<any>({});
  const paymentData = ref<any>({});

  async function fetchPaymentData() {
    const data = await $fetch("/api/admin/payment/all-payments");
    paymentData.value = data
  }
  

  async function fetchCustomerOder(userId:number) {
    const data = await $fetch("/api/showcase/get-payments", {
      query: {
        userId: userId,    
      }
    });

    customerOderData.value = data
  }
 

  return {
    customerOderData,
    fetchCustomerOder,
    paymentData,
    fetchPaymentData,
  }
})