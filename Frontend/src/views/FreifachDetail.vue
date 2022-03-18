<template>
  <div class="h-full flex">
    <!-- Static sidebar for desktop -->
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          <article>
            <!-- lehrerProfil header -->
            <div>
              <div>
                <img
                  class="h-32 w-full object-cover lg:h-48"
                  :src="lehrerProfil.coverImageUrl"
                  alt=""
                />
              </div>
              <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div class="flex">
                    <img
                      class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      :src="lehrerProfil.imageUrl"
                      alt=""
                    />
                  </div>
                  <div
                    class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                  >
                    <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                      <h1 class="text-2xl font-bold text-gray-900 truncate">
                        {{ lehrerProfil.name }}
                      </h1>
                    </div>
                    <div
                      class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <button
                        type="button"
                        class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-htl_hellrot"
                      >
                        <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Nachricht senden</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                  <h1 class="text-2xl font-bold text-gray-900 truncate">
                    {{ lehrerProfil.name }}
                  </h1>
                </div>
              </div>
            </div>

            <!-- Description list -->
            <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div
                  v-for="field in Object.keys(lehrerProfil.fields)"
                  :key="field"
                  class="sm:col-span-1"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    {{ field }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ lehrerProfil.fields[field] }}
                  </dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">About</dt>
                  <dd
                    class="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                    v-html="lehrerProfil.about"
                  />
                </div>
              </dl>
            </div>

            <!-- Team member list -->
            <div class="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 class="text-sm font-medium text-gray-500">Team members</h2>
              <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  v-for="person in team"
                  :key="person.handle"
                  class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                >
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <a href="#" class="focus:outline-none">
                      <span class="absolute inset-0" aria-hidden="true" />
                      <p class="text-sm font-medium text-gray-900">
                        {{ person.name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ person.role }}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MailIcon } from '@heroicons/vue/solid';
import { onMounted, reactive, ref } from 'vue';
let ausgewaehltesFreifach = reactive({});

//Lehrer der das Freifach leitet
const lehrerProfil = {
  name: 'Ricardo Cooper',
  imageUrl:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990',
  },
};

//Schüler die im Freifach inkludiert sind
const team = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

onMounted(() => {
  //Freifach wird aus dem LS geladen
  let ausgaehltesFreifach = JSON.parse(localStorage.getItem('AuswahlFreifach'));
  Object.assign(ausgewaehltesFreifach, ausgaehltesFreifach);
});
</script>
