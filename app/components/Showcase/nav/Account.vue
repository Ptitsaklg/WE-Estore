<script setup >
 const config = useRuntimeConfig();
 const DEFAULT_USER_AVATAR = config?.public?.DEFAULT_USER_AVATAR;
 const userCookie = useCookie('user', userCookieSettings);

function logoutUser() {
  userCookie.value = null
  navigateTo('/');
}
</script>

<template>
  <div>
    <DropdownMenu v-if="userCookie">
      <DropdownMenuTrigger as-child>
        <button class="focus:outline-none flex items-center justify-center">
          <img
            :src="DEFAULT_USER_AVATAR"
            class="rounded-full cursor-pointer"
            width="26"
            height="26"
            alt="User avatar"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-48">
        <DropdownMenuLabel>Аккаунт: {{ userCookie?.data?.user?.name || `id ${userCookie?.data?.user?.id}` }}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem @click="logoutUser" class="text-red-600 focus:text-red-600">
          <Icon name="material-symbols:logout" size="16" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <NuxtLink
      v-else
      to="/auth/login"
      title="Войти"
      class="flex items-center justify-center"
    >
      <Icon name="mdi:account-arrow-up-outline" size="26" class="text-[#555] hover:text-[#FF961C]"/>
    </NuxtLink>
  </div>
</template>

