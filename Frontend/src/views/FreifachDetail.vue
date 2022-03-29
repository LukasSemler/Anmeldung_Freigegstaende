<template>
  <div>
    <!--Feedback-An/Abmelden-Modal-->
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
                <!--Alles hat geklappt-->
                <div v-if="SchuelerBeitrittErfolg">
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
                        Du hast dich erfolgreich beim Freifach
                        {{ FreifachDatenObjekt.titel }} an-/abgemeldet!
                      </p>
                    </div>
                  </div>
                </div>

                <!--Fehler aufgetreten-->
                <div v-else>
                  <div
                    class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                  >
                    <XIcon class="h-6 w-6 text-red-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                      Fehler
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Ein Fehler beim bewerben ist aufgetreten!</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-htl_rot sm:text-sm"
                  @click="router.push('/')"
                >
                  Zurück zu Home
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!--Freifach-Detail-->
    <div class="h-full flex">
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        <article>
          <div>
            <div>
              <img
                async
                crossorigin="anonymous"
                class="h-60 w-full object-cover lg:h-60"
                :src="FreifachDatenObjekt.thumbnail"
                alt="Freifach-Thumbnail"
              />
            </div>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                  <img
                    class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-white"
                    async
                    :src="FreifachLehrerDaten.icon"
                    referrerpolicy="no-referrer"
                    alt="Lehrericon konnte nicht geladen werden"
                  />
                </div>
                <div
                  class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                >
                  <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                    <h1 class="text-2xl font-bold text-gray-900 truncate">
                      {{ FreifachDatenObjekt.titel }}
                    </h1>
                  </div>
                  <div
                    class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-htl_hellrot"
                      @click="EmailAnLehrerClicked"
                    >
                      <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Nachricht an Lehrer senden</span>
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <div class="bg-lime-200 hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                <h1 class="text-2xl font-bold text-gray-900 truncate">ajdlkajsdlkasjdlka</h1>
              </div>
            </div>
          </div>
          <br />
          <!-- Freiach Beschreibung -->
          <div class="mt-8 flex justify-center">
            <div class="w-1/2">
              <div class="mt-5 border-t border-gray-200">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">Professor*in:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ FreifachLehrerDaten.vorname }} {{ FreifachLehrerDaten.nachname }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">Beschreibung:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ FreifachDatenObjekt.beschreibung }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">Benötigte Wochenstunden</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ FreifachDatenObjekt.anzahl_stunden }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Maximale Anzahl von Schüler*innen
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ FreifachDatenObjekt.max_schueler }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Minimale Anzahl von Schüler*innen
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ FreifachDatenObjekt.min_schueler }}
                    </dd>
                  </div>

                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-0">
                    <dt class="text-sm font-medium text-gray-500">Jahrgänge</dt>
                    <div
                      class="mt-1 text-gray-900 font-bold"
                      v-for="(klasse, i) in FreifachDatenObjekt.voraussetzungen"
                      :key="i"
                    >
                      <p>{{ klasse }}</p>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!--Schüler-Interaktions-Buttons-->
          <div class="my-16 flex justify-center" v-if="FristErlaubtInteraktion">
            <div class="w-1/2">
              <!--Wenn der Schueler schon im Freifach begetreten ist-->
              <div
                v-if="SchuelerSchonBeigetreten"
                class="relative flex flex-col items-center group"
              >
                <button
                  data-tooltip-target="anmeldenErfolgTooltip"
                  data-tooltip-style="dark"
                  data-tooltip-placement="top"
                  @click="FreifachAbmelden"
                  class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-green-500 focus:ring-green-500"
                >
                  Vom Freifach abmelden
                </button>
                <div class="absolute bottom-5 flex-col items-center hidden mb-6 group-hover:flex">
                  <span
                    class="relative w-max z-10 p-2 leading-none text-white whitespace-no-wrap rounded bg-yellow-500 shadow-lg"
                  >
                    Du kannst dich abmelden, solange die Frist noch nicht um ist!
                  </span>
                  <div class="w-3 h-3 -mt-2 rotate-45 bg-yellow-500"></div>
                </div>
              </div>

              <div v-else>
                <!--Wenn Schüler erlaubt ist anzumelden-->
                <div
                  v-if="SchuelerBeitrittErlaubt"
                  class="relative flex flex-col items-center group"
                >
                  <button
                    data-tooltip-target="anmeldenErfolgTooltip"
                    data-tooltip-style="dark"
                    data-tooltip-placement="top"
                    @click="FreifachAnmelden"
                    class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-green-500 focus:ring-green-500"
                  >
                    Zum Freifach Anmelden
                  </button>
                  <div class="absolute bottom-5 flex-col items-center hidden mb-6 group-hover:flex">
                    <span
                      class="relative w-max z-10 p-2 leading-none text-black whitespace-no-wrap rounded bg-green-500 shadow-lg"
                    >
                      Du erfüllst alle Voraussetzungen, dich anzumelden!
                    </span>
                    <div class="w-3 h-3 -mt-2 rotate-45 bg-green-500"></div>
                  </div>
                </div>

                <!--Wenn Schüler erlaubt ist anzumelden-->
                <div v-else class="relative flex flex-col items-center group">
                  <button
                    data-tooltip-target="anmeldenFehlerTooltip"
                    data-tooltip-style="dark"
                    data-tooltip-placement="top"
                    class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400"
                  >
                    Zum Freifach Anmelden
                  </button>
                  <div class="absolute bottom-5 flex-col items-center hidden mb-6 group-hover:flex">
                    <span
                      class="relative w-max z-10 p-2 leading-none text-white whitespace-no-wrap rounded bg-red-600 shadow-lg"
                    >
                      Du erfüllst leider nicht alle benötigten Voraussetzungen!
                    </span>
                    <div class="w-3 h-3 -mt-2 rotate-45 bg-red-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Wenn die Anmeldefrist schon abgelaufen ist-->
          <div class="my-16 flex justify-center" v-else>
            <div class="w-1/2">
              <!--Wenn der Schueler schon im Freifach begetreten ist-->
              <div>
                <button
                  disabled
                  @click="FreifachAbmelden"
                  class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zinc-500"
                >
                  Leider ist die Anmeldefrist schon abgelaufen
                </button>
              </div>
            </div>
          </div>

          <br />
          <br />
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  MailIcon,
  BadgeCheckIcon,
  ShieldExclamationIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/vue/solid';
