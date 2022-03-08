import { createRouter, createWebHistory } from 'vue-router';
import newHome from '../views/newHome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: newHome,
    },
  ],
});

export default router;
