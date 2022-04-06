<template>
  <div class="w-100 mt-4 mr-6 bg-lime-500">
  <div></div>
    <img
      src="../assets/Logo HTL Wien West.png"
      alt="HTL Logo"
      class="float-right object-cover w-40"
    />
  </div>
  <div class="bg-blue-500 ">
    <h1 class="text-center text-4xl font-black mt-3">Anmeldung für Freifächer</h1>
    <br />
    <br />
    <div class="flex justify-center">
      <div class="text-base w-2/3">
        <p>
          Schüler/in:<span class="underline ml-6 pb-1">
            {{ user.vorname }} {{ user.nachname }}</span
          >
        </p>
        Klasse (aktuell): <span class="ml-6 underline">{{ user.klasse }}</span>

        <h3 class="mt-5">
          Für das kommende Schuljahr wird mein Sohn/meine Tochter folgende Angebote besuchen:
        </h3>

        <ul v-for="fach in daten" class="list-disc mt-4">
          <li>{{ fach.titel }}</li>
        </ul>

        <button
          @click="print"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Print
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

let user = ref({ vorname: 'Loading', nachname: 'Loading', klasse: 'Loading' });
let daten = ref([]);

onMounted(async () => {
  console.log('mounted');
  try {
    user.value = store.getAktivenUser;
    console.log(user.value);
  } catch (error) {
    console.log(error);
  }
  const { data } = await axios.get(
    `http://localhost:2410/getFaecherFromStudent/${store.aktiverUser.s_id}`,
  );
  daten.value = data;
  console.log(daten.value);
});

function print() {
  window.print();
}
</script>

<style scoped>
@media print {
  button,
  #footer {
    display: none !important;
  }
}
</style>