import axios from 'axios';
import Store from '../composables/Store';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

//Router für Weiterleitungen
const router = useRouter();

//Freifach welches man anschauen möchte
let FreifachDatenObjekt = reactive({});
//Lehrer der das Freifach leitet
let FreifachLehrerDaten = ref({});
//Variable ob Schüler erlaubt ist beizutreten
let SchuelerBeitrittErlaubt = ref(false);
//Wenn der Schüler aktuell schon im diesem Freifach ist
let SchuelerSchonBeigetreten = ref(false);

//InteraktionsVariable Entscheidet mit Frist ob An-/Abmelden überhaupt noch erlaubt ist
let FristErlaubtInteraktion = ref(true);

//ModalVariablen für Feedback An/Abmelden Modal
let showModal = ref(false);
let SchuelerBeitrittErfolg = ref(false);

onMounted(async () => {
  //Freifach wird aus dem LS geladen
  let ausgaehltesFreifach = JSON.parse(localStorage.getItem('AuswahlFreifach'));
  Object.assign(FreifachDatenObjekt, ausgaehltesFreifach);

  //Leitender Lehrer bekommen
  let { data: Lehrerdata, status } = await axios.get(
    `http://localhost:2410/getFreifaecherLehrer?freifachname=${ausgaehltesFreifach.titel}`,
  );

  if (status == 200) {
    //Lehrerdaten setzen
    FreifachLehrerDaten.value = Lehrerdata;
  } else {
    alert('Beim bekommen des Lehrers über ein Freifach ist ein Fehler aufgetreten');
  }

  //Schauen ob Schüler zum Freifach beitreten kann
  FreifachCheck();
});

//Überprüft ob der Schüler zum Freifach beitreten kann
async function FreifachCheck() {
  //Bekommt Aktuelle Klasse
  const klasse = Store.getters.getAktivenUser().klasse[0];
  const s_id = Store.getters.getAktivenUser().s_id;

  //Schaut ob Schülerklasse mit einer Voraussetzungsklasse übereinspricht
  FreifachDatenObjekt.voraussetzungen.forEach((voraussetzung) => {
    if (voraussetzung.includes(klasse)) {
      SchuelerBeitrittErlaubt.value = true;
    }
  });

  //Schaut ob der Schüler schon im Freifach ist
  const { data, status } = await axios.get(
    `http://localhost:2410/getSchuelerFaecher?id=${FreifachDatenObjekt.f_id}`,
  );
  if (status == 200) {
    data.forEach((el) => {
      if (el.s_id == s_id) {
        SchuelerSchonBeigetreten.value = true;
      }
    });
  }

  //Schaut ob Fristen überhaupt noch Interaktionen erlauben
  const { data: Fristdata } = await axios.get('http://localhost:2410/getFristen');

  //Schauen ob Anmeldefrist eh noch nicht überschritten wurde
  if (new Date(Fristdata[0].frist_anmelden) > new Date(Date.now())) {
    console.log('Ändern ist erlaubt');
    FristErlaubtInteraktion.value = true;
  } else {
    console.log('Ändern ist nicht erlaubt!');
    FristErlaubtInteraktion.value = false;
  }
}

//Schüler kann sich hier zum Freifach anmelden
async function FreifachAnmelden() {
  const { status } = await axios.post('http://localhost:2410/SchuelerInFreifachAnmelden', {
    s_id: Store.getters.getAktivenUser().s_id,
    f_id: FreifachDatenObjekt.f_id,
  });

  if (status == 200) {
    SchuelerBeitrittErfolg.value = true;
  } else {
    SchuelerBeitrittErfolg.value = false;
  }
  //Feedback-Modal anzeigen
  showModal.value = true;
}

async function FreifachAbmelden() {
  const { status } = await axios.post('http://localhost:2410/SchuelerInFreifachAbmelden', {
    s_id: Store.getters.getAktivenUser().s_id,
    f_id: FreifachDatenObjekt.f_id,
  });

  if (status == 200) {
    SchuelerBeitrittErfolg.value = true;
  } else {
    SchuelerBeitrittErfolg.value = false;
  }
  //Feedback-Modal anzeigen
  showModal.value = true;
}

//Wenn Klick auf Nachricht senden Button
function EmailAnLehrerClicked() {
  window.open(
    `mailto:${FreifachLehrerDaten.value.email}?subject=Freifach ${FreifachDatenObjekt.titel} Frage`,
  );
}
</script>
