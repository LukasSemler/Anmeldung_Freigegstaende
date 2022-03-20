<template>
  <h1 class="text-center text-4xl mt-3">
    Willkommen {{ aktiverUser.vorname }} {{ aktiverUser.nachname }}
  </h1>

  <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
    <div
      v-for="fach of faecher"
      :key="fach.f_id"
      class="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
      <div class="flex-shrink-0">
        <img
          crossorigin="anynomous"
          class="h-48 w-full object-cover"
          :src="fach.thumbnail"
          alt=""
        />
      </div>
      <div class="flex-1 bg-white p-6 flex flex-col justify-between">
        <div class="flex-1">
          <a class="block mt-2">
            <p class="text-xl font-semibold text-gray-900">
              {{ fach.titel }}
            </p>
            <p class="mt-3 text-base text-gray-500 mb-2">
              {{ fach.beschreibung }}
            </p>
            <hr />
            <p class="mt-3 text-base text-gray-500">
              Anzahl der Stunden: <span class="text-black">{{ fach.anzahl_stunden }}</span>
            </p>
            <p class="mt-3 text-base text-gray-500">
              Benoetigte Schueler: <span class="text-black">{{ fach.min_schueler }}</span>
            </p>
            <p class="mt-3 text-base text-gray-500">
              Maximale Schueler: <span class="text-black">{{ fach.max_schueler }}</span>
            </p>
            <p class="mt-3 text-base text-gray-500">
              Jahrgaenge:
              <span class="text-black">{{ fach.voraussetzungen }}</span>
            </p>
            <br />
          </a>
        </div>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-center">
        <button
          @click="detail(fach)"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black"
        >
          Detail
        </button>
        <button
          @click="abmelden(fach)"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black"
        >
          Abmelden
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

let faecher = ref([]);

onMounted(async () => {
  const { data } = await axios.get(
    `http://localhost:2410/getFaecherSchueler/${props.aktiverUser.s_id}`,
  );
  faecher.value = data;
});

function detail() {}

function abmelden() {}

const props = defineProps({ aktiverUser: {} });
</script>
