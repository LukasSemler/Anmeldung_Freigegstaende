<template>
  <div class="h-24" id="Print">
    <img
      src="../assets/Logo HTL Wien West.png"
      alt="HTL Logo"
      class="float-right object-cover h-24 mr-4 pt-4"
    />
  </div>
  <h1 id="noPrint" class="text-center text-3xl font-black mt-6">
    Formular fuer die Anmeldung zu den Freifächer
  </h1>

  <div id="Print">
    <h1 class="text-center text-3xl font-black mt-6">Anmeldung zu den Freifächer</h1>
    <br />
    <br />
    <div class="flex justify-center mt-6">
      <div class="text-base w-2/3">
        <p>
          Schüler/in:<span class="underline ml-6 pb-1">
            {{ user.vorname }} {{ user.nachname }}</span
          >
        </p>
        <p>
          Klasse (aktuell): <span class="ml-6 underline">{{ user.klasse }}</span>
        </p>

        <h3 class="mt-6 font-bold">
          Für das kommende Schuljahr wird mein Sohn/meine Tochter folgende Angebote besuchen:
        </h3>

        <ul v-for="fach in daten" class="list-disc mt-8">
          <li>{{ fach.titel }}</li>
        </ul>
        <div class="h-48"></div>
        <p class="mt-8">Bitte bewahren Sie eine Kopie dieser Anmeldung auf.</p>
        <p class="mt-8">Wien, am {{ output }}</p>
        <p class="mt-2">
        <div class="flex flex-row"> Unterschrift Erziehungsberechtigte:
          <div class="border-b border-black w-52 ml-3"></div>
        </div>
         
        </p>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-6">
    <button
      @click="print"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Print
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

let user = ref({ vorname: 'Loading', nachname: 'Loading', klasse: 'Loading' });
let daten = ref([]);
let aktuellesDatum = new Date();
let output = ref('');

onMounted(async () => {
  output.value = `${aktuellesDatum.getDate()}.${
    aktuellesDatum.getMonth() + 1
  }.${aktuellesDatum.getFullYear()}`;
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
  #footer,
  #noPrint {
    display: none !important;
  }

  #Print {
    display: block !important;
  }
}

#Print {
  display: none;
}
</style>
