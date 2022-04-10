<template>
  <div class="shadow">
    <!--Navbar-->
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Möglicherweise nicht notwendig -->

            <!-- Mobile menu button-->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer"
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                @click="router.push('/')"
                class="block lg:hidden h-8 w-auto"
                src="../assets/Logo HTL Wien West.png"
                alt="HTL Logo"
              />
              <img
                @click="router.push('/')"
                class="hidden lg:block h-8 w-auto"
                src="../assets/Logo HTL Wien West.png"
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
            <div class="flex flex-wrap flex-row" v-if="WebuntisPasswordFieldShow">
              <div class="mr-5">
                <input
                  class="shadow appearance-none border border-htl_rot rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Webuntis-Passwort"
                  v-model="WebuntisPasswordFieldInput"
                />
              </div>
              <br />
              <button
                @click="anmeldenMitUntisdaten"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transform ease-in-out bg-htl_rot hover:bg-htl_hellrot ring-red-700 hover:scale-110 focus:ring-red-700"
              >
                Weiter
              </button>
            </div>

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
import { MenuIcon, XIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';

const store = PiniaStore();
const googleStore = GoogleStore();

//Variablen
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

  store.$dispose();
}

async function anmeldenGoogle() {
  //Google einloggen
  const googleUserSigned = await googleStore.gAuth.signIn();
  const basicProfile = googleUserSigned.getBasicProfile();

  const { sf: name, yv: email, zN: icon } = basicProfile;

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
  let { status, data: User } = await await axios.post(
    'http://localhost:2410/lehrerSchuelerAnmelden',
    googleUser.value,
  );

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
    // router.push('/Account');
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
