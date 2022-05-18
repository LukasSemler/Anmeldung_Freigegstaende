<template>
  <footer>
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="-mx-5 -my-2 flex flex-wrap justify-center text-center" aria-label="Footer">
        <div>
          <a
            @click="$router.push('/')"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            Home
          </a>
          <a
            @click="$router.push('/account')"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            Account
          </a>
          <a
            href="https://www.htlwienwest.at/"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            Schulwebseite
          </a>
          <a
            href="https://www.htlwienwest-elternverein.at/dark-mode/index.html"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            Elternverein
          </a>
          <a
            @click="$router.push('/impressum')"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            Impressum
          </a>
          <a
            @click="$router.push('/faq')"
            class="text-base text-gray-500 hover:text-gray-900 cursor-pointer px-5 py-2"
          >
            FAQ
          </a>
        </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-6">
        <a
          v-for="item in navigation.social"
          :key="item.name"
          :href="item.href"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p class="mt-8 text-center text-base text-gray-400">
        Höhere Technische Lehranstalt Wien West | Thaliastraße 125 | 1160 Wien | Tel: +43 (01) 49
        111-113 | Fax: +43 (01) 49 111-199
      </p>
      <p class="mt-8 text-center text-base text-gray-400">
        &copy; 2022 HTL Wien West, All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { defineComponent, h } from 'vue';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Account', href: '/Account' },
    { name: 'Schulwebseite', href: 'https://www.htlwienwest.at/' },
    { name: 'Elternverein', href: 'https://www.htlwienwest-elternverein.at/dark-mode/index.html' },
    { name: 'Impressum', href: '/impressum' },
    { name: 'FAQ', href: '/FAQ' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/HTLWienWest/',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/htlwienwest',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
            }),
          ]),
      }),
    },
  ],
};
</script>
