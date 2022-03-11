<template>
  <h1 class="text-center text-4xl">Anmeldung Freifächer</h1>
  <!-- <img crossorigin="anonymous" src="http://localhost:2410/images/asdasd.png" alt=""> -->
  <br />
  <CountDown></CountDown>
</template>

<script setup>
//Components einbinden
import NavBar from '../components/NavBar.vue';
import CountDown from '../components/CountDown.vue';
import Store from '../composables/Store.js';
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(async () => {
  const { data } = await axios.get('http://localhost:2410/getFristen');

  Store.state

  if (!Store.state.fristAnmelden && !Store.state.fristEinreichen) {
    Store.state.fristEinreichen = data.frist_einreichen;
    Store.state.fristAnmelden = data.frist_anmelden;
  }

  console.log(Store.state.fristAnmelden);
});
</script>

<style></style>
