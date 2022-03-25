import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import addFachView from '../views/AddFachView.vue';
import Error404 from '../views/Error404.vue';
import AccountView from '../views/AccountView.vue';
import setFristView from '../views/setFristView.vue';
import adminCheckFaecherViewVue from '../views/adminCheckFaecherView.vue';
import FreifachDetailVue from '../views/FreifachDetail.vue';
import DetailAnsichtView from '../views/DetailAnsichtView.vue';
import FAQView from '../views/FAQView.vue';
import Store from '../composables/Store.js';

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
      beforeEnter: (to, from, next) => {
        if (Store.getters.getLehrer()) {
          next();
        } else {
          next('/');
        }
      },
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
      beforeEnter: (to, from, next) => {
        if (Store.getters.getAktivenUser()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/setFrist',
      name: 'setFrist',
      component: setFristView,
      beforeEnter: (to, from, next) => {
        if (Store.getters.getAdmin()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/adminCheckFaecher',
      name: 'adminCheckFaecher',
      component: adminCheckFaecherViewVue,
      beforeEnter: (to, from, next) => {
        if (Store.getters.getLehrer()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/freifachDetail',
      name: 'FreifachDetail',
      component: FreifachDetailVue,
    },
    {
      path: '/freifachDetailLehrer',
      name: 'FreifachDetailLehrer',
      component: DetailAnsichtView,
      beforeEnter: (to, from, next) => {
        if (Store.getters.getLehrer()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQView,
    },
    { path: '/:pathmatch(.*)*', name: 'not-found', component: Error404 },
  ],
});

export default router;
