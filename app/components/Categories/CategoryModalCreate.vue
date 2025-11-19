<script setup lang="ts">
const emit = defineEmits(['getCategories']);
const categoryStore = useCategoryStore();
const { categoryInput } = storeToRefs(categoryStore);

const createCategory = async () => {
  try {
    const res = await $fetch('/api/admin/category/create-category', {
      method: 'POST',
      body: { name: categoryInput.value.name },
    });

    console.log(res.message);
    emit('getCategories');

    categoryInput.value = { id: null, name: '' };
  } catch (error) {
    console.error('Ошибка при создании категории: ', error);
  }
};
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button class="bg-[#FF961C] cursor-pointer">Создать категорию</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать категорию</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form @submit.prevent="createCategory">
          <div class="grid gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Имя категории</label>
              <Input v-model="categoryInput.name" type="text" id="name" required />
            </div>
            <DialogFooter>
              <Button type="submit" class="bg-[#FF961C] cursor-pointer">Сохранить</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>