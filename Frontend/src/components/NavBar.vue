<template>
  <div class="shadow">
    <!--Navbar-->
    <Disclosure as="nav" class="bg-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer"
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                @click="router.push('/')"
                class="block lg:hidden h-8 w-auto"
                src="/HTLWienWestLogo.png"
                alt="HTL Logo"
              />
              <img
                @click="router.push('/')"
                class="hidden lg:block h-8 w-auto"
                src="/HTLWienWestLogo.png"
                alt="HTL Logo"
              />
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- Schaue ob der User angemeldet ist oder nicht -->
            <!-- Profile dropdown -->
            <Menu v-if="store.getAktivenUser" as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                    <img
                      async
                      :src="store.getAktivenUser.icon"
                      referrerpolicy="no-referrer"
                      alt="Icon"
                    />
                  </span>
                </MenuButton>
              </div>
              <transition
                class="z-40"
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="router.push('/Account')"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Dein Account</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/"
                      @click="abmelden"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Abmelden</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>

            <!--Webuntis-Passwort -->
            <TransitionRoot as="template" :show="WebuntisPasswordFieldShow">
              <Dialog
                as="div"
                class="fixed z-10 inset-0 overflow-y-auto"
                @close="WebuntisPasswordFieldShow = false"
              >
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
                    <DialogOverlay
                      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                  </TransitionChild>

                  <!-- This element is to trick the browser into centering the modal contents. -->
                  <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
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
                      class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    >
                      <div>
                        <div class="mt-2 text-center sm:mt-5">
                          <DialogTitle as="h1" class="text-lg leading-6 font-bold text-gray-900">
                            Webuntis Password
                          </DialogTitle>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                              Fuer die volle Funktionalitaet dieser Webseite zu gewaehleisten, muss
                              ein Webuntis-Passwort eingegeben werden.
                            </p>

                            <div>
                              <label
                                for="webuntisPassword"
                                class="block text-sm font-bold text-gray-700 mt-3"
                                >Webuntis Passwort</label
                              >
                              <div class="mt-1">
                                <input
                                  type="password"
                                  name="webuntisPassword"
                                  v-model="WebuntisPasswordFieldInput"
                                  class="shadow-sm focus:ring-htl_rot focus:border-htl_hellrot block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div class="mt-1">
                                <a
                                  href="https://melpomene.webuntis.com/WebUntis/?school=htlwienwest#/basic/resetPassword"
                                  class="flex justify-self-self text-htl_hellrot hover:text-htl_rot underline text-sm"
                                >
                                  Passwort vergessen?
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                      >
                        <button
                          type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-htl_rot text-base font-medium text-white hover:bg-htl_hellrot sm:col-start-2 sm:text-sm"
                          @click="anmeldenMitUntisdaten"
                        >
                          Senden
                        </button>
                        <button
                          type="button"
                          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
                          @click="WebuntisPasswordFieldShow = false"
                          ref="cancelButtonRef"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </TransitionChild>
                </div>
              </Dialog>
            </TransitionRoot>

            <!-- Button zum anmeldenGoogle anzeigen -->
            <button
              @click="anmeldenGoogle"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transform ease-in-out bg-htl_rot hover:bg-htl_hellrot ring-red-700 hover:scale-110 focus:ring-red-700"
              v-if="store.getAktivenUser == null && !WebuntisPasswordFieldShow"
            >
              Anmelden
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!--Login-Fehleralert-->
    <div class="w-full" v-if="LoginFehlerAlertAnzeigen">
      <div class="flex justify-center rounded-md bg-red-600 p-4">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-black" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-black font-bold">{{ LoginFehlerAlertText }}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              type="button"
              @click="LoginFehlerAlertAnzeigen = false"
              class="inline-flex bg-white rounded-md p-1.5 text-white hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-white"
            >
              <span class="sr-only">Dismiss</span>
              <XIcon class="h-5 w-5 text-red-600" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//Imports
import { ref, inject, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { PiniaStore, GoogleStore } from '../Store/Store.js';

//Import Tailwind
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { MenuIcon, XIcon, XCircleIcon } from '@heroicons/vue/outline';

const store = PiniaStore();
const googleStore = GoogleStore();

//Variablen
const serverAdress = import.meta.env.VITE_SERVER_ADRESS;
const router = useRouter();
const Vue3GoogleOauth = inject('Vue3GoogleOauth');
const WebuntisPasswordFieldShow = ref(false);
const WebuntisPasswordFieldInput = ref('');
const LoginFehlerAlertAnzeigen = ref(false);
const LoginFehlerAlertText = ref('');
const googleUser = reactive({});

//Funktionen
async function abmelden() {
  console.log('Abmelden');

  //Google Logout
  await googleStore.gAuth.signOut();

  //Aktiven User entfernen
  store.aktivenUserAbmelden();
  store.$reset();

  //Express-Session am Server beenden
  await axios.post('/lehrerSchuelerAbmelden', {});

  store.$dispose();
}

async function anmeldenGoogle() {
  //Google einloggen
  const googleUserSigned = await googleStore.gAuth.signIn();
  const basicProfile = googleUserSigned.getBasicProfile();

  //! Variabeln muss man nach einer gewissen Zeit neu setzen...
  // console.log(basicProfile);
  const { sf: name, Nv: email, cO: icon } = basicProfile;

  //Google-Uservariablen bekommen
  const checkIfTeacher = (emailString) => (/\d/.test(emailString) ? false : true);
  googleUser.value = {
    name,
    email,
    icon,
    isLehrer: checkIfTeacher(email),
    klasse: 'server!',
  };

  //Weiterleiten, wenn Lehrer, Schüler müssen dann Webuntis-Passwort eingeben
  if (!googleUser.value.isLehrer) {
    //Webuntis Password-field einblenden
    WebuntisPasswordFieldShow.value = true;
  } else {
    anmeldenMitUntisdaten();
  }
}

async function anmeldenMitUntisdaten() {
  //Das WebuntisPasswort mit ins Userpaket packen
  googleUser.value.webUntisPW = WebuntisPasswordFieldInput.value;

  //User registrieren in DB, falls er noch nicht ist
  let { status, data: User } = await axios.post(`/lehrerSchuelerAnmelden`, googleUser.value);

  //Schauen ob es Login-Serverprobleme gab
  if (status == 200) {
    //Fehlermeldung entfernen
    LoginFehlerAlertAnzeigen.value = false;
    LoginFehlerAlertText.value = '';

    //UntisInputs leeren
    WebuntisPasswordFieldInput.value = '';
    WebuntisPasswordFieldShow.value = false;

    //User im Store setzen
    store.setAktiverUser(User);

    console.log(User);

    //Weiterleitung zur Accountseite
    router.push('/Account');
  } else {
    //Fehlermeldung setzen
    LoginFehlerAlertAnzeigen.value = true;
    LoginFehlerAlertText.value = User;

    //UntisInputs leeren
    WebuntisPasswordFieldInput.value = '';
    WebuntisPasswordFieldShow.value = false;

    //Von Google abmelden wenn Fehler beim Anmelden aufgetreten sind
    abmelden();
  }
}
</script>

<style scoped>
input[type='password'] {
  font-family: 'Verdana';
}
</style>
