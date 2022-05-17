<template>
  <TransitionRoot as="template" :show="showModalWarning">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="showModalWarning = false">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
              >
                <ExclamationIcon class="h-6 w-6 text-orange-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Warning
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Da die Frist zum Anmelden noch nicht abgelaufen ist, können noch keine
                    Schüler*innen angenommen oder abgelehnt werden
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-500 focus:outline-none sm:text-sm"
                @click="showModalWarning = false"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

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
                        :src="store.getAktivenUser.icon"
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
                  <div v-else><h1>Es wurde noch kein(e) Schüler*in angenommen</h1></div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>

    <div class="mx-12">
      <!-- <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-orange-500"> KANNST DU LÖSCHEN ;) -->
      <ul role="list" class="w-full flex flex-row flex-wrap justify-center gap-12">
        <li
          v-for="schueler in onlyPending"
          :key="schueler.s_id"
          class="col-span-1 bg-white rounded-lg shadow-xl divide-y divide-gray-200"
        >
          <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-sm font-medium truncate">
                  {{ schueler.vorname }} {{ schueler.nachname }}
                </h3>
                <span
                  class="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium text-gray-500 rounded-full"
                  >{{ schueler.email }}</span
                >
              </div>
              <p class="mt-1 text-gray-500 text-sm truncate">Klasse: {{ schueler.klasse }}</p>
            </div>
            <img
              class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
              :src="schueler.icon"
              async
              referrerpolicy="no-referrer"
            />
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <a
                  @click="annehmen(schueler)"
                  class="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-bl-lg text-white bg-green-500 hover:bg-green-300 hover:text-black"
                >
                  <span class="ml-3">Annehmen</span>
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <a
                  @click="ablehnen(schueler)"
                  class="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-br-lg text-white bg-red-600 hover:bg-red-500 hover:text-black"
                >
                  <span class="ml-3">Ablehnen</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { MailIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import moment from 'moment';

import { PiniaStore } from '../Store/Store.js';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//Store einbinden
const store = PiniaStore();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let freifachRef = ref({});
let schueler = ref([]);
let showModalWarning = ref(false);
let fristAnmelden = ref(null);
let erg = ref(null);

//Schüler die im Freifach inkludiert sind
let angenommen = ref([]);

onMounted(async () => {
  try {
    //Freifach aus dem LS holen
    const freifach = JSON.parse(Encrypt.decryptString(localStorage.getItem('detailAnsichtLehrer')));
    freifachRef.value = freifach;

    //Frist aus dem Store holen
    fristAnmelden.value = store.getFristAnmelden.original;
    let aktuellesDatum = new Date();

    //Schauen ob das Datum vor oder nach der Frist ist
    erg.value = moment(fristAnmelden.value).isBefore(aktuellesDatum);

    if (erg.value) {
      console.log('Sie können noch nicht checken');
      showModalWarning.value = true;
    }

  } catch (err) {
    console.log(err);
    // console.error('Es wurde kein Freifach gefunden');
  }

  schueler.value = await getData();

  for (const iterator of schueler.value) {
    if (iterator.status == 'true') angenommen.value.push(iterator);
  }
});

async function annehmen(s) {
  if (!erg.value) {
    showModalWarning.value = true;
  } else {
    const res = await axios.patch(`/accepDeclineStudent/${s.s_id}`, {
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
}

async function ablehnen(s) {
  if (!erg.value) {
    showModalWarning.value = true;
  } else {
    const res = await axios.patch(`/accepDeclineStudent/${s.s_id}`, {
      status: 'false',
      fachID: freifachRef.value.f_id,
    });

    if (res.status == 200) {
      schueler.value = schueler.value.filter((elem) => elem != s);
    }
  }
}

async function getData() {
  const { data } = await axios.get(`/getSchuelerFaecher?id=${freifachRef.value.f_id}`);

  return data;
}

const onlyPending = computed(() => {
  return schueler.value.filter((elem) => elem.status == 'pending');
});
</script>
