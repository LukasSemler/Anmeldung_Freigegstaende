<template>
  <div>
    <h1 class="text-center text-4xl">Hier kommt ein DatePicker</h1>
    <div class="flex flex-col justify-center">
      <div class="w-2/3">
        <label for="einreichen">Frist fuer das Einreichen von Faechern</label>
        <input v-model="fristEinreichen" type="date" id="einreichen" name="einreichen" />
        <label for="einreichen">Frist fuer das Einreichen von Faechern</label>
        <input v-model="fristAnmelden" type="date" id="einreichen" name="einreichen" />
      </div>
    </div>
  </div>
  {{ fristEinreichen }}
  {{ fristAnmelden }}
  <button
    @click="setFristen"
    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
  >
    Fristen setzen
  </button>
</template>

<script setup>
import 'tw-elements';
import axios from 'axios';
import { ref } from 'vue';

let fristEinreichen = ref(null);
let fristAnmelden = ref(null);

async function setFristen() {
  let today = new Date();

  await axios.patch('http://localhost:2410/changeTimeLine', {
    datum: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    icon: 'CheckIcon',
    iconbackground: 'bg-green-600',
  });

  await axios.post('http://localhost:2410/setFristen', {
    fristEinreichen: fristEinreichen.value,
    fristAnmelden: fristAnmelden.value,
  });
}
</script>
