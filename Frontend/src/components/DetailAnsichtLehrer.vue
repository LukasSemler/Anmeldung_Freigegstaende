<template>
  <div>
    <div class="h-full flex">
      <!-- Static sidebar for desktop -->
      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div class="flex-1 relative z-0 flex overflow-hidden">
          <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <article>
              <!-- lehrerProfil header -->
              <div>
                <div>
                  <img
                    async
                    crossorigin="anonymous"
                    class="h-60 w-full object-cover lg:h-60"
                    :src="freifachRef.thumbnail"
                    alt=""
                  />
                </div>
                <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                      <img
                        class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        async
                        :src="Store.getters.getAktivenUser().icon"
                        referrerpolicy="no-referrer"
                      />
                    </div>
                    <div
                      class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                    >
                      <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-gray-900 truncate">
                          {{ freifachRef.titel }}
                        </h1>
                      </div>
                      <div
                        class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <button
                          type="button"
                          class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-htl_hellrot"
                        >
                          <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Nachricht an Schüler*innen senden</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="bg-lime-200 hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                    <h1 class="text-2xl font-bold text-gray-900 truncate">
                      {{ freifachRef.titel }}
                    </h1>
                  </div>
                </div>
              </div>
              <br />
              <!-- Description list -->
              <div class="mt-8 flex justify-center">
                <div class="w-1/2">
                  <div class="mt-5 border-t border-gray-200">
                    <dl class="sm:divide-y sm:divide-gray-200">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Beschreibung:</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ freifachRef.beschreibung }}
                        </dd>
                      </div>
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Benötigte Wochenstunden</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ freifachRef.anzahl_stunden }}
                        </dd>
                      </div>
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">
                          Maximale Anzahl von Schülern*innen
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ freifachRef.max_schueler }}
                        </dd>
                      </div>
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">
                          Minimale Anzahl von Schüler*innen
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ freifachRef.min_schueler }}
                        </dd>
                      </div>

                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-0">
                        <dt class="text-sm font-medium text-gray-500">Jahrgänge</dt>
                        <div
                          class="mt-1 text-gray-900 font-bold"
                          v-for="(klasse, i) in freifachRef.voraussetzungen"
                          :key="i"
                        >
                          <p>{{ klasse }}</p>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <br />
              <br />

              <!-- Team member list -->
              <div class="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
                <h2 class="text-sm font-medium text-gray-500">Angenomme Schüler*innen:</h2>
                <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    v-if="angenommen.length > 0"
                    v-for="schueler in angenommen"
                    :key="schueler.s_id"
                    class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                  >
                    <div>
                      <div class="flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="schueler.icon"
                          alt=""
                          async
                          referrerpolicy="no-referrer"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true" />
                          <p class="text-sm font-medium text-gray-900">
                            {{ schueler.vorname }} {{ schueler.nachname }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">{{ schueler.email }}</p>
                          <p class="text-sm text-gray-500 truncate">{{ schueler.klasse }}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div v-else><h1>Es wurde noch kein Schüler*inn angenommen</h1></div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
    <div class="flex justify-center shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="schueler of schueler" :key="schueler.s_id">
          <a v-if="schueler.status == 'pending'" class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img
                    class="h-12 w-12 rounded-full"
                    :src="schueler.icon"
                    alt=""
                    async
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-sm font-medium text-htl_rot truncate">
                      {{ schueler.vorname }} {{ schueler.nachname }}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      Klasse:
                      {{ schueler.klasse }}
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div v-if="schueler.status == 'pending'" class="ml-5">
                      <button
                        @click="annehmen(schueler)"
                        class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        Annehmen
                      </button>
                      <button
                        @click="ablehnen(schueler)"
                        class="mx-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        Ablehnen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <!-- <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { MailIcon } from '@heroicons/vue/solid';
import { onMounted, ref } from 'vue';
import Store from '../composables/Store.js';
import axios from 'axios';

let freifachRef = ref({});
let schueler = ref([]);

//Schüler die im Freifach inkludiert sind
let angenommen = ref([]);

onMounted(async () => {
  try {
    const freifach = JSON.parse(localStorage.getItem('detailAnsichtLehrer'));
    freifachRef.value = freifach;

    //Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
    VoraussetzungenVonDbNutzbarMachen();
  } catch (err) {
    console.log(err);
    // console.error('Es wurde kein Freifach gefunden');
  }

  schueler.value = await getData();

  for (const iterator of schueler.value) {
    if (iterator.status == 'true') angenommen.value.push(iterator);
  }
});

//Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
function VoraussetzungenVonDbNutzbarMachen() {
  let vor = freifachRef.value.voraussetzungen
    .slice(1, freifachRef.value.voraussetzungen.length - 1)
    .split(',');

  freifachRef.value.voraussetzungen = [];

  for (const key of vor) {
    freifachRef.value.voraussetzungen.push(key.slice(1, key.length - 1));
  }
}

async function annehmen(s) {
  const res = await axios.patch(`http://localhost:2410/accepDeclineStudent/${s.s_id}`, {
    status: 'true',
    fachID: freifachRef.value.f_id,
  });

  if (res.status == 200) {
    const gefunden = schueler.value.find((elem) => elem == s);
    gefunden.status = 'true';
    angenommen.value.push(gefunden);
    console.log(gefunden);
  }
}

async function ablehnen(s) {
  const res = await axios.patch(`http://localhost:2410/accepDeclineStudent/${s.s_id}`, {
    status: 'false',
    fachID: freifachRef.value.f_id,
  });

  if (res.status == 200) {
    schueler.value = schueler.value.filter((elem) => elem != s);
  }
}

async function getData() {
  const { data } = await axios.get(
    `http://localhost:2410/getSchuelerFaecher?id=${freifachRef.value.f_id}`,
  );

  return data;
}
</script>
