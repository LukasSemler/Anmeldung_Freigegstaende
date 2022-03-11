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
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(async () => {
  //Wenn User im Localstorage, dann laden
  if (localStorage.getItem('User')) {
    let user = JSON.parse(localStorage.getItem('User'));

    Store.actions.aktivenUserSetzen(user);
  }

  //Fristen holen und setzen
  const { data } = await axios.get('http://localhost:2410/getFristen');

  if (data.length !== 0) {
    if (!Store.state.fristAnmelden && !Store.state.fristEinreichen) {
      Store.state.fristEinreichen = data[0].frist_einreichen;
      Store.state.fristAnmelden = data[0].frist_anmelden;
      console.log('Fristen wurden gesetzt');
    } else console.log('Fristen schon gesetzt');
  } else console.log('Keine Fristen gesetzt');
});
</script>
