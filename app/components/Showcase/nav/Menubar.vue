<script setup lang="ts">
const userCookie = useCookie('user', userCookieSettings);
</script>

<template>
  <nav class="flex items-center justify-between px-5 py-2  border-b shadow-sm bg-[#EBEBEB]">
    <NuxtLink to="/" class="flex items-center gap-2">
      <Icon  name="streamline-kameleon-color:pine-tree" size="32" />
      <span class="text-[#FF961C] font-sans font-semibold tracking-wide">Ваш магазин</span>
    </NuxtLink>
    <div class="flex items-center gap-6">
      <NuxtLink v-if="userCookie" to="/admin/dashboard" class="flex items-center gap-2">
        <Button size="sm" class="bg-[#555] cursor-pointer text-xs">
          <Icon name="clarity:administrator-line" size="16"/>
          Админка
        </Button>
      </NuxtLink>
      <ShowcaseNavAccount />
      <ShowcaseProductsCartTrigger v-if="userCookie"/>
    </div>
  </nav>
</template>