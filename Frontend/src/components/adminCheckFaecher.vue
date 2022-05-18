<template>
  <!-- Warning Modal -->
  <TransitionRoot as="template" :show="showModalWarning">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="closeModal">
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
                    Da die Frist zum Einreichen noch nicht abgelaufen ist, können noch keine Fächer
                    angenommen, abgelehnt oder geändert werden
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
    
    <div class="sm:block">
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
  <h1 class="text-center text-4xl mt-2">Fächer überprüfen</h1>
  <br />
  <br />
  <div class="flex flex-row">
    <div class="flex flex-row justify-center flex-wrap">
      <div
        v-for="fach of faecher"
        class="bg-white shadow-xl border overflow-hidden sm:rounded-lg w-500 mx-4 md:w-4/12 my-4"
      >
        <div class="flex-shrink-0">
          <img
            crossorigin="anynomous"
            class="h-60 w-full object-cover"
            :src="fach.thumbnail"
            :alt="Math.random() * 100"
          />
        </div>
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-bold leading-6 text-gray-900">{{ fach.titel }}</h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Titel</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ fach.titel }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 h-28">
              <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ fach.beschreibung.slice(0, 160) + '...' }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Anzahl der Schüler*innen</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Minimale Anzahl Schüler: {{ fach.min_schueler }} | Maximale Anzahl Schüler:
                {{ fach.max_schueler }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 h-32">
              <dt class="text-sm font-medium text-gray-500">Jahrgänge</dt>
              <div v-for="(voraussetzung, i) of fach.voraussetzungen" :key="i">
                <dd
                  class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  :class="[
                    fach ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="fach ? 'page' : undefined"
                >
                  <span class="truncate">
                    {{ voraussetzung }}
                  </span>
                </dd>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Benötigte Wochenstunden</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ fach.anzahl_stunden }} Stunden
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Gewichtung:</dt>
              <div class="absolute bottom-5 flex-col items-center hidden mb-6 group-hover:flex">
                <span
                  class="relative w-max z-10 p-2 leading-none text-white whitespace-no-wrap rounded bg-red-600 shadow-lg"
                >
                  Du erfüllst leider nicht alle benötigten Voraussetzungen!
                </span>
                <div class="w-3 h-3 -mt-2 rotate-45 bg-red-600"></div>
              </div>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ fach.gewichtung }}
              </dd>
            </div>
            <div class="bg-gray-50">
              <div class="ml-3 mt-6 flex items-center">
                <div class="flex-shrink-0 mt-2">
                  <a>
                    <span class="sr-only">{{ fach.vorname }} {{ fach.nachname }}</span>
                    <img class="h-10 w-10 rounded-full" :src="fach.icon" alt="" />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a class="hover:underline"> {{ fach.vorname }} {{ fach.nachname }} </a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <p>Email:</p>
                    <span aria-hidden="true"> &middot; </span>
                    <span> {{ fach.email }} </span>
                  </div>
                </div>
              </div>
              <div
                v-if="fach.genehmigt == 'pending'"
                class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-center"
              >
                <button
                  @click="annehmen(fach)"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Annehmen
                </button>
                <button
                  @click="ablehnen(fach)"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Ablehnen
                </button>
                <button
                  @click="change(fach)"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Ändern
                </button>
              </div>
              <div class="flex justify-center mt-3" v-else-if="fach.genehmigt == 'false'">
                <button
                  disabled
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Wurde bereits abgelehnt
                </button>
              </div>

              <div class="flex justify-center mt-3 mb-3" v-else>
                <button
                  disabled
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Wurde bereits genehmigt
                </button>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import router from '../router';
import axios from 'axios';
import moment from 'moment';

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import { PiniaStore } from '../Store/Store.js';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//Store einbinden
const store = PiniaStore();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let faecher = ref([]);
let fristEinreichen = ref(null);
let showModalWarning = ref(false);
let aktuellesDatum = reactive[null];
let erg = ref(null);

// Tabs erstellen
const tabs = [
  { name: 'Mein Account', link: '/Account', current: false },
  { name: 'Fristen setzen', link: '/setFrist', current: false },
  { name: 'Fächer überprüfen', link: '/adminCheckFaecher', current: true },
];

onMounted(async () => {
  //Frist aus dem Store holen
  const frist = store.getFristEinreichen;

  //Daten holen
  fristEinreichen.value = frist.original;
  aktuellesDatum = new Date();

  console.log(fristEinreichen.value);
  console.log(aktuellesDatum);

  //Schauen ob das Datum vor oder nach der Frist ist
  erg.value = moment(fristEinreichen.value).isBefore(aktuellesDatum);

  console.log('Ergebnis', erg.value);
  if (!erg.value) {
    console.log('Sie können noch nicht checken');
    showModalWarning.value = true;
  }

  //Daten holen + Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
  getData();
});

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

async function annehmen(fach) {
  if (erg.value) {
    try {
      console.log(fach.f_id);
      const res = await axios.patch(`/acceptFach/${fach.f_id}`, {
        genehmigt: true,
      });

      getData();
    } catch (error) {}
  } else {
    console.log('Sie können noch nicht checken');
    showModalWarning.value = true;
  }
}

async function ablehnen(fach) {
  if (erg.value) {
    try {
      const res = await axios.patch(`/acceptFach/${fach.f_id}`, {
        genehmigt: false,
      });

      getData();
    } catch (error) {}
  } else {
    console.log('Sie können noch nicht checken');
    showModalWarning.value = true;
  }
}

function change(fach) {
  if (erg.value) {
    console.log('Sie können checken');
    try {
      localStorage.clearItem('changeFach');
      fach.admin = true;
      localStorage.setItem('changeFach', Encrypt.encryptString(JSON.stringify(fach)));
    } catch {
      fach.admin = true;
      localStorage.setItem('changeFach', Encrypt.encryptString(JSON.stringify(fach)));
      router.push('/addFach');
    }
  } else {
    console.log('Sie können noch nicht checken');
    showModalWarning.value = true;
  }
}

async function getData() {
  //Daten holen
  const { data } = await axios.get(`/getFaecherAdmin`);
  faecher.value = data;

  console.log(faecher.value);

  //Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
  VoraussetzungenVonDbNutzbarMachen();
  let alleAccepted = true;

  for (const iterator of faecher.value) {
    if (iterator.genehmigt == 'pending') {
      console.log('Eines ist pending');
      alleAccepted = false;
      break;
    }
  }

  if (alleAccepted == true) {
    let today = new Date();

    const obj = {
      datum: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      icon: 'CheckIcon',
      iconbackground: 'bg-green-600',
    };

    await axios.post(`/changeTimeLine`, obj);
  }
}

function closeModal() {
  showModalWarning.value = false;
}
</script>
