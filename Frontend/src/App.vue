<template>
  <div>
    <NavBar></NavBar>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Store from './composables/Store';
import {onMounted} from "vue"

onMounted(() => {
  //Wenn User im Localstorage, dann laden
  if (localStorage.getItem('User')) {
    let user = JSON.parse(localStorage.getItem('User'));

    Store.actions.aktivenUserSetzen(user);
  }
});
</script>
