import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import addFachView from '../views/AddFachView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/addFach',
      name: 'addFach',
      component: addFachView,
    },
  ],
});

export default router;
