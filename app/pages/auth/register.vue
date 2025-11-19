<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

definePageMeta({
  layout: 'auth'
})

const formSchema = toTypedSchema(z.object({
  name: z.string().nonempty("Имя не может быть пустым").max(20, "Имя слишком длинное"),
  email: z.string().email("Недопустимый формат электронной почты").max(30, "Электронная почта слишком длинная"),
  password: z.string()
    .min(4, "Пароль должен содержать минимум 4 символа")
    .max(20, "Пароль не должен превышать 20 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву и только латинские символы")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .regex(/[!@#$%^&\*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ")
}));

const { values, handleSubmit, resetForm, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await $fetch('/api/auth/register', {
    method: 'POST',
    body: values
  })
  navigateTo('/auth/login')
  console.log(res)
  } catch (error) {
    console.log('error: ', error)
  }
});

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full">
    <p class="text-4xl mb-6 text-[#333333]">Регистрация</p>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Имя" v-bind="componentField" />
          </FormControl>
          <FormMessage>{{ errors.name }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormControl>
            <Input type="email" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormMessage>{{ errors.email }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormControl>
            <Input type="password" placeholder="Пароль"v-bind="componentField" />
          </FormControl>
          <FormMessage>{{ errors.password }}</FormMessage>
        </FormItem>
      </FormField>
      <div class="flex flex-col items-center justify-center w-full gap-3 mt-4">
        <Button class="bg-[#FF961C]" type="submit">Зарегистрироваться</Button>
      </div>
    </form>
    <p class="mt-9">Уже есть аккаунт?
      <NuxtLink to="/auth/login" class="ml-2 text-[#FF961C] text-sm">
        Войти
      </NuxtLink>
    </p>
  </div>
</template>