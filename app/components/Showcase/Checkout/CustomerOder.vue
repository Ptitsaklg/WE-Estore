<script setup>
const props = defineProps(["userOders"]);
const config = useRuntimeConfig();
const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL;

function formatDateRU(dateString) {
  return dateString
    ? new Date(dateString).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
}
</script>

<template>
  <ScrollArea class="h-[calc(100vh-100px)] rounded-md border mt-5">
    <ScrollArea class="w-[calc(100vw-50px)] sm:w-full">
      <Table>
        <TableCaption>Купленные товары</TableCaption>
        <TableHeader >
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Фото</TableHead>
            <TableHead>Товар</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Дата</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(order, index) in userOders" :key="order?.id">
            <TableCell>{{  index + 1 }}</TableCell>
            <TableCell>
              <NuxtLink :to="'/product/'+order?.product?.slug">
                <NuxtImg
                  width="64"
                  height="64"
                  class="sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-md skeleton"
                  :src="order?.product?.images.length > 0 ? order?.product?.images[0]?.url : FALL_BACK_IMG_URL"
                  :alt="'product name'"
                  loading="lazy" 
                />
              </NuxtLink>
            </TableCell>
            <TableCell>{{  order?.product?.name }}</TableCell>
            <TableCell>{{  order?.amount  }}</TableCell>
            <TableCell>{{ formatDateRU(order?.createdAt) }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  </ScrollArea>
</template>