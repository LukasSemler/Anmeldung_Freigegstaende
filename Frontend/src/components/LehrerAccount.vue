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
  <h1 class="text-center text-4xl mt-3">Willkommen {{ aktiverUser.name }}</h1>
  <br />
  <p class="text-center text-">
    Hier koennen Sie alle Ihre Freifaecher und derern Status anzeigen. Ausserdem koennen Sie neue
    hinzufuegen und bereits eingereicht aendern
  </p>
  <br />
  <br />
  <h3 class="ml-40 text-xl">Ihre Freifaecher:</h3>
  <br />
  <div v-if="showAddFach" class="text-center">
    <svg
      class="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">kein Freifach</h3>
    <p class="mt-1 text-sm text-gray-500">Sie haben noch kein Freifach, erstellen Sie eines</p>
    <div class="mt-6">
      <button
        @click="router.push('/addFach')"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-htl_rot hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Neues Freifach
      </button>
    </div>
  </div>
  <div v-else class="flex flex-wrap justify-center bg-lime-400">
    <div class="relative max-w-7xl mx-auto">
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <div
          v-for="fach of faecher"
          :key="fach.f_id"
          class="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <div class="flex-shrink-0">
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
                <p class="text-xl font-semibold text-gray-900">
                  {{ fach.titel }}
                </p>
                <p class="mt-3 text-base text-gray-500 mb-2">
                  {{ fach.beschreibung }}
                </p>
                <hr />
                <p class="mt-3 text-base text-gray-500">
                  Anzahl der Stunden: <span class="text-black">{{ fach.anzahl_stunden }}</span>
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Benoetigte Schueler: <span class="text-black">{{ fach.min_schueler }}</span>
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Maximale Schueler: <span class="text-black">{{ fach.max_schueler }}</span>
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Jahrgaenge:
                  <span class="text-black">{{ fach.voraussetzungen }}</span>
                </p>
                <br />
                <span
                  v-if="fach.genehmigt == 'false'"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-600 text-black"
                >
                  Abgelehnt
                </span>
                <span
                  v-else-if="fach.genehmigt == 'true'"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-600 text-black"
                >
                  Angenommen
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-600 text-black"
                >
                  Pending
                </span>
              </a>
            </div>
          </div>
          <!-- TODO Button -->
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
</template>

<script setup>
//Tailwind Imports
import { PlusIcon } from '@heroicons/vue/solid';

//Vue imports
import { ref, onMounted, reactive } from 'vue';

//sonstige imports
import axios from 'axios';

//Router impotieren
import { useRouter } from 'vue-router';
const router = useRouter();

let showAddFach = ref(false);
let faecher = ref([]);

const tabs = [
  { name: 'Mein Account', link: '/Account', current: true },
  { name: 'Fach erstellen', link: '/addFach', current: false },
];

onMounted(async () => {
  // Freifaecher vom Server holen
  const { data } = await axios.get(
    `http://localhost:2410/getFreifaecher?email=${props.aktiverUser.email}`,
  );

  console.log(data);
  //schauen ob Faecher vorhanden sind
  if (data.length == 0) showAddFach.value = true;
  else faecher.value = data;
});

const props = defineProps({
  aktiverUser: {},
});

function detail(fach) {
  localStorage.setItem('detailAnsichtLehrer', JSON.stringify(fach));
  router.push('/freifachDetailLehrer')
}
</script>
