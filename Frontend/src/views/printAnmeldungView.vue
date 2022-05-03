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
                    Da die Frist zum Anmelden von den Freifächern noch nicht abgelaufen ist, kannst
                    du noch keine Anmeldung drucken. Warte bis die Frist abgelaufen ist, um zu
                    drucken.
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
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-htl_rot focus:border-htl_rot sm:text-sm rounded-md"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 ml-2" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            @click="router.push(tab.link)"
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
    <div class="flex justify-center">
      <p class="ml-12 mr-12 mt-4 text-center w-1/2" id="noPrint">
        Anbei dürfen wir Ihnen einige Informationen zu den Freifächern und unverbindlichen Übungen
        der IT-Abteilung übermitteln. Freifächer und unverbindliche Übungen finden zusätzlich zum
        Pflichtunterricht statt. Mit der Anmeldung ist die Teilnahme für ein Schuljahr
        verpflichtend.
      </p>
    </div>

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
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import moment from 'moment';

import { PiniaStore } from '../Store/Store.js';
const store = PiniaStore();

const router = useRouter();

const showModalWarning = ref(false);

//Tabs für das Menü anzeigen
const tabs = [
  { name: 'Mein Account', link: '/Account', current: false },
  { name: 'Anmeldung Drucken', link: '/printAnmeldung', current: true },
];

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let user = ref({ vorname: 'Loading', nachname: 'Loading', klasse: 'Loading' });
let daten = ref([]);
let aktuellesDatum = new Date();
let output = ref('');

onMounted(async () => {
  output.value = `${aktuellesDatum.getDate()}.${
    aktuellesDatum.getMonth() + 1
  }.${aktuellesDatum.getFullYear()}`;

  try {
    user.value = store.getAktivenUser;
  } catch (error) {
    console.log(error);
  }
  const { data } = await axios.get(`/getFaecherFromStudent/${store.aktiverUser.s_id}`);
  daten.value = data;
});

function print() {
  //Frist aus dem Store holen
  const frist = store.getFristEinreichen;

  //Daten holen
  let fristEinreichen = frist.original;
  let aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  let erg = moment(fristEinreichen.value).isBefore(aktuellesDatum);

  //Überprüfung ob Anmeldefrist
  if (!erg) {
    showModalWarning.value = true;
  } else window.print();
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
