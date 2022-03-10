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
</template>

<script setup>
import 'tw-elements';
import { ref } from 'vue';

let fristEinreichen = ref(null);
let fristAnmelden = ref(null);

const objEinreichen = {
  content: 'Frist zum Einreichen und anmelden von Fächern  ',
  target: 'setzen',
}
</script>
