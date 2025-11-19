<script setup lang="ts">
const props = defineProps(['categories']);
const emit = defineEmits(['getProducts']);

const productStore = useProductStore();
const { productInput, productColors } = storeToRefs(productStore);

const createProduct = async () => {
  try {
    const res = await $fetch('/api/admin/product/create', {
      method: 'POST',
      body: { name: productInput.value.name, color: productInput.value.color, categoryId: productInput.value.categoryId, price: productInput.value.price },
    });

    console.log(res.message);
    emit('getProducts');
    productInput.value = { id: null, name: '', color: '', categoryId: null, price: 0 };

  } catch (error) {
    console.error('Ошибка при создании продукта: ', error);
  }
};
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button class="bg-[#FF961C] cursor-pointer">Создать продукт</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать продукт</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form @submit.prevent="createProduct">
          <div class="grid gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Название продукта</label>
              <Input v-model="productInput.name" type="text" id="name" required />
            </div>
            <Select v-model="productInput.color">
              <SelectTrigger>
                <SelectValue placeholder="Выбрать цвет продукта" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Цвета</SelectLabel>
                  <SelectItem v-for="color in productColors" :key="color" :value="color">
                    {{ color }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
              <label for="price" class="block text-sm font-medium text-gray-700">Цена продукта</label>
              <Input v-model="productInput.price" type="text" id="price" min="1" required />
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