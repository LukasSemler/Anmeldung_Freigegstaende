import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import router from './router';
import gAuthPlguin from './googleLoginScript';


const app = createApp(App);

app.use(Countdown);
app.use(router);
app.use(gAuthPlguin, {
  clientId: '364919791252-i3qr4ocivimg1drj9v6kmhbkrt1bo28r.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
});

// app.use(vueMoment)

app.mount('#app');
