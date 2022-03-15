<template>
  <vue3-flip-countdown
    :deadline="endzeitpunkt"
    mainFlipBackgroundColor="#000000"
    secondFlipBackgroundColor="#000000"
    mainColor="#be1622"
    secondFlipColor="#8d1717"
  ></vue3-flip-countdown>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({ endzeitpunkt: String });

</script>
