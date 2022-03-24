<template>
  <div>
    <NavBar></NavBar>
    <RouterView />
    <hr class="my-2 bg-gray-300" />
    <FooterComp></FooterComp>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Store from './composables/Store';
import { onMounted } from 'vue';
import axios from 'axios';
import FooterComp from './components/FooterComp.vue';

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
      Store.state.fristEinreichen = {
        formatiert: formateDate(data[0].frist_einreichen),
        original: data[0].frist_einreichen,
      };
      Store.state.fristAnmelden = {
        formatiert: formateDate(data[0].frist_anmelden),
        original: data[0].frist_anmelden,
      };
    } else console.log('Fristen schon gesetzt');
  } else console.log('Keine Fristen gesetzt');
});

function formateDate(date) {
  Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
  };

  let d = new Date(date);
  return (
    [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') +
    ' ' +
    [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':')
  );
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300&display=swap');
body {
  font-family: 'Titillium Web', sans-serif;
}
</style>
