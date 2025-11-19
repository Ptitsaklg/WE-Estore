<script setup lang="ts">
const props = defineProps(['categories']);
const emit = defineEmits(['getCategories']);
</script>

<template>
  <ScrollArea class="max-h-[calc(100vh-500px)] rounded-md border">
    <Table>
      <TableCaption>Список категорий</TableCaption>
      <TableHeader >
        <TableRow>
          <TableHead >№</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead class="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(category, index) in categories" :key="category.id">
          <TableCell class="font-medium">{{ index + 1 }}</TableCell>
          <TableCell>{{ category?.name }}</TableCell>
          <TableCell class="text-right">             
            <CategoriesCategoryModalUpdate :category="category" @getCategories="emit('getCategories')"/>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
</template>