<template>
  <div>
    <h1 class="text-center text-4xl">Willkommen {{ aktiverUser.name }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  aktiverUser: {},
});

console.log(props);
</script>
