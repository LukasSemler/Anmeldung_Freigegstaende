<template>
  <div>
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
    <h1 class="text-center text-4xl font-bold mt-3">{{ Überschrift }}</h1>

    <!--Erfolgreich erstellt Modal-->
    <TransitionRoot as="template" :show="showModal" aria-hidden="true">
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
                      {{ textModal }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot sm:text-sm"
                  @click="ZurHomeModalClick"
                >
                  Zurück zum Account
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!--Modal delete -->
    <TransitionRoot as="template" :show="showModalErr">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="showModalErr = false">
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
                    Error
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Es ist ein Fehler aufgetreten, möglicherweiße gibt es schon ein Freifach mit
                      diesem Namen
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="showModalErr = false"
                >
                  Verstanden
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="flex justify-center mt-6">
      <div class="mx-6 w-2/3">
        <form class="space-y-8 divide-y divide-gray-300">
          <div class="space-y-8 divide-y divide-gray-300">
            <!-- Titel -->
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-6">
                <label for="titel" class="block text-sm font-medium text-gray-700"> Titel </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    v-model="stateVariablen.titel"
                    placeholder="Typescript"
                    type="text"
                    name="titel"
                    id="titel"
                    class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p v-if="v$.titel.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                  {{ v$.titel.$silentErrors[0].$message }}
                </p>
              </div>
              <!-- Beschreibung -->
              <div class="sm:col-span-6">
                <label for="beschreibung" class="block text-sm font-medium text-gray-700">
                  Beschreibung
                </label>
                <div class="mt-1">
                  <textarea
                    v-model="stateVariablen.beschreibung"
                    id="beschreibung"
                    name="beschreibung"
                    rows="5"
                    class="shadow-sm focus:ring-htl_rot focus:border-htl_rot block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <p
                  v-if="v$.beschreibung.$invalid"
                  class="mt-2 text-sm text-red-600"
                  id="email-error"
                >
                  {{ v$.beschreibung.$silentErrors[0].$message }}
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  Schreiben Sie ein paar Informationen über Ihr Freifach
                </p>
              </div>
              <!-- ---------------------------------------------------------------------------------------------------------------- -->

              <!-- Thumbnail -->
              <div class="sm:col-span-6">
                <label for="thumbnail" class="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div v-if="!image" class="space-y-1 text-center">
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
                        <span class="text-center">Upload a file</span>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          class="sr-only"
                          @change="onFileChanged"
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, JPEG</p>
                  </div>
                  <div v-else>
                    <div class="flex justify-center">
                      <img
                        crossorigin="anonymous"
                        class="object-scale-down h-48 w-96 mt-3"
                        :src="image"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div v-if="image" class="flex justify-center">
                  <button
                    @click="image = null"
                    type="button"
                    class="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot"
                  >
                    <TrashIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Bild entfernen
                  </button>
                </div>
                <p v-if="!image" class="mt-2 text-sm text-red-600" id="email-error">
                  Value is required
                </p>
              </div>
              <!-- ---------------------------------------------------------------------------------------------------------------- -->
              <!-- Anzahlen -->
              <div class="sm:col-span-6 mt-5">
                <label for="titel" class="block text-sm font-medium text-gray-700">
                  minimale Anzahl / maximale Anzahl von Schüler*innen
                </label>
                <div class="flex flex-row mt-1">
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
                        type="number"
                        v-model="stateVariablen.numberMin"
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
                        type="number"
                        v-model="stateVariablen.numberMax"
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
                <p v-if="v$.numberMin.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                  <span class="text-black">Min Anzahl: </span
                  >{{ v$.numberMin.$silentErrors[0].$message }}
                </p>
                <p v-if="v$.numberMax.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                  <span class="text-black">Max Anzahl: </span
                  >{{ v$.numberMax.$silentErrors[0].$message }}
                </p>
              </div>
              <!-- ---------------------------------------------------------------------------------------------------------------- -->
              <div class="sm:col-span-1 mt-5">
                <Listbox as="div" v-model="stateVariablen.selected">
                  <ListboxLabel class="block text-sm font-medium text-gray-700">
                    Benötigte Wochenstunden
                  </ListboxLabel>
                  <div class="mt-1 relative">
                    <ListboxButton
                      class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-htl_rot focus:border-htl_hellrot sm:text-sm"
                    >
                      <span class="block truncate">{{ stateVariablen.selected }}</span>
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
                              active ? 'text-white bg-htl_rot' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-3 pr-9',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              ]"
                            >
                              {{ h }}
                            </span>

                            <span
                              v-if="selected"
                              :class="[
                                active ? 'text-white' : 'text-htl_rot',
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
                <p v-if="v$.selected.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                  {{ v$.selected.$silentErrors[0].$message }}
                </p>
              </div>
              <!-- ---------------------------------------------------------------------------------------------------------------- -->
              <!-- Platzhalter div -->
              <div class="sm:col-span-5"></div>
              <!-- ---------------------------------------------------------------------------------------------------------------- -->
              <!-- Vorausetzungen -->
              <div class="sm:col-span-3 mt-5">
                <fieldset>
                  <legend class="text-lg font-medium text-gray-900">
                    Welche Jahrgänge dürfen teilnehmen?
                  </legend>
                  <div class="mt-4 border-t border-b border-gray-300 divide-y divide-gray-200">
                    <div
                      v-for="klasse in klassen"
                      :key="klasse"
                      class="relative flex items-start py-4"
                    >
                      <div class="min-w-0 flex-1 text-sm">
                        <label
                          :for="`person-${klasse}`"
                          class="font-medium text-gray-700 select-none"
                          >{{ klasse }}</label
                        >
                      </div>
                      <div class="ml-3 flex items-center h-5">
                        <input
                          v-model="stateVariablen.voraussetzungen"
                          :id="`${klasse}`"
                          :name="`${klasse}`"
                          :value="`${klasse}`"
                          type="checkbox"
                          class="focus:ring-htl_rot h-4 w-4 text-htl_rot border-gray-300 rounded bg-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <p
                  v-if="v$.voraussetzungen.$invalid"
                  class="mt-2 text-sm text-red-600"
                  id="email-error"
                >
                  {{ v$.voraussetzungen.$silentErrors[0].$message }}
                </p>
              </div>
              <!-- Platzhalter div -->
              <div class="sm:col-span-5"></div>
              <!-- Gewichtung -->
              <div v-if="admin" class="sm:col-span-3 mt-5">
                <Listbox as="div" v-model="stateVariablen.selectedGewichtung">
                  <ListboxLabel class="block text-sm font-medium text-gray-700">
                    Gewichtung
                  </ListboxLabel>
                  <div class="mt-1 relative">
                    <ListboxButton
                      class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-htl_rot focus:border-htl_hellrot sm:text-sm"
                    >
                      <span class="block truncate">{{ stateVariablen.selectedGewichtung }}</span>
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
                          v-for="(h, i) in gewichtung"
                          :key="i"
                          :value="h"
                          v-slot="{ active, selectedGewichtung }"
                        >
                          <li
                            :class="[
                              active ? 'text-white bg-htl_rot' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-3 pr-9',
                            ]"
                          >
                            <span
                              :class="[
                                stateVariablen.selectedGewichtung ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              ]"
                            >
                              {{ h }}
                            </span>

                            <span
                              v-if="stateVariablen.selectedGewichtung"
                              :class="[
                                active ? 'text-white' : 'text-htl_rot',
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

            <div class="pt-5">
              <div class="flex justify-center">
                <button
                  @click="fachErstellen"
                  :class="
                    !checkError
                      ? 'ml-3 inline-flex justify-center py-2 px-9 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2'
                      : 'disabled ml-3 inline-flex justify-center py-2 px-9 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
                  "
                  :disabled="checkError"
                >
                  {{ nameButton }}
                </button>

                <button
                  v-if="state == 'change'"
                  @click="abbrechen"
                  class="ml-3 inline-flex justify-center py-2 px-9 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
