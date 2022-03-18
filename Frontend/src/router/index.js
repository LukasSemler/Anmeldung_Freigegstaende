import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import addFachView from '../views/AddFachView.vue';
import Error404 from '../views/Error404.vue';
import AccountView from '../views/AccountView.vue';
import setFristView from '../views/setFristView.vue';
import adminCheckFaecherViewVue from '../views/adminCheckFaecherView.vue';
import FreifachDetailVue from '../views/FreifachDetail.vue';

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
      component: AccountView,
    },
    {
      path: '/setFrist',
      name: 'setFrist',
      component: setFristView,
    },
    {
      path: '/adminCheckFaecher',
      name: 'adminCheckFaecher',
      component: adminCheckFaecherViewVue,
    },
    {
      path: '/freifachDetail',
      name: 'FreifachDetail',
      component: FreifachDetailVue,
    },
  ],
});

export default router;
