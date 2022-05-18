<template>
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
  <!-- Success Modal -->
  <TransitionRoot as="template" :show="showModal">
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
                    Die Fristen zum Einreichen von den Freifächer und für die Anmeldung wurden
                    gesetzt
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot focus:outline-none focus:ring-htl_rot sm:text-sm"
                @click="router.push('/Account')"
              >
                Zurück zum Account
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Error Modal -->
  <TransitionRoot as="template" :show="showModalError">
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
                <XIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Error
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Die Fristen wurde bereits gesetzt und können nicht mehr geändert werden
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot focus:outline-none focus:ring-htl_rot sm:text-sm"
                @click="router.push('/Account')"
              >
                Zurück zum Account
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div>
    <h1 class="text-center text-4xl mt-3 font-bold">Fristen setzen</h1>
    <div class="flex flex-row justify-center mt-6">
      <div class="w-60" v-if="!datenVorhanden">
        <p>Frist Einreichen:</p>
        <Datepicker v-model="fristEinreichen"></Datepicker>
        <p class="mt-4">Frist Anmelden:</p>
        <Datepicker v-model="fristAnmelden"></Datepicker>

        <div class="flex justify-center">
          <button
            @click="setFristen"
            class="mt-4 mb-8 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Fristen setzen
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-3" v-if="datenVorhanden">
    <h1 class="text-center text-2xl font-bold mb-4">Endzeitpunkt fürs Einreichen</h1>
    <CountDown :endzeitpunkt="fristEinreichenFormated"></CountDown>
    <br />
    <h1 class="text-center text-2xl font-bold my-4">Endzeitpunkt fürs Anmelden</h1>
    <CountDown :endzeitpunkt="fristAnmeldenFormated"></CountDown>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CountDown from './CountDown.vue';

import { CheckIcon, XIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const tabs = [
  { name: 'Mein Account', link: '/Account', current: false },
  { name: 'Fristen setzen', link: '/setFrist', current: true },
  { name: 'Fächer überprüfen', link: '/adminCheckFaecher', current: false },
];

const router = useRouter();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let fristEinreichen = ref(null);
let fristAnmelden = ref(null);
let showModal = ref(false);
let datenVorhanden = ref(false);
let showModalError = ref(false);
let fristEinreichenFormated = ref(null);
let fristAnmeldenFormated = ref(null);

onMounted(async () => {
  const { data } = await axios.get(`/getFristen`);
  console.log(data);
  if (data.length > 0) {
    console.log('if');
    datenVorhanden.value = true;
    fristEinreichen.value = data[0].frist_einreichen;
    fristAnmelden.value = data[0].frist_anmelden;

    fristEinreichenFormated.value = formateDate(fristEinreichen.value);
    fristAnmeldenFormated.value = formateDate(fristAnmelden.value);

    console.log(fristEinreichenFormated.value);
  } else {
    console.log('else');
  }
});

function formateDate(date) {
  Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
  };

  let d = new Date(date);

  return (
    [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') +
    ' ' +
    [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':')
  );
}
async function setFristen() {
  //Schauen ob die Daten schon vorhanden sind
  if (!datenVorhanden.value) {
    let today = new Date();

    const obj = [
      {
        datum: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        icon: 'CheckIcon',
        iconbackground: 'bg-green-600',
      },
      {
        fristEinreichen: fristEinreichen.value,
        fristAnmelden: fristAnmelden.value,
      },
    ];

    const res = await axios.post(`/setFristenChangeTimeLine`, obj);

    if (res.status === 200) {
      showModal.value = true;
    } else {
      //TODO SHOW Error
    }

    function closeModal() {
      showModal.value = false;
      showModalError.value = false;
      router.push('/Account');
    }
  } else {
    showModalError.value = true;
  }
}
</script>
