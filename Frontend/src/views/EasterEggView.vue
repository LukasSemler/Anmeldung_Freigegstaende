<template>
  <div class="bg-white">
    <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        <div class="space-y-5 sm:space-y-4">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Easter Egg</h2>
          <p class="text-xl text-gray-500">
            Hallo, es freut uns sehr, dass du dieses Easter Egg gefunden hast. Hier stellen wir,
            also die Schüler die diese Websiete programiert haben, persönlich vor. Wir gehen in die
            4BHITM und haben diese Webseite im Schuljahr 2022/23 im Rahmen des ITP Unterrichts mit
            unserem Betreuer Prof. Robert Baumgartner erstellt.
          </p>
        </div>
        <div class="lg:col-span-2">
          <ul
            role="list"
            class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
          >
            <li v-for="person in people" :key="person.name">
              <div class="space-y-4">
                <div class="aspect-w-3 aspect-h-2">
                  <img class="object-cover shadow-lg rounded-lg" :src="person.imageUrl" alt="" />
                </div>
                <div class="text-lg leading-6 font-medium space-y-1">
                  <h3>{{ person.name }}</h3>
                  <p class="text-htl_rot">{{ person.role }}</p>
                </div>
                  <!-- <div class="text-lg">
                    <p class="text-gray-500">{{ person.bio }}</p>
                  </div> -->

                <ul role="list" class="flex space-x-5">
                  <li>
                    <a :href="person.instagramUrl"
                      ><img class="w-6" src="../assets/Instagram_logo.svg" alt=""
                    /></a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: 'Lukas Semler',
    role: 'Fullstack-Entwickler',
    imageUrl: '/seml_ich4_portrait-v1.jpg',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    instagramUrl: 'https://www.instagram.com/lukas_102065/',
  },
  {
    name: 'Benjamin Stauf',
    role: 'Fullstack-Entwickler',
    imageUrl: '/stau_Portrait_Ich1_V1.jpg',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    instagramUrl: 'https://www.instagram.com/benni_stauf/',
  },
];
</script>
