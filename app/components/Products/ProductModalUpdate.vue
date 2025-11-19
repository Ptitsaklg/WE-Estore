<script setup lang="ts">
const props = defineProps(['product', "categories"]);
const emit = defineEmits(['getProducts']);
const productInput = ref({ ...props.product });

const updateProduct = async () => {
  try {
    const res = await $fetch('/api/admin/product/update', {
      method: 'POST',
      body: { id: productInput.value.id, name: productInput.value.name, color: productInput.value.color, categoryId: productInput.value.categoryId, price: productInput.value.price },
    });

    console.log(res.message);
    emit('getProducts');
    productInput.value = { id: null, name: '', color: '', categoryId: null, price: 0 };
    
  } catch (error) {
    console.error('Ошибка при редактировании продукта: ', error);
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
        <DialogTitle>Редактировать продукт</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form @submit.prevent="updateProduct">
        <div class="grid gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Новое имя продукта</label>
            <Input v-model="productInput.name" type="text" id="name" required />
          </div>
          <div>
            <label for="color" class="block text-sm font-medium text-gray-700">Новый цвет продукта</label>
            <Input v-model="productInput.color" type="text" id="color" required />
          </div>
          <Select v-model="productInput.categoryId">
            <SelectTrigger>
              <SelectValue placeholder="Выбрать категорию продукта" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Категории</SelectLabel>
                <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Новая цена продукта</label>
            <Input v-model="productInput.price" type="text" id="price" min="1" required />
          </div>
          <DialogFooter>
            <Button type="submit" class="bg-[#FF961C] cursor-pointer">Сохранить</Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>