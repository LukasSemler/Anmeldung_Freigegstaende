<template>
  <div>
    <!--Navbar-->
    <NavBar></NavBar>

    <!--MainView-->
    <RouterView />

    <!--Footer-->
    <hr class="my-2 bg-gray-300" />
    <FooterComp></FooterComp>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import FooterComp from './components/FooterComp.vue';

//Store einbinden
import { PiniaStore } from './Store/Store.js';
const store = PiniaStore();


onMounted(async () => {
  //Den Store beim Reload mit den gespeicherten Daten füllen
  if (localStorage.getItem(store.$id)) {
    store.$state = JSON.parse(localStorage.getItem(store.$id));
  }

  //Fristen holen und setzen
  const { data } = await axios.get('http://localhost:2410/getFristen');

  if (data.length !== 0) {
    // if (!fristEinreichen && !fristAnmelden) {
    // Fristen setzen
    store.setFristEinreichen({
      formatiert: formateDate(data[0].frist_einreichen),
      original: data[0].frist_einreichen,
    });
    store.setFristAnmelden({
      formatiert: formateDate(data[0].frist_anmelden),
      original: data[0].frist_anmelden,
    });
    // }
  }
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
