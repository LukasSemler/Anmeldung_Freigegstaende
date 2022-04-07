<template>

  <h1 class="text-center text-4xl mt-3">
    Willkommen {{ aktiverUser.vorname }} {{ aktiverUser.nachname }}
  </h1>

  <Suspense>
    <template #default>
      <CardCompSchueler :aktiverUser="props.aktiverUser"></CardCompSchueler>
    </template>
    <template #fallback>
      <div class="text-center text-xl font-bold mt-3">
        <p>Loading...</p>
        <div class="flex justify-center"><img class="w-10" src="@/assets/Loading.svg" alt="" /></div>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import CardCompSchueler from './CardCompSchueler.vue';



const props = defineProps({ aktiverUser: {} });
</script>
