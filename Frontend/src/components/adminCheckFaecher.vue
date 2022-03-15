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
  <h1 class="text-center text-4xl mt-2">Check Fächer</h1>
  <br />
  <br />
  <div class="flex flex-wrap justify-center">
    <div
      v-for="(item, i) of faecher"
      class="bg-white shadow-xl border overflow-hidden sm:rounded-lg w-500 mx-2 my-4"
    >
      <div class="px-4 py-5 sm:px-6 flex justify-center">
        <img
          class="h-48 w-96 object-scale-down"
          crossorigin="anonymous"
          async
          :src="item.thumbnail"
        />
      </div>
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ item.titel }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ item.lehrer }}</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Titel</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item.titel }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ item.beschreibung }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Min Schüler: {{ item.min_schueler }} | Max Schüler: {{ item.max_schueler }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Jahrgänge</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <nav class="space-y-1" aria-label="Sidebar">
                <a
                  v-for="fach in item.jahrgänge"
                  :key="fach"
                  :class="[
                    fach ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="fach ? 'page' : undefined"
                >
                  <span class="truncate">
                    {{ fach }}
                  </span>
                </a>
              </nav>
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Benötigte Stunden</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ item.anzahl_stunden }} Stunden
            </dd>
          </div>
          <div
            v-if="item.genehmigt == 'pending'"
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-center"
          >
            <button
              @click="annehmen(item)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Annehmen
            </button>
            <button
              @click="ablehnen(item)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Ablehnen
            </button>
            <button
              @click="change(item)"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Ändern
            </button>
          </div>

          <div class="flex justify-center mt-3" v-else-if="item.genehmigt == 'false'">
            <button
              disabled
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Wurde bereits abgelehnt
            </button>
          </div>

          <div class="flex justify-center mt-3 mb-3" v-else>
            <button
              disabled
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Wurde bereits genehmigt
            </button>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import router from '../router';
import axios from 'axios';

let faecher = ref([]);

const tabs = [
  { name: 'Mein Account', link: '/Account', current: false },
  { name: 'Fristen setzen', link: '/setFrist', current: false },
  { name: 'Check Faecher', link: '/adminCheckFaecher', current: true },
];

onMounted(async () => {
  getData();
});

async function annehmen(fach) {
  try {
    const res = await axios.patch(`http://localhost:2410/acceptFach/${fach.f_id}`, {
      genehmigt: true,
    });

    getData();
  } catch (error) {}
}

async function ablehnen(fach) {
  try {
    const res = await axios.patch(`http://localhost:2410/acceptFach/${fach.f_id}`, {
      genehmigt: false,
    });

    getData();
  } catch (error) {}
}

function change(fach) {
  try {
    localStorage.clearItem('changeFach');
  } catch {
    localStorage.setItem('changeFach', JSON.stringify(fach));
    router.push('/addFach');
  }
}

async function getData() {
  const { data } = await axios.get('http://localhost:2410/getFreifaecher');
  console.log(data);
  faecher.value = data;
}
</script>
