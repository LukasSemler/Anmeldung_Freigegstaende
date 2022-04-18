<template>
  <HomeHeader></HomeHeader>
  <br />
  <!-- Countdown mit Endzeitpunkt anmelden anzeigen -->
  <!-- <div v-if="Store.state.fristAnmelden">
    <CountDown :endzeitpunkt="Store.state.fristAnmelden.formatiert"></CountDown>
  </div> -->

  <div v-if="Store.state.fristAnmelden">
    <CountDown :endzeitpunkt="Store.state.fristAnmelden.formatiert"></CountDown>
  </div>

  <div v-if="Freifaecherliste.length > 0">
    <div class="bg-gray-50">
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed inset-0 flex z-40 sm:hidden" @close="open = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div
              class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto"
            >
              <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <Disclosure
                  as="div"
                  v-for="section in filters"
                  :key="section.name"
                  class="border-t border-gray-200 px-4 py-6"
                  v-slot="{ open }"
                >
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                      class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
                    >
                      <span class="font-medium text-gray-900">
                        {{ section.name }}
                      </span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon
                          :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`filter-mobile-${section.id}-${optionIdx}`"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          type="checkbox"
                          class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          :for="`filter-mobile-${section.id}-${optionIdx}`"
                          class="ml-3 text-sm text-gray-500"
                        >
                          {{ option.label }}
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </div>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>

      <div class="mt-10 max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" class="border-t border-gray-200 py-6">
          <div class="flex items-center justify-between">
            <Menu as="div" class="relative z-10 inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sortieren
                  <ChevronDownIcon
                    class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option" v-slot="{ active }">
                      <a
                        :href="option.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm font-medium text-gray-900',
                        ]"
                        @click="SortierenFunction(option.sortArg)"
                      >
                        {{ option.name }}
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              type="button"
              class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              @click="open = true"
            >
              Filtern
            </button>

            <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
              <Popover
                as="div"
                v-for="section in filters"
                :key="section.name"
                id="desktop-menu"
                class="relative z-10 inline-block text-left"
              >
                <div>
                  <PopoverButton
                    class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span>{{ section.name }}</span>
                    <span
                      v-if="AktivFilter.length != 0"
                      class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
                      >{{ AktivFilter.length }}</span
                    >
                    <ChevronDownIcon
                      class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </PopoverButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <PopoverPanel
                    class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <form class="space-y-4">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`filter-${section.id}-${optionIdx}`"
                          :name="`${section.id}[]`"
                          v-model="option.checked"
                          type="checkbox"
                          class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          @change="FilterChanged"
                        />
                        <label
                          :for="`filter-${section.id}-${optionIdx}`"
                          class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                        >
                          {{ option.label }}
                        </label>
                      </div>
                    </form>
                  </PopoverPanel>
                </transition>
              </Popover>
            </PopoverGroup>
          </div>
        </section>
      </div>
    </div>

    <!--Anzeigecontainer für alle Freifächer-->
    <div class="flex-row flex-wrap flex justify-center mt-8">
      <div class="flex flex-wrap justify-center">
        <div class="relative max-w-7xl mx-auto">
          <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div
              v-for="fach of FreifaecherGefiltert"
              :key="fach.f_id"
              class="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div class="flex-shrink-0 cursor-pointer">
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
                    <p
                      class="text-xl font-semibold text-gray-900 decoration-htl_hellrot hover:underline"
                    >
                      {{ fach.titel }}
                    </p>
                    <p class="mt-3 text-base text-gray-500 mb-2">
                      {{ fach.beschreibung }}
                    </p>
                    <br />
                  </a>
                </div>
              </div>
              <div class="bg-white px-4 py-5 flex justify-center">
                <button
                  @click="detail(fach)"
                  class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Detailansicht
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <h1 class="text-center font-black text-3xl mt-5">Es sind noch keine Freifächer vorhanden</h1>
    <br />
    <br />
    <div class="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-60 w-60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
  <br />
  <br />
</template>

<script setup>
//Tailwind
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/solid';
//Components einbinden
import CountDown from '../components/CountDown.vue';
import HomeHeader from '../components/HomeHeader.vue';
import FooterComp from '../components/FooterComp.vue';
import Store from '../composables/Store.js';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

let Freifaecherliste = ref([]);
let AktivFilter = ref([]);
const open = ref(false);
const router = useRouter();

//Sortieren
const sortOptions = [
  { name: `Name aufsteigend⬆`, sortArg: 'auf' },
  { name: `Name absteigend ⬇`, sortArg: 'ab' },
];

function SortierenFunction(SortArg) {
  if (SortArg == 'auf')
    Freifaecherliste.value.sort((a, b) => {
      if (a.titel > b.titel) return 1;
      else if (a.titel == b.titel) return 0;
      else return -1;
    });
  else if (SortArg == 'ab') {
    Freifaecherliste.value.sort((a, b) => {
      if (a.titel > b.titel) return -1;
      else if (a.titel == b.titel) return 0;
      else return 1;
    });
  }
}

//Filtern
const filters = [
  {
    id: 'Filter',
    name: 'Filter',
    options: [
      { value: 1, label: '1 Stunde', checked: false },
      { value: 2, label: '2 Stunden', checked: false },
    ],
  },
];

const FreifaecherGefiltert = computed(() => {
  if (AktivFilter.value.length > 0) {
    return Freifaecherliste.value.filter(({ anzahl_stunden }) =>
      AktivFilter.value.includes(anzahl_stunden),
    );
  } else {
    return Freifaecherliste.value;
  }
});

function FilterChanged() {
  //Resettet Filter
  AktivFilter.value = [];
  //Aktuallisiert die aktiven Filterungsmethoden
  filters[0].options.forEach(({ checked, value }) => {
    if (checked) AktivFilter.value.push(value);
  });
}

//Mounted
onMounted(async () => {
  try {
    localStorage.removeItem('AuswahlFreifach');
    localStorage.removeItem('detailAnsichtLehrer');
  } catch (error) {
    console.log('Nichts im LS gesetzt');
  }

  //Bekommen und anzeigen aller Freifächer
  const { data, status } = await axios.get('http://localhost:2410/getFreifaecher');
  if (status == 200) {
    //Zeigt nur Freifächer an die angenommen wurden
    Freifaecherliste.value = data.filter(({ genehmigt }) => genehmigt === 'true');

    //Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
    VoraussetzungenVonDbNutzbarMachen();
  } else {
    alert('Fehler beim Laden der Freigegenstände');
  }
});

//Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
function VoraussetzungenVonDbNutzbarMachen() {
  for (const fach of Freifaecherliste.value) {
    let vor = fach.voraussetzungen.slice(1, fach.voraussetzungen.length - 1).split(',');

    fach.voraussetzungen = [];

    for (const key of vor) {
      let abc = key.replaceAll('"', '');
      fach.voraussetzungen.push(abc);
    }
  }
}

function detail(freifachItem) {
  //Freifach im LocalStorage setzen
  localStorage.removeItem('AuswahlFreifach');
  localStorage.setItem('AuswahlFreifach', JSON.stringify(freifachItem));

  //Weiterleitung auf Detailseite
  router.push('/freifachDetail');
}
</script>
