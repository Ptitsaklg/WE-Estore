<script setup>
const config = useRuntimeConfig();
const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL;
const emit = defineEmits(["select"]);

function selectImage(url) {
  mainImgUrl.value = url;
  emit("select", url);
}

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const imgWidth = 540;
const mainImgUrl = ref(FALL_BACK_IMG_URL);

watchEffect(() => {
  mainImgUrl.value = props.images?.[0]?.url || FALL_BACK_IMG_URL;
});

</script>

<template>
  <div>
    <NuxtImg
      class="rounded-xl object-contain w-full min-w-[350px]"
      :width="imgWidth"
      :height="imgWidth"
      alt="product-name"
      title="product-name"
      :src="mainImgUrl"
      fetchpriority="high"
      placeholder
      placeholder-class="blur-xl"
    />
    <div
      class="my-4 flex md:grid overflow-auto md:overflow-visible gap-4 
      md:[grid-template-columns:repeat(auto-fill,minmax(72px,1fr))] [scrollbar-width:none] [-ms-overflow-style:none]"
    >
      <NuxtImg
        v-for="image in images"
        :key="image?.id"
        :src="image?.url || FALL_BACK_IMG_URL"
        alt="product-name"
        title="product-name"
        loading="lazy"
        placeholder
        placeholder-class="blur-xl"
        :width="imgWidth"
        :height="imgWidth"
        @click="selectImage(image?.url)"
        class="cursor-pointer rounded-xl w-[72px] aspect-[5/6] object-cover md:w-full"
      />
    </div>
  </div>
</template>