<template>
  <AdminAccount
    :aktiverUser="Store.getters.getAktivenUser()"
    v-if="Store.getters.getAktivenUser().isAdmin && Store.getters.getAktivenUser().isLehrer"
  ></AdminAccount>
  <LehrerAccount
    :aktiverUser="Store.getters.getAktivenUser()"
    v-else-if="Store.getters.getAktivenUser().isLehrer && !Store.getters.getAktivenUser().isAdmin"
  ></LehrerAccount>
  <SchuelerAccount v-else></SchuelerAccount>
</template>

<script setup>
import Store from '../composables/Store.js';

import AdminAccount from '../components/AdminAccount.vue';
import LehrerAccount from '../components/LehrerAccount.vue';
import SchuelerAccount from '../components/SchuelerAccount.vue';
</script>
