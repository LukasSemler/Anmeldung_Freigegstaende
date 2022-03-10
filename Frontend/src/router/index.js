import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import addFachView from '../views/AddFachView.vue';
import Error404 from '../views/Error404.vue';
import Account from '../views/Account.vue';

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
    {
      path: '/Error404',
      name: 'error',
      component: Error404,
    },
    {
      path: '/Account',
      name: 'account',
      component: Account,
    },
  ],
});

export default router;
