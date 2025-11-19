<script setup lang="ts">
const props = defineProps(['userData']);
const userStore = useUserStore();
const { search } = storeToRefs(userStore);

const searchUser = _debounce(async function(event) {
  search.value = event[0].target.value
  await userStore.fetchUsers()
}, 1000)

</script>

<template>
  <div class="relative w-full max-w-sm items-center my-5">
    <Input
      placeholder="Найти..."
      type="text"
      class="pl-10"
      v-model="search"
      @input="searchUser"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-1">
      <Icon size="30" name="material-symbols:search" class="text-gray-500" />
    </span>
  </div>
    <Table>
      <TableCaption>Список пользователей</TableCaption>
      <TableHeader >
        <TableRow>
          <TableHead >№</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(user, index) in userData?.users" :key="user.id">
          <TableCell class="font-medium">
            {{
              (userStore.userData?.metadata?.page - 1) *
              userStore.userData?.metadata?.limit + (index + 1)
            }}
          </TableCell>
          <TableCell>{{ user?.name }}</TableCell>
          <TableCell>{{ user?.email }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

  <Pagination
    v-slot="{ page }"
    :items-per-page="userStore.userData?.metadata?.limit"
    :total="userStore.userData?.metadata?.total"
    :default-page="userStore.userData?.metadata?.page"
    @update:page="userStore.changePage"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious
        :disabled="userStore.userData?.metadata?.page === 1"
        @click="userStore.changePage(userStore.userData?.metadata?.page - 1)"
      />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis v-if="items.length > 5" />

      <PaginationNext
        :disabled="userStore.userData?.metadata?.page === userStore.userData?.metadata?.totalPages"
        @click="userStore.changePage(userStore.userData?.metadata?.page + 1)"
      />
    </PaginationContent>
  </Pagination>

</template>