<template>
  <!-- Modal warning -->
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
                    Die Frist zum Einreichen der Fächer ist abgelaufen, daher können Sie keine
                    Fächer mehr erstellen, ändern oder löschen
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

  <!-- Modal warning -->
  <TransitionRoot as="template" :show="showModalWarningGenehmigt">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="showModalWarningGenehmigt = false"
    >
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
                    Dieses Freifach wurde bereits genehmigt, deswegen können Sie es nicht mehr
                    ändern oder löschen.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-500 focus:outline-none sm:text-sm"
                @click="showModalWarningGenehmigt = false"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!--Modal delete -->
  <TransitionRoot as="template" :show="showModalDel">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="showModalDel = false">
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
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Freifach löschen
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Sind Sie sicher, dass Sie das Freifach löschen wollen, Sie können dies nicht
                    mehr rückgängig machen!
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                @click="fachDel"
              >
                Löschen
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                @click="showModalDel = false"
                ref="cancelButtonRef"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
  <div>
    <div class="sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 ml-2" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            @click="changeSite(tab.link)"
            :class="[
              tab.current
                ? 'border-htl_rot text-htl_rot'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </a>
        </nav>
      </div>
    </div>
  </div>
  <h1 class="text-center text-4xl mt-3">
    Willkommen {{ aktiverUser.vorname }} {{ aktiverUser.nachname }}
  </h1>
  <br />
  <p class="text-center mx-4">
    Hier können Sie alle Ihre Freifächer und deren Status anzeigen. Außerdem können Sie neue
    Freifächer hinzufügen und bereits erstelle Fächer ändern
  </p>
  <br />
  <br />
  <h3 class="max-w-6xl mx-auto text-2xl font-bold ml-4">Ihre Freifächer:</h3>
  <br />
  <div v-if="showAddFach" class="text-center">
    <svg
      class="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">kein Freifach</h3>
    <p class="mt-1 text-sm text-gray-500">Sie haben noch kein Freifach, erstellen Sie eines</p>
    <div class="mt-6">
      <button
        @click="router.push('/addFach')"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Neues Freifach
      </button>
    </div>
  </div>
  <div v-else class="flex flex-wrap justify-center">
    <div class="relative max-w-7xl mx-auto">
      <div class="mt-12 max-w-lg grid gap-5 lg:grid-cols-3 lg:max-w-none mx-4">
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
                  Benötigte Schüler: <span class="text-black">{{ fach.min_schueler }}</span>
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Maximale Schüler: <span class="text-black">{{ fach.max_schueler }}</span>
                </p>
                <!-- <p class="mt-3 text-base text-gray-500">
                  Jahrgänge:
                  <span class="text-black" v-for="jahrgang of fach.voraussetzungen"
                    >{{ jahrgang }},
                  </span>
                </p> -->
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 mt-3">
                  <p class="mt-3 text-base text-gray-500">Jahrgänge:</p>
                  <div v-for="(voraussetzung, i) of fach.voraussetzungen" :key="i" class="mt-1">
                    <p
                      class="mt-1text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      :class="[
                        fach ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                        'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                      ]"
                      :aria-current="fach ? 'page' : undefined"
                    >
                      <span class="truncate">
                        {{ voraussetzung }}
                      </span>
                    </p>
                  </div>
                </div>
                <br />
                <span
                  v-if="fach.genehmigt == 'false'"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-600 text-black"
                >
                  Abgelehnt
                </span>
                <span
                  v-else-if="fach.genehmigt == 'true'"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-600 text-black"
                >
                  Angenommen
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-600 text-white"
                >
                  Pending
                </span>
              </a>
            </div>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-center gap-2"
          >
            <button
              @click="detail(fach)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black"
            >
              Detail
            </button>
            <button
              @click="bearbeiten(fach)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black"
            >
              Bearbeiten
            </button>
            <button
              @click="openModalError(fach)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black"
            >
              Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
</template>

<script setup>
//Tailwind Imports
import { PlusIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

//Vue imports
import { ref, onMounted, reactive } from 'vue';

//sonstige imports
import axios from 'axios';
import moment from 'moment';

//Router impotieren
import { useRouter } from 'vue-router';

import { PiniaStore } from '../Store/Store.js';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//Store einbinden
const store = PiniaStore();

//Router erstellen
const router = useRouter();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let showAddFach = ref(false);
let faecher = ref([]);
let showModalWarning = ref(false);
let showModalDel = ref(false);
let showModalWarningGenehmigt = ref(false);
let fristEinreichen = ref(null);
let aktuellesDatum = reactive[null];
let fachZuLöschen = ref(null);

const tabs = [
  { name: 'Mein Account', link: '/Account', current: true },
  { name: 'Fach erstellen', link: '/addFach', current: false },
];

onMounted(async () => {
  // Freifaecher vom Server holen
  const { data } = await axios.get(`/getFreifaecher?email=${props.aktiverUser.email}`);

  console.log(data);

  //schauen ob Faecher vorhanden sind
  if (data.length == 0) showAddFach.value = true;
  else {
    faecher.value = data;

    //Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
    VoraussetzungenVonDbNutzbarMachen();
  }
});

const props = defineProps({
  aktiverUser: {},
});

function bearbeiten(fach) {
  //Frist aus dem Store holen
  fristEinreichen.value = store.getFristEinreichen.original;
  let aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  let erg = moment(fristEinreichen.value).isBefore(aktuellesDatum);

  if (fach.genehmigt != 'true') {
    if (erg) {
      showModalWarning.value = true;
    } else {
      //Fach in den LocalStorage schreiben
      try {
        //Fach entfernen falls gesetzt
        localStorage.removeItem('changeFach');
        localStorage.setItem('changeFach', Encrypt.encryptString(JSON.stringify(fach)));
        router.push('/addFach');
      } catch (error) {
        localStorage.setItem('changeFach', Encrypt.encryptString(JSON.stringify(fach)));
        router.push('/addFach');
        console.log(error);
      }
    }
  } else showModalWarningGenehmigt.value = true;
}

//Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
function VoraussetzungenVonDbNutzbarMachen() {
  for (const fach of faecher.value) {
    let vor = fach.voraussetzungen.slice(1, fach.voraussetzungen.length - 1).split(',');

    fach.voraussetzungen = [];

    for (const key of vor) {
      let abc = key.replaceAll('"', '');

      fach.voraussetzungen.push(abc);
    }
  }
}

function openModalError(fach) {
  //Frist ist aus dem Store holen
  const fristEinreichen = store.getFristEinreichen;

  //Daten holen
  fristEinreichen.value = fristEinreichen.original;
  aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  const erg = moment(aktuellesDatum).isBefore(fristEinreichen.value);

  if (fach.genehmigt != 'true') {
    if (!erg) {
      showModalWarning.value = true;
    } else {
      showModalDel.value = true;
      fachZuLöschen.value = fach;
    }
  } else showModalWarningGenehmigt.value = true;
}

async function fachDel() {
  const fachZuDel = fachZuLöschen.value;
  const res = await axios.delete(`/delFach/${fachZuDel.f_id}?lehrerID=${props.aktiverUser.email}`);

  if (res.status != 200) {
    console.log(res);
  }

  faecher.value = faecher.value.filter((fach) => fach.f_id != fachZuDel.f_id);

  showModalDel.value = false;
}

function detail(fach) {
  localStorage.setItem('detailAnsichtLehrer', Encrypt.encryptString(JSON.stringify(fach)));
  router.push('/freifachDetailLehrer');
}

function changeSite(to) {
  //Frist aus dem Store holen
  fristEinreichen.value = store.getFristEinreichen.original;
  let aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  let erg = moment(fristEinreichen.value).isBefore(aktuellesDatum);
  if (erg) {
    showModalWarning.value = true;
  } else {
    router.push(to);
  }
}
</script>
