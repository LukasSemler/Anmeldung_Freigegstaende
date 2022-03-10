<template>
  <div>
    <h1 class="text-center text-4xl">Willkommen {{ aktiverUser.name }}</h1>
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
  </div>
</template>

<script setup>
//Imports
import { XIcon, CheckIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import state from '../composables/Store.js';
import axios from 'axios';

const router = useRouter();

let timeline = ref(null);
let fristEinreichen = ref(null);
let fristAnmelden = ref(null);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:2410/getAdminTimeLine');
  timeline.value = data;

  for (const iterator of timeline.value) {
    if (iterator.icon == 'XIcon') iterator.icon = XIcon;
    else iterator.icon = CheckIcon;
  }

  if (state.fristAnmelden && state.fristEinreichen) {
    fristEinreichen.value = state.fristEinreichen;
    fristAnmelden.value = state.fristAnmelden;
  }
});

const props = defineProps({
  aktiverUser: {},
});

function changeSite(elem) {
  if (elem.target === 'setzen') router.push('/setFrist');
  if (elem.target === 'überprüfen und bestätigen') router.push('/adminCheckFaecher');
}
</script>
