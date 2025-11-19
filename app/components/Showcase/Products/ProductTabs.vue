<script setup>
const tabs = [
  {
    title: "Отзывы"
  },
   {
    title: "Характеристики товара"
  },
]
</script>

<template>
  <Tabs default-value="Отзывы" >
    <TabsList>
      <TabsTrigger v-for="(tab, index) in tabs" :key="index" :value="tab.title">
        {{ tab.title }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="Отзывы" class="w-[99%] border rounded-lg p-3">
      <ShowcaseProductsProductReviews />
    </TabsContent>
    <TabsContent value="Характеристики товара" class="w-[99%] border rounded-lg p-3">
      <ShowcaseProductsSpecifications />
    </TabsContent>
  </Tabs>
</template>

