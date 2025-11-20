import { defineStore } from "pinia";

interface UserCookie {
  data?: {
    user?: {
      id?: number;
      name?: string;
      email?: string;
    };
  };
}

export const useShoppingCartStore = defineStore('shopping-cart-store', () => {
  const showCart = ref(false);
  const shoppingCartData = ref<Record<string, any>>([]);
  const totalPrice = ref(0);
  const defaultQuantity = ref(1);

  const userCookie = useCookie<UserCookie>('user', {
    sameSite: 'none',
    secure: true
  })
  const userId = computed(() => userCookie.value?.data?.user?.id ?? 'guest');
  const cartKey = computed(() => `cartData_${userId.value}`);


  function toggleShoppingCart() {
    showCart.value = !showCart.value
  }


  function storeCartDataToLocalStorage() {
    localStorage.setItem(cartKey.value, JSON.stringify(shoppingCartData.value));
  }

  
  function getCartDataFromLocalStorage() {
    const data = localStorage.getItem(cartKey.value);
    if (data) {
      shoppingCartData.value = JSON.parse(data);
      getTotalPrice();
    } else {
      shoppingCartData.value = [];
    }
  }


  function addProductToCart(product: Record<string, any>) {
    const existingProduct = shoppingCartData.value.find((item:any) => item.id === product.id);

    if (!existingProduct) {
      const quantity = defaultQuantity.value;
      const totalProductPrice = parseFloat(product.price) * quantity;

    const selectedImgUrl =
      product.selectedImage?.value ||
      product.selectedImage ||
      product.images?.[0]?.url;  

      shoppingCartData.value.push({
        ...product,
        quantity,
        totalProductPrice,
        images: [{ url: selectedImgUrl }],
      });

      getTotalPrice();
      storeCartDataToLocalStorage();
    }
  }


  function addQuantity(productId: number, amount: number) {
    const product = shoppingCartData.value.find((item:any) => item.id === productId);

    if (product) {
      product.quantity += amount;
      product.totalProductPrice = parseFloat(product.price) * product.quantity;
      getTotalPrice();
      storeCartDataToLocalStorage();
    }
  }


  function reduceQuantity(productId: number, amount: number) {
    const product = shoppingCartData.value.find((item:any) => item.id === productId);
    if (!product) return;

    product.quantity -= amount;

    if (product.quantity <= 0) {
      removeProductFromCart(productId);
    } else {
      product.totalProductPrice = parseFloat(product.price) * product.quantity;
    }

    getTotalPrice();
    storeCartDataToLocalStorage();
  }


  function getTotalPrice() {
    totalPrice.value = shoppingCartData.value.reduce(
      (sum:any, product:any) => sum + (product.totalProductPrice || 0),
      0
    );
  }


  function removeProductFromCart(productId: number) {
    shoppingCartData.value = shoppingCartData.value.filter((item:any) => item.id !== productId);
    getTotalPrice();
    storeCartDataToLocalStorage();
  }


  function clearOutCart() {
    shoppingCartData.value = []
    totalPrice.value = 0
    localStorage.removeItem(cartKey.value)
  }


  function formatToRubCurrency(amount: number) {
    const formatted = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(amount);

    return formatted;
  }

  onMounted(() => {
    getCartDataFromLocalStorage();
  });


  watch(userId, () => {
    getCartDataFromLocalStorage();
  });


  return { 
    addProductToCart,
    getCartDataFromLocalStorage, 
    defaultQuantity, 
    formatToRubCurrency, 
    reduceQuantity, 
    totalPrice, 
    addQuantity, 
    shoppingCartData, 
    clearOutCart, 
    removeProductFromCart, 
    toggleShoppingCart, 
    showCart,
 }
})
