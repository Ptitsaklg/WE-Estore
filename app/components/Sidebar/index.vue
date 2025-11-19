<script setup>
const open = ref(false);
const userCookie = useCookie("user", userCookieSettings);

function goIntoTheShop() {
  navigateTo('/');
}
</script>

<template>
  <div class="z-50 flex items-center justify-between w-full p-3 border-b sm:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button class="flex items-center justify-center cursor-pointer">
          <Icon 
            name="wpf:administrator" 
            size="26"
            class="text-[#555]"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-48">
        <DropdownMenuLabel>Аккаунт: {{ userCookie?.data?.user?.name || `id ${userCookie?.data?.user?.id}` }}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem @click="goIntoTheShop" class="text-red-600 focus:text-red-600">
          <Icon name="gala:store" size="16" />
          <span>В магазин</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="text-xl font-medium text-[#FF961C] tracking-tight">Админ панель</div>
    <Icon 
      class="z-50 cursor-pointer" 
      size="30" 
      name="iconamoon:menu-burger-horizontal"
      @click="open = true" 
    />
    <div v-if="open" class="fixed bg-white top-0 left-0 z-[999] w-full h-screen">
      <SidebarMenu @toBurgerMenu="open = false"/>
      <Icon 
        class="absolute z-50 cursor-pointer right-4 top-4" 
        size="30" 
        name="material-symbols:close"
        @click="open = false" 
      />
    </div>
  </div>

  <div class="hidden sm:flex flex-col w-[260px] h-screen border-r">
    <SidebarMenu />
  </div>
</template>