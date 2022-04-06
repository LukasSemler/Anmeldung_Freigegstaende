<template>
  <h1 class="text-center text-4xl font-black mt-3">Anmeldung für Freifächer</h1>
  <br />
  <br />
  <div class="text-xl">
    <p>
      Schüler/in:<span class="underline ml-2 pb-1"> {{ user.vorname }} {{ user.nachname }}</span>
    </p>
    Klasse (aktuell): <span class="ml-2 underline">{{ user.klasse }}</span>

    <h3 class="text-xl">
      Für das kommende Schuljahr wird mein Sohn/meine Tochter folgende Angebote besuchen:
    </h3>

    <ul>
      <li></li>
    </ul>
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
    console.log('x');
    user.value = store.getAktivenUser;
    console.log('y');
    console.log(user.value);
  } catch (error) {
    console.log(error);
  }
  setTimeout(async() => {
    const { data } = await axios.get(
    `http://localhost:2410/getFaecherFromStudent/${user.s_id}`,
  );
  daten.value = data;
  console.log(daten.value);
  }, 1000);

});
</script>
