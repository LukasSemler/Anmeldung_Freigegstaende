<template>
  <h1 class="text-center text-4xl font-bold mt-2">Neues Freifach erstellen</h1>
  <div class="flex justify-center mt-6">
    <div class="mx-6 w-2/3">
      <form class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200">
          <!-- Titel -->
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="titel" class="block text-sm font-medium text-gray-700"> Titel </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  v-model="titel"
                  placeholder="Typescript"
                  type="text"
                  name="titel"
                  id="titel"
                  class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <!-- Beschreibung -->
            <div class="sm:col-span-6">
              <label for="beschreibung" class="block text-sm font-medium text-gray-700">
                Beschreibung
              </label>
              <div class="mt-1">
                <textarea
                  v-model="beschreibung"
                  id="beschreibung"
                  name="beschreibung"
                  rows="5"
                  class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Schreiben Sie ein paar Infos ueber Ihr Freifach.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label for="thumbnail" class="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="thumbnail"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-htl_rot hover:text-htl_hellrot focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-htl_rot"
                    >
                      <span>Upload a file</span>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        class="sr-only"
                        @change="onFileChanged"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <!-- Anzahlen -->
            <div class="sm:col-span-6">
              <label for="titel" class="block text-sm font-medium text-gray-700">
                Minimale Anzahl / Maximale Anzahl von Schueler
              </label>
              <div class="flex flex-row">
                <!-- Minimale Anzahl -->
                <div class="mt-1 flex rounded-md shadow-sm mr-4">
                  <div class="inline-flex mr-2">
                    <!-- Minus Button -->
                    <button
                      @click="decreaseMin"
                      type="button"
                      class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <input
                      class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border-gray-300 rounded-md mx-2"
                      type="text"
                      v-model="numberMin"
                      name="Anzahl"
                    />
                    <!-- Plus Button -->
                    <button
                      @click="increaseMin"
                      type="button"
                      class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Maximale Anzahl -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <div class="inline-flex">
                    <!-- Minus Button -->
                    <button
                      @click="decreaseMax"
                      type="button"
                      class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <input
                      class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border-gray-300 rounded-md mx-2"
                      type="text"
                      v-model="numberMax"
                      name="Anzahl"
                    />
                    <!-- Plus Button -->
                    <button
                      @click="increaseMax"
                      type="button"
                      class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:col-span-1">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="block text-sm font-medium text-gray-700">
                  Benoetigte Stunden
                </ListboxLabel>
                <div class="mt-1 relative">
                  <ListboxButton
                    class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <span class="block truncate">{{ selected }}</span>
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                      <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        as="template"
                        v-for="(h, i) in stunden"
                        :key="i"
                        :value="h"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          ]"
                        >
                          <span
                            :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                          >
                            {{ h }}
                          </span>

                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ]"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
//Tailwind Imports
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import axios from 'axios';

let titel = ref('');
let beschreibung = ref('');
let thumbnail = ref(null);
let numberMin = ref(0);
let numberMax = ref(0);
let selected = ref(0);
let selectedFile = ref(null);

//Variablen:
const stunden = [1, 2];

//Objekt welches zu der DB geschickt wird
const fachObj = {
  titel,
  beschreibung,
  numberMin,
  numberMax,
  selected,
};

//Image hochladen
function onFileChanged(event) {
  selectedFile.value = event.target.files[0];
  console.log(selectedFile.value);
}

//Daten + Bild an Backend schicken
async function sendFach() {
  let formData = new FormData();
  formData.append('image', selectedFile.value);
  formData.append('daten', fachObj);

  axios.post('', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//#region Increase and Decrease
//Min
function increaseMin() {
  numberMin.value += 1;
}
function decreaseMin() {
  if (numberMin.value != 0) numberMin.value -= 1;
}

//Max
function increaseMax() {
  numberMax.value += 1;
}
function decreaseMax() {
  if (numberMax.value != 0) numberMax.value -= 1;
}
//#endregion
</script>
