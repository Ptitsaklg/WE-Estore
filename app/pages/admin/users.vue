<script setup>

definePageMeta({
  layout: 'admin'
})

const userStore = useUserStore();
const { userData, userError } = storeToRefs(userStore);
const { $isAuthenticated } = useNuxtApp();

await userStore.fetchUsers();

onMounted(() => {
  if (userError.value) {
    $isAuthenticated(userError)
  }
})
</script>

<template>
  <div class="text-xl sm:text-2xl font-bold underline mb-5">Пользователи</div>
  <div class="max-w-4xl mx-auto">
    <UsersUserTable 
      :userData="userData"  
    />
  </div>
</template>