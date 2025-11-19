<script setup>

</script>

<template>
  <div class="grid items-start sm:flex">
    <Sidebar/>
    <div class="w-full p-4 sm:p-6">
      <slot />
    </div>
  </div>
</template>