//Router impotieren
import { useRouter } from 'vue-router';

//Tailwind Imports
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import { TrashIcon, ExclamationIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

//Ref und Axios impotieren
import { ref, onMounted, reactive, computed } from 'vue';
import axios from 'axios';

//Store einbinden
import { PiniaStore } from '../Store/Store.js';

// Vuelidate
import useValidate from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//#region Vulidate
let stateVariablen = reactive({
  titel: '',
  beschreibung: '',
  numberMin: 1,
  numberMax: 2,
  selected: 1,
  image: null,
  imageSchicken: null,
  voraussetzungen: [],
  selectedGewichtung: null,
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    titel: { required },
    beschreibung: { required },
    numberMin: { required, numeric, minValue: minValue(1) },
    numberMax: { required, numeric, minValue: minValue(stateVariablen.numberMin + 1) },
    selected: { required, minValue: minValue(1) },
    voraussetzungen: { required },
  };
});

const v$ = useValidate(rules, stateVariablen);

//#endregion

const store = PiniaStore();

//router erstellen
const router = useRouter();

//Variablen
const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let titel = ref('');
let beschreibung = ref('');
let numberMin = ref(0);
let numberMax = ref(0);
let selected = ref(0);
let selectedGewichtung = ref(1);
let image = ref(null);
let imageSchicken = ref(null);
let voraussetzungen = ref([]);

