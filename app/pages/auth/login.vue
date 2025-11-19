<script setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

definePageMeta({
  layout: 'auth'
})

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

watch(email, () => {
  emailError.value = '';
});

watch(password, () => {
  passwordError.value = '';
});

const userCookie = useCookie("user", userCookieSettings);

const router = useRouter();

const onSubmit = async () => {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });

    userCookie.value = res;

    router.push('/')
    console.log(res);
  } catch (error) {
    console.log('error: ', error);
    const errorMsg = error.data && error.data.message ? error.data.message : 'Произошла ошибка при попытке авторизации';

    if (errorMsg.includes('Пользователь не найден')) {
      emailError.value = errorMsg;
    } else if (errorMsg.includes('Неправильный пароль')) {
      passwordError.value = errorMsg;
    } else {
      emailError.value = errorMsg;
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full">
    <p class="text-4xl mb-6 text-[#333333]">Авторизация</p>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
      <div>
        <Input type="email" v-model="email" placeholder="Email" />
        <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
      </div>
      <div>
        <Input type="password" v-model="password" placeholder="Пароль" />
        <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
      </div>
      <div class="flex flex-col items-center justify-center w-full gap-3 mt-4">
        <Button type="submit" class="bg-[#FF961C]">Войти</Button>
      </div>
    </form>
    <p class="mt-9">Впервые у нас?
      <NuxtLink to="/auth/register" class="ml-2 text-[#FF961C] text-sm">
        Зарегистрироваться
      </NuxtLink>
    </p>
  </div>
</template>