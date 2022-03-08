import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import Countdown from 'vue3-flip-countdown';
import router from './router';

createApp(App).use(Countdown).use(router).mount('#app');