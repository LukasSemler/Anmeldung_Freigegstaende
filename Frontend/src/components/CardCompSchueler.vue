<template>
  <div>
    <!-- Modal Warning -->
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
                      Die Frist zum Anmelden für Freifächer ist abgelaufen, daher ist ein
                      Zurückziehen der Anmeldung nicht mehr möglich!
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

    <!-- Modal Success -->
    <TransitionRoot as="template" :show="showModalSuccess" aria-hidden="true">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto">
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
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                >
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Success
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Du hast dich erfolgreich vom Freifach abgemeldet
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot sm:text-sm"
                  @click="showModalSuccess = false"
                >
                  Akzeptieren
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="flex-row flex-wrap flex justify-center mt-8">
      <div v-if="faecher.length > 0" class="">
        <div>
          <div class="flex flex-row">
            <div class="flex flex-row justify-center flex-wrap w-full">
              <div
                v-for="(fach, i) of faecher"
                :key="i"
                class="bg-white shadow-xl border overflow-hidden rounded-lg mx-2 my-4 sm:w-4/12 w-full"
              >
                <div class="flex-shrink-0">
                  <img
                    crossorigin="anynomous"
                    class="h-48 w-full object-cover"
                    :src="fach.thumbnail"
                    alt=""
                  />
                </div>
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg font-bold leading-6 text-gray-900">{{ fach.titel }}</h3>
                </div>
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Titel</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ fach.titel }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 h-32">
                      <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ fach.beschreibung.slice(0, 180) + '...' }}
                      </dd>
                    </div>

                    <div>
                      <div class="flex justify-center mt-4 mb-3">
                        <button
                          @click="detail(fach)"
                          class="inline-flex justify-center mr-14 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black"
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
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-2xl font-bold my-6" v-else>
        Du hast dich für kein Freifach angemeldet !
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/solid';

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';

import { PiniaStore } from '../Store/Store.js';
import { EncryptStorage } from 'encrypt-storage';

const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let faecher = ref([]);
let fristAnmelden = ref(null);
let showModalWarning = ref(false);
let showModalSuccess = ref(false);

const router = useRouter();

const props = defineProps({ aktiverUser: {} });

const store = PiniaStore();

const { data } = await axios.get(`/getFaecherSchueler/${props.aktiverUser.s_id}`);
faecher.value = data;

VoraussetzungenVonDbNutzbarMachen();

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

function detail(fach) {
  try {
    localStorage.removeItem('AuswahlFreifach');
    localStorage.setItem('AuswahlFreifach', Encrypt.encryptString(JSON.stringify(fach)));
    router.push('/freifachDetail');
  } catch (error) {}
}

async function abmelden(fach) {
  //Frist aus dem Store holen
  fristAnmelden.value = store.getFristAnmelden.original;
  let aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  let erg = moment(fristAnmelden.value).isBefore(aktuellesDatum);

  if (erg) {
    showModalWarning.value = true;
  } else {
    const res = await axios.post(`/SchuelerInFreifachAbmelden`, {
      s_id: store.getAktivenUser.s_id,
      f_id: fach.f_id,
    });

    if (res.status === 200) {
      console.log('User erfolgreich aus Freifach abgemeldet!');

      faecher.value = faecher.value.filter((elem) => elem.f_id != fach.f_id);

      showModalSuccess.value = true;
    } else {
      console.log('Beim Abmelden aus dem Freifach ist ein Fehler aufgetreten!');
    }
  }
}
</script>
