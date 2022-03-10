<template>
  <h1 class="text-center text-4xl">Check Fächer</h1>
  <br />
  <br />
  <div class="flex justify-center">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg w-2/3">
      <div class="px-4 py-5 sm:px-6 flex justify-center">
        <img
          class="h-48 w-96 object-scale-down"
          crossorigin="anonymous"
          src="http://localhost:2410/images/asdasd.png"
        />
      </div>
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">TypeScript</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Von Robert Baumgartner</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Titel</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">TypeScript</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
              consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
              nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Jahrgänge</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <nav class="space-y-1" aria-label="Sidebar">
                <a
                  v-for="item in voraussetzungen"
                  :key="item"
                  :class="[
                    item ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="item ? 'page' : undefined"
                >
                  <span class="truncate">
                    {{ item }}
                  </span>
                </a>
              </nav>
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Benötigte Stunden</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">2. Stunden</dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-center"
          >
            <button
              @click="anmelden"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Annehmen
            </button>
            <button
              @click="anmelden"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Ablehnen
            </button>
            <button
              @click="anmelden"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Ändern
            </button>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const voraussetzungen = ['4. Klasse', '5. Klasse'];
</script>
