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
    <h1 class="text-center text-4xl mt-3">
      Willkommen {{ aktiverUser.vorname }} {{ aktiverUser.nachname }}
    </h1>
    <br />
    <br />
    <div class="flex justify-center mt-5">
      <div class="flow-root w-2/3">
        <ul role="list" class="-mb-8">
          <li v-for="(event, eventIdx) of timeline" :key="eventIdx">
            <div class="relative pb-8">
              <span
                v-if="eventIdx !== timeline.length - 1"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    :class="[
                      event.iconbackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                    ]"
                  >
                    <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ event.content }}
                      <a
                        @click="changeSite(event)"
                        class="font-medium text-gray-900 cursor-pointer"
                        >{{ event.target }}</a
                      >
                    </p>
                  </div>
                  <div class="text-right text-sm whitespace-nowrap text-gray-500">
                    <time :datetime="event.datetime">{{ event.data }}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script setup>
//Imports
import { XIcon, CheckIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

import axios from 'axios';

//Store einbinden
import { PiniaStore } from '../Store/Store.js';

const store = PiniaStore();

const router = useRouter();

const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
let timeline = ref(null);
let fristEinreichen = ref(null);
let fristAnmelden = ref(null);
let fristenGesetzt = ref(false);

//Tabs für das Menü anzeigen
const tabs = [
  { name: 'Mein Account', link: '/Account', current: true },
  { name: 'Fristen setzen', link: '/setFrist', current: false },
  { name: 'Fächer überprüfen', link: '/adminCheckFaecher', current: false },
];

//Mounted
onMounted(async () => {
  //Werte der TimeLine holen und setzen
  const { data } = await axios.get(`/getAdminTimeLine`);
  timeline.value = data;

  //Icons der TimeLine setzen
  for (const iterator of timeline.value) {
    if (iterator.icon == 'XIcon') iterator.icon = XIcon;
    else iterator.icon = CheckIcon;
  }

  //! Alt
  //Fristen holen und zuweisen
  // if (Store.state.fristAnmelden && Store.state.fristEinreichen) {
  //   fristEinreichen.value = Store.state.fristEinreichen;
  //   fristAnmelden.value = Store.state.fristAnmelden;

  //   fristenGesetzt.value = true;
  // }

  //! Neu
  const fristAnmelden = store.getFristAnmelden;
  const fristEinreichen = store.getFristEinreichen;

  if (fristAnmelden && fristEinreichen) {
    fristEinreichen.value = fristEinreichen;
    fristAnmelden.value = fristAnmelden;

    fristenGesetzt.value = true;
  }
});

//aktiven User über Props bekommen
const props = defineProps({
  aktiverUser: {},
});

function changeSite(elem) {
  if (elem.target === 'setzen') router.push('/setFrist');
  if (elem.target === 'überprüfen und bestätigen') router.push('/adminCheckFaecher');
}
</script>
