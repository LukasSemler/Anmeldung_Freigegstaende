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
        <div class="flex justify-center">
          <img class="w-10" src="@/assets/Loading.svg" alt="" />
        </div>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import CardCompSchueler from './CardCompSchueler.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

//Tabs für das Menü anzeigen
const tabs = [
  { name: 'Mein Account', link: '/Account', current: true },
  { name: 'Anmeldung Drucken', link: '/printAnmeldung', current: false },
];

function test() {
  console.log('CLICKED');
}

const props = defineProps({ aktiverUser: {} });
</script>
