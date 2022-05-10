import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import { createPinia } from 'pinia';
import router from './router';
import gAuthPlguin from './googleLoginScript';
import axios from 'axios';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

//Router
app.use(router);

//Pinia Store
const pinia = createPinia();
app.use(pinia);

//CountdownComponente
app.use(Countdown);

//Axios base-url setzen
if (location.origin === 'http://localhost:8080') {
  axios.defaults.baseURL = 'http://localhost:2410';
}

//Google umgebautes (NPM-Package)
app.use(gAuthPlguin, {
  clientId: '364919791252-i3qr4ocivimg1drj9v6kmhbkrt1bo28r.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
});

app.component('Datepicker', Datepicker);

app.mount('#app');
