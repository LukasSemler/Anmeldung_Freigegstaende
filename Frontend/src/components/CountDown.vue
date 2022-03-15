<template>
  <vue3-flip-countdown
    deadline="2022-03-20 00:00:00"
    mainFlipBackgroundColor="#000000"
    secondFlipBackgroundColor="#000000"
    mainColor="#be1622"
    secondFlipColor="#8d1717"
  ></vue3-flip-countdown>
</template>

<script>
import { ref } from 'vue';

const props = defineProps({ endzeitpunkt: String });

console.log(props);
</script>
