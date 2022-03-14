<template>
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
                    Die Fristen zum einreichen von den Freifaechern und zum Anmelden wurden gesetzt
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
                Zurück zu Account
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div>
    <h1 class="text-center text-4xl mt-3">Fristen setzen</h1>
    <div class="flex flex-col justify-center">
      <div class="w-2/3">
        <label for="einreichen">Frist fuer das Einreichen von Faechern</label>
        <input v-model="fristEinreichen" type="date" id="einreichen" name="einreichen" />
        <label for="einreichen">Frist fuer das Einreichen von Faechern</label>
        <input v-model="fristAnmelden" type="date" id="einreichen" name="einreichen" />
      </div>
    </div>
  </div>
  {{ fristEinreichen }}
  {{ fristAnmelden }}
  <button
    @click="setFristen"
    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
  >
    Fristen setzen
  </button>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
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
  { name: 'Check Faecher', link: '/adminCheckFaecher', current: false },
];

const router = useRouter();

let fristEinreichen = ref(null);
let fristAnmelden = ref(null);
let showModal = ref(false);

async function setFristen() {
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

  const res = await axios.post('http://localhost:2410/setFristenChangeTimeLine', obj);

  if (res.status === 200) {
    showModal.value = true;
  } else {
    //TODO SHOW Error
  }

  function closeModal() {
    showModal.value = false;
    router.push('/Account');
  }
}
</script>
