<script setup>
const props = defineProps(['productId']);
const emit = defineEmits(['uploadImage']);

const image = ref(null);
const productStore = useProductStore();

async function uploadImage() {
  try {
    if (image.value !== null) {
      const requestOptions = await productStore.uploadImagePayload(props.productId, image.value);
      const res = await $fetch( "/api/admin/product/upload-image", requestOptions );
      document.querySelector("#outputImage").src = "";
      document.querySelector('#imageInput').value= '';
      emit('uploadImage')

    } else {
      showError("Select the Image");
    }

  } catch (error) {
    console.error('Ошибка при загрузке изображения: ', error);
  }
}

function selectImage(event) {
  const selectedImage = event.target.files[0];
  const output = document.querySelector("#outputImage");
  output.src = URL.createObjectURL(selectedImage);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
  image.value = selectedImage;
}

</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Icon 
        name="material-symbols:image-outline" 
        size="30" 
        class="ml-1 text-gray-500 hover:text-[#FF961C] cursor-pointer"
      />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Загрузить изображение</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form @submit.prevent="uploadImage">
        <div class="grid gap-4">
          <div>
            <img style="height: 150px" alt="image" id="outputImage" />
            <label for="imageInput" class="block text-sm font-medium text-gray-700">Выбрать изображение</label>
            <Input @change="selectImage" type="file" id="imageInput" required />
          </div>
          <DialogFooter>
            <Button type="submit" class="bg-[#FF961C] cursor-pointer">Сохранить</Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>