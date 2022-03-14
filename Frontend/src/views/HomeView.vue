<template>
  <h1 class="text-center text-4xl mt-3">Anmeldung Freifächer</h1>
  <!-- <img crossorigin="anonymous" src="http://localhost:2410/images/asdasd.png" alt=""> -->
  <br />
  <CountDown></CountDown>

  <!--Anzeigecontainer für alle Freifächer-->
  <div class="flex-row flex-wrap flex justify-center mt-8">
    <div
      v-for="(item, i) of Freifaecherliste"
      class="bg-white shadow-xl border overflow-hidden sm:rounded-lg w-500 mx-2 my-4"
    >
      <div class="px-4 py-5 sm:px-6 flex justify-center">
        <img
          class="h-48 w-96 object-scale-down"
          crossorigin="anonymous"
          async
          :src="item.thumbnail"
        />
      </div>
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ item.titel }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ item.lehrer }}</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Titel</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item.titel }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ item.beschreibung }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Benötigte Stunden</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ item.anzahl_stunden }} Stunden
            </dd>
          </div>
          <div class="bg-white px-4 py-5 flex justify-center">
            <button
              @click="detail(item)"
              class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Detailansicht
            </button>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
//Components einbinden
import CountDown from '../components/CountDown.vue';
import Store from '../composables/Store.js';
import { onMounted, ref } from 'vue';
import axios from 'axios';

let Freifaecherliste = ref([]);

onMounted(async () => {
  //Bekommen und anzeigen aller Freifächer
  const { data } = await axios.get('http://localhost:2410/getFreifaecher');
  Freifaecherliste.value = data;
});

function detail() {}
</script>
