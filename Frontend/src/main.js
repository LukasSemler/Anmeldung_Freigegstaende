import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import { createPinia } from 'pinia';
import router from './router';
import gAuthPlguin from './googleLoginScript';

const app = createApp(App);

//Router
app.use(router);

//Pinia Store
const pinia = createPinia();
app.use(pinia);

//CountdownComponente
app.use(Countdown);

//Google umgebautes (NPM-Package)
app.use(gAuthPlguin, {
  clientId: '364919791252-i3qr4ocivimg1drj9v6kmhbkrt1bo28r.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
});

app.mount('#app');
