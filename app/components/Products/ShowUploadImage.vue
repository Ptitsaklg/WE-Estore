<script setup>
const props = defineProps(["images"]);

</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Icon 
        name="mdi:eye-outline" 
        size="30" 
        class="ml-1 text-gray-500 hover:text-[#FF961C] cursor-pointer"
      />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Загруженные изображения</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
        <div class="grid gap-4">
          <img 
            v-for="image in images"
            :key="image.url"
            :src="image.url"
            style="height: 150px" 
            alt="image" 
          />
        </div>
    </DialogContent>
  </Dialog>
</template>