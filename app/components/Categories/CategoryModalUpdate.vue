<script setup lang="ts">
const props = defineProps(['category']);
const emit = defineEmits(['getCategories']);
const categoryInput = ref({ ...props.category });

const updateCategory = async () => {
  try {
    const res = await $fetch('/api/admin/category/update-category', {
      method: 'POST',
      body: { id: categoryInput.value.id, name: categoryInput.value.name },
    });

    console.log(res.message);
    emit('getCategories');
    categoryInput.value = { id: null, name: '' };
    
  } catch (error) {
    console.error('Ошибка при редактировании категории: ', error);
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Icon name="ep:edit" size="30" class="text-gray-500 hover:text-[#FF961C] cursor-pointer" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Редактировать категорию</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form @submit.prevent="updateCategory">
        <div class="grid gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Новое имя категории</label>
            <Input v-model="categoryInput.name" type="text" id="name" required />
          </div>
          <DialogFooter>
            <Button type="submit" class="bg-[#FF961C] cursor-pointer">Сохранить</Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>