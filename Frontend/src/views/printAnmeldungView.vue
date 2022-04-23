<template>
  <div>
    <div class="h-24" id="Print">
      <img
        src="/HTLWienWestLogo.png"
        alt="HTL Logo"
        class="float-right object-cover h-24 mr-4 pt-4"
      />
    </div>
    <h1 id="noPrint" class="text-center text-3xl font-black mt-6">
      Formular für die Anmeldung zu den Freifächer
    </h1>
    <p class="mx-6 mt-4" id="noPrint">
      Anbei dürfen wir Ihnen einige Informationen zu den Freifächern und unverbindlichen Übungen der
      IT-Abteilung übermitteln. Freifächer und unverbindliche Übungen finden zusätzlich zum
      Pflichtunterricht statt. Mit der Anmeldung ist die Teilnahme für ein Schuljahr verpflichtend.
    </p>

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

          <ul v-for="(fach, i) in daten" class="list-disc mt-8" :key="i">
            <li>{{ fach.titel }}</li>
          </ul>
          <div class="h-48"></div>
          <p class="mt-8">Bitte bewahren Sie eine Kopie dieser Anmeldung auf.</p>
          <p class="mt-8">Wien, am {{ output }}</p>
          <span class="mt-2">
            <div class="flex flex-row">
              Unterschrift Erziehungsberechtigte:
              <div class="border-b border-black w-52 ml-3"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <button
        @click="print"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-htl_rot hover:bg-htl_hellrot"
      >
        Drucken
        <!--Printer-Logo-->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-2 mt-1 h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
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
  } catch (error) {
    console.log(error);
  }
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_ADRESS}/getFaecherFromStudent/${store.aktiverUser.s_id}`);
  daten.value = data;
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
