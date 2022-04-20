<template>
  <div>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src *;
   img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
   style-src  'self' 'unsafe-inline' *"
    />
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
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
                <div class="mx-auto flex items-center justify-center h-12 w-12">
                  <div class="text-lime-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Herzlichen Glückwunsch !
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Du hast soeben ein Easter Egg gefunden !</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  :class="`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${color} text-base font-medium text-white hover:bg-htl_hellrot sm:text-sm`"
                  @click="changeSite"
                >
                  Zum Easter-Egg
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="relative">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://www.htlwienwest.at/img/hero_hq.jpg"
          alt="TitelBild"
          img-src="self"
        />
        <div class="absolute inset- mix-blend-multiply" aria-hidden="true" />
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div class="rounded-md w-2/3 bg-opacity-50 bg-gray-300">
          <h1
            @click="easterEgg"
            class="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl p-2 cursor-pointer"
          >
            Anmeldung Freifächer
          </h1>
        </div>

        <div class="rounded-md w-2/3 bg-opacity-50 bg-gray-300">
          <p class="mt-6 text-xl text-black max-w-3xl p-2 opacity-100 z-50 font-bold">
            Hier kannst du Dich als Schüler für die Freifächer Deiner Wahl anmelden, oder als Lehrer
            ein Freifach erstellen und verwalten.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/outline';

const router = useRouter();

let counter = ref(0);
let open = ref(false);
let color = ref('bg-lime-600');
let interval = ref(null);

function easterEgg() {
  //Schauen ob der button in 10 sekunden 5 mal geklickt wurde
  counter.value++;
  setTimeout(() => {
    counter.value = 0;
  }, 10000);

  if (counter.value === 5) {
    open.value = true;
    randomColor();
    counter.value = 0;
  }
}

function changeSite() {
  router.push('/EasterEgg');
  clearInterval(interval.value);
}

function randomColor() {
  //array with random colors
  let colors = [
    'bg-red-600',
    'bg-orange-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-lime-600',
    'bg-teal-600',
    'bg-gray-600',
    'bg-gray-800',
    'bg-gray-900',
  ];
  //set every 3 seconds a new color
  interval.value = setInterval(() => {
    color.value = colors[Math.floor(Math.random() * colors.length)];
  }, 1000);
}
</script>
