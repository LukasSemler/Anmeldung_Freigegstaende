<template>
  <AdminAccount
    :aktiverUser="state.aktiverUser"
    v-if="state.aktiverUser.isAdmin && state.aktiverUser.isLehrer"
  ></AdminAccount>
  <LehrerAccount
    v-else-if="state.aktiverUser.isLehrer && !state.aktiverUser.isAdmin"
  ></LehrerAccount>
  <SchuelerAccount v-else></SchuelerAccount>
</template>

<script setup>
import state from '../composables/Store.js';

import AdminAccount from '../components/AdminAccount.vue';
import LehrerAccount from '../components/LehrerAccount.vue';
import SchuelerAccount from '../components/SchuelerAccount.vue';
</script>
