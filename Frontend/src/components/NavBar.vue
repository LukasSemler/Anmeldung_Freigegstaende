<template>
  <div>
    <!--Navbar-->
    <Disclosure as="nav" class="bg-htl_grau" v-slot="{ open }">
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
            <Menu v-if="Store.getters.getAktivenUser()" as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                    <img
                      async
                      :src="Store.getters.getAktivenUser().icon"
                      referrerpolicy="no-referrer"
                      alt="Icon"
                    />
                  </span>
                </MenuButton>
              </div>
              <transition
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

            <!-- Button zum anmelden anzeigen -->
            <button
              @click="anmelden"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transform ease-in-out bg-htl_rot hover:bg-htl_hellrot ring-red-700 hover:scale-110 focus:ring-red-700"
              v-if="Store.getters.getAktivenUser() == null"
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
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

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
import Store from '../composables/Store.js';

//Variablen
const router = useRouter();
const Vue3GoogleOauth = inject('Vue3GoogleOauth');
const LoginFehlerAlertAnzeigen = ref(false);
const LoginFehlerAlertText = ref('');

//Funktionen
async function abmelden() {
  console.log('Abmelden');

  //Google Logout
  await Store.state.gAuth.signOut();

  //Aktiven User entfernen
  Store.actions.AktivenUserAbmelden();
  localStorage.removeItem('User');
}

async function anmelden() {
  //Google einloggen
  const googleUser = await Store.state.gAuth.signIn();
  const basicProfile = googleUser.getBasicProfile();

  const { sf: name, yv: email, zN: icon } = basicProfile;

  //Google-Uservariablen bekommen
  const checkIfTeacher = (emailString) => (/\d/.test(emailString) ? false : true);
  //TODO MAN MUSS NOCH MITTELS GOOGLE-GROUP NOCH DIE KLASSE HERAUSBEKOMMEN
  const GoogleUser = {
    name,
    email,
    icon,
    isLehrer: checkIfTeacher(email),
    klasse: '4BHITM',
  };

  //User registrieren in DB, falls er noch nicht ist
  let { status, data: User } = await await axios.post(
    'http://localhost:2410/lehrerSchuelerAnmelden',
    GoogleUser,
  );

  //Schauen ob es Login-Serverprobleme gab
  if (status == 200) {
    //User im Store setzen
    Store.actions.aktivenUserSetzen(User);

    //User im LS setzen
    localStorage.setItem('User', JSON.stringify(User));

    //Weiterleitung zur Accountseite
    router.push('/Account');
  } else {
    //Fehlermeldung setzen
    LoginFehlerAlertAnzeigen.value = true;
    LoginFehlerAlertText.value = User;
  }
}
</script>