let showModal = ref(false);
let showModalErr = ref(false);
let state = ref('add');
let id = ref(null);
let textModal = ref('Das Freifach wurde erfolgreich beim Abteilungvorstand eingereicht');

let datentyp = ref(null);

//Variablen:
const stunden = [1, 2];
const gewichtung = [0, 1];
let nameButton = ref('Erstellen');
let Überschrift = ref('Neues Freifach erstellen');
const klassen = ['1. Klasse', '2. Klasse', '3. Klasse', '4. Klasse', '5. Klasse'];
const tabs = [
  { name: 'Mein Account', link: '/Account', current: false },
  { name: 'Fach erstellen', link: '/addFach', current: true },
];

let admin = ref(null);
//Schaut ob das Freifach neu erstellt oder Verändert wird.
onMounted(() => {
  if (localStorage.getItem('changeFach')) {
    try {
      let fach = JSON.parse(Encrypt.decryptString(localStorage.getItem('changeFach')));
      console.log(fach);
      if (fach.admin) {
        admin.value = true;
      }
      //Werte setzen
      id.value = fach.f_id;
      stateVariablen.titel = fach.titel;
      stateVariablen.beschreibung = fach.beschreibung;
      image.value = fach.thumbnail;
      stateVariablen.numberMin = fach.min_schueler;
      stateVariablen.numberMax = fach.max_schueler;
      stateVariablen.selected = fach.anzahl_stunden;
      stateVariablen.voraussetzungen = fach.voraussetzungen;
      selectedGewichtung.value = fach.gewichtung;

      nameButton.value = 'ändern';
      Überschrift.value = 'Freifach ändern';

      state.value = 'change';
    } catch {
      console.log(
        'Beim laden des vorhandenen Freifaches ist ein Fehler aufgetreten! (onMounted --> addFach.vue Component)',
      );
    }
  } else {
    console.log('Fach neu erstellen');
  }
});

//Bild hochladen
function onFileChanged(event) {
  {
    // Reference to the DOM input element
    let input = event.target;
    stateVariablen.imageSchicken = event.target.files[0];

    const name = stateVariablen.imageSchicken.name;

    if (name.includes('.jpg')) {
      stateVariablen.imageSchicken.datentyp = 'jpg';
    } else if (name.includes('.png')) {
      stateVariablen.imageSchicken.datentyp = 'png';
    } else if (name.includes('.jpeg')) {
      stateVariablen.imageSchicken.datentyp = 'jpeg';
    } else {
      console.log('IMAGE-DATENTYP NICHT ZULÄSSIG');
    }

    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
      // create a new FileReader to read this image and convert to base64 format
      let reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        image.value = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);
    }
  }
}

