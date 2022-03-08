<template>
  <vue3-flip-countdown
    :deadline="endzeitpunkt"
    mainFlipBackgroundColor="#000000"
    secondFlipBackgroundColor="#000000"
    mainColor="#be1622"
    secondFlipColor="#8d1717"
  ></vue3-flip-countdown>
</template>

<script>
import { ref } from 'vue';
let endzeitpunkt = ref('2023-12-12 00:00:00');
</script>
