<script setup>
const userCookie = useCookie('user', userCookieSettings);

function goIntoTheShop() {
  navigateTo('/');
}

const emit = defineEmits(['toBurgerMenu']);

function emitCloseMenu() {
  emit('toBurgerMenu');
}

const items = ref([
  {
    title: "ОБЗОР",
    path: "/admin/dashboard",
    icon: "ri:dashboard-line"
  }, 
  {
    title: "КАТЕГОРИИ",
    path: "/admin/categories",
    icon: "material-symbols:category-outline"
  }, 
  {
    title: "ПРОДУКТЫ",
    path: "/admin/products",
    icon: "ix:box-open"
  },
  {
    title: "ПЛАТЕЖИ",
    path: "/admin/payments",
    icon: "ant-design:dollar-outlined"
  },
  {
    title: "ПОЛЬЗОВАТЕЛИ",
    path: "/admin/users",
    icon: "oui:users"
  },
])

</script>


<template>
  <div>
    <header class="flex items-center gap-3 p-3 border-b mb-2">
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
    </header>

    <div class="px-4 grow">
      <div class="grid gap-2">
        <NuxtLink 
          :href="item.path" v-for='(item, index) in items' 
          :key='index'
          class="flex items-center gap-2 px-2 py-2 transition rounded cursor-pointer hover:bg-neutral-100 group"
          @click="emitCloseMenu"
        >
          <Icon size="30" :name="item.icon" class="text-gray-500 group-hover:text-[#FF961C]"/>
          <span class="text-gray-500 text-[14px] font-bold group-hover:text-[#FF961C]">{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>