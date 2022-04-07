<template>
  <div class="flex-row flex-wrap flex justify-center mt-8">
    <div v-if="faecher.length > 0" class="max-w-7xl mx-auto">
      <div>
        <div class="flex flex-row">
          <div class="flex flex-row justify-center flex-wrap">
            <div
              v-for="fach of faecher"
              class="bg-white shadow-xl border overflow-hidden sm:rounded-lg mx-2 my-4 w-4/12"
            >
              <div class="flex-shrink-0">
                <img
                  crossorigin="anynomous"
                  class="h-48 w-full object-cover"
                  :src="fach.thumbnail"
                  alt=""
                />
              </div>
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg font-bold leading-6 text-gray-900">{{ fach.titel }}</h3>
              </div>
              <div class="border-t border-gray-200">
                <dl>
                  <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Titel</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ fach.titel }}
                    </dd>
                  </div>
                  <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 h-32">
                    <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ fach.beschreibung }}
                    </dd>
                  </div>

                  <div>
                    <div class="flex justify-center mt-4 mb-3">
                      <button
                        @click="detail(fach)"
                        class="inline-flex justify-center mr-14 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-black"
                      >
                        Detail
                      </button>
                      <button
                        @click="abmelden(fach)"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 hover:text-black"
                      >
                        Abmelden
                      </button>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center text-2xl font-bold my-6" v-else>Du hast Dich nicht angemeldet</div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let faecher = ref([]);
let fristAnmelden = ref(null);
let showModalWarning = ref(false);
let showModalSuccess = ref(false);

const router = useRouter();

const props = defineProps({ aktiverUser: {} });

const { data } = await axios.get(
  `http://localhost:2410/getFaecherSchueler/${props.aktiverUser.s_id}`,
);
faecher.value = data;

VoraussetzungenVonDbNutzbarMachen();

//Macht aus eigenartigen String ein Array mit den Klassen als Voraussetzungen
function VoraussetzungenVonDbNutzbarMachen() {
  for (const fach of faecher.value) {
    let vor = fach.voraussetzungen.slice(1, fach.voraussetzungen.length - 1).split(',');
    fach.voraussetzungen = [];
    for (const key of vor) {
      let abc = key.replaceAll('"', '');
      fach.voraussetzungen.push(abc);
    }
  }
}

function detail(fach) {
  try {
    localStorage.removeItem('AuswahlFreifach');
    localStorage.setItem('AuswahlFreifach', JSON.stringify(fach));
    router.push('/freifachDetail');
  } catch (error) {}
}

async function abmelden(fach) {
  const fristAnmelden = store.getFristEinreichen;

  let erg;

  //Daten holen
  fristAnmelden.value = fristAnmelden;
  let aktuellesDatum = new Date();

  //Schauen ob das Datum vor oder nach der Frist ist
  erg = moment(fristAnmelden.value).isBefore(aktuellesDatum);

  if (erg) {
    showModalWarning.value = true;
  } else {
    const res = await axios.delete(`http://localhost:2410/schuelerAbmelden/${fach.f_id}`);
    if (res.status != 200) {
      //TODO Fehler Zeigen
    }

    faecher.value = faecher.value.filter((elem) => elem.f_id != fach.f_id);

    showModalSuccess.value = true;
  }
}
</script>