//Daten + Bild an Backend schicken
async function sendImage() {
  try {
    //FormData bauen
    let formData = new FormData();
    formData.append('image', stateVariablen.imageSchicken);
    formData.append('titel', stateVariablen.titel);
    formData.append('datentyp', stateVariablen.imageSchicken.datentyp);

    //an server schicken
    await axios.post(`/fachThumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}

//Sendet eingegebenen Daten an den Server, der diese dann in der DB speichert
async function sendData() {
  try {
    const fachObj = {
      titel: stateVariablen.titel,
      beschreibung: stateVariablen.beschreibung,
      numberMin: stateVariablen.numberMin,
      numberMax: stateVariablen.numberMax,
      selected: stateVariablen.selected,
      voraussetzungen: stateVariablen.voraussetzungen,
      linkThumbnail: `/images/${stateVariablen.titel}.${stateVariablen.imageSchicken.datentyp}`,
      lehrer: store.getAktivenUser,
    };

    let { status } = await axios.post('/fachErstellen', fachObj);
    if (status == 210) {
      throw 'Fehler beim Fach erstellen, auf der Datenbankseite';
    }

    return true;
  } catch (error) {
    console.log('____________________>');
    showModalErr.value = true;

    return false;
  }
}

async function changeData() {
  // leeres Fach Objekt erstellen
  let fachObj;

  // Schauen ob ein Bild hochgeladen wurde
  if (stateVariablen.imageSchicken.value == null) {
    fachObj = {
      id: id.value,
      titel: stateVariablen.titel,
      beschreibung: stateVariablen.beschreibung,
      numberMin: stateVariablen.numberMin,
      numberMax: stateVariablen.numberMax,
      selected: stateVariablen.selected,
      voraussetzungen: stateVariablen.voraussetzungen,
      gewichtung: selectedGewichtung.value,
      linkThumbnail: `/images/${stateVariablen.titel}.${datentyp.value}`,
    };
    //Bild schicken
    await sendImage();
  } else {
    fachObj = {
      id: id.value,
      titel: stateVariablen.titel,
      beschreibung: stateVariablen.beschreibung,
      numberMin: stateVariablen.numberMin,
      numberMax: stateVariablen.numberMax,
      selected: stateVariablen.selected,
      voraussetzungen: stateVariablen.voraussetzungen,
      gewichtung: selectedGewichtung.value,
    };
  }

  console.log(fachObj);
  const res = await axios.patch(`/changeFach/${fachObj.id}`, fachObj);

  //schauen ob der status 200 ist
  if (res.status == 200) {
    //Success Modal anzeigen
    showModal.value = true;
    //text beim Modal changen
    textModal.value = 'Das Freifach wurde erfolgreich geändert';
  } else {
    throw 'Fehler beim ändern des Freifaches, auf der Datenbankseite';
  }
}

//Funktion wenn man auf Erstellen klickt, diese wählt ob gechanched oder neu erstellt wird
async function fachErstellen(e) {
  e.preventDefault();
  //Facherstellen-Operation starten wenn Frist es erlaubt
  if (state.value == 'add') {
    try {
      v$.value.$validate();

      if (!v$.value.$error) {
        if (image.value) {
          //Freifachdaten dem Server für Eintrag schicken schicken
          const ergData = await sendData();
          let ergImage;

          if (ergData) {
            //Dem Server das ImageSchicken, damit dieser es im Public speichern kann
            ergImage = await sendImage();
          }

          if (ergImage && ergData) showModal.value = true;
          else showModalErr.value = true;
        } else console.log('Bild fehlt');
      } else {
        console.log('Fehler');
      }

      e.preventDefault();
    } catch (error) {
      showModal.value = true;
      e.preventDefault();
    } finally {
      e.preventDefault();
    }
  } else {
    changeData();
    e.preventDefault();

    //Änderungs Freifach nach Änderung wieder aus LS löschen
    localStorage.removeItem('changeFach');
  }
}

//Funktion um den LS zu clearen und back to Account routen
function abbrechen() {
  //Änderungs Freifach nach Änderung wieder aus LS löschen
  localStorage.removeItem('changeFach');
  //Zurück zur Übersicht
  router.push('/Account');
}

function ZurHomeModalClick() {
  //Löscht alle Inputfelder
  ClearAllInputs();

  //Zur Homeseite weiterleiten
  router.push('/account');
}

function ClearAllInputs() {
  titel.value = '';
  beschreibung.value = '';
  numberMin.value = 0;
  numberMax.value = 0;
  selected.value = 0;
  image.value = null;
  imageSchicken.value = null;
  voraussetzungen.value = [];
  showModal.value = false;
  state.value = 'add';
  id.value = null;
}

//Min
function increaseMin() {
  stateVariablen.numberMin += 1;
}
function decreaseMin() {
  if (stateVariablen.numberMin != 0) stateVariablen.numberMin -= 1;
}

//Max
function increaseMax() {
  stateVariablen.numberMax += 1;
}
function decreaseMax() {
  if (stateVariablen.numberMax != 0) stateVariablen.numberMax -= 1;
}

const checkError = computed(() => {
  if (v$.value.$invalid == true) {
    return true;
  } else {
    if (image.value) return false;
    return true;
  }
});
</script>

>
