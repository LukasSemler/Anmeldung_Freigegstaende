import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import router from './router';
import gAuthPlguin from './googleLoginScript';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(Countdown);
app.use(router);
app.use(gAuthPlguin, {
  clientId: '364919791252-i3qr4ocivimg1drj9v6kmhbkrt1bo28r.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
});
app.use(pinia);

// app.use(vueMoment)

app.mount('#app');
