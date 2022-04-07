<template>
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
                    Die Frist zum Anmelden für Freifächer ist abgelaufen, daher ist ein Zurückziehen
                    der Anmeldung nicht mehr möglich!
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

  <h1 class="text-center text-4xl mt-3">
    Willkommen {{ aktiverUser.vorname }} {{ aktiverUser.nachname }}
  </h1>

  <Suspense>
    <template #default>
      <CardCompSchueler :aktiverUser="props.aktiverUser"></CardCompSchueler>
    </template>
    <template #fallback>
      <div class="text-center text-xl font-bold mt-3">
        <p>Loading...</p>
        <div class="flex justify-center"><img class="w-10" src="@/assets/Loading.svg" alt="" /></div>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import CardCompSchueler from './CardCompSchueler.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CheckIcon } from '@heroicons/vue/solid';

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

let faecher = ref([]);
// let fristAnmelden = ref(null);
let showModalWarning = ref(false);
let showModalSuccess = ref(false);

const props = defineProps({ aktiverUser: {} });
</script>
