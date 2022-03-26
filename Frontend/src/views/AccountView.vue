<template>
  <AdminAccount
    :aktiverUser="store.getAktivenUser"
    v-if="store.getAktivenUser.isAdmin && store.getAktivenUser.isLehrer"
  ></AdminAccount>
  <LehrerAccount
    :aktiverUser="store.getAktivenUser"
    v-else-if="store.getAktivenUser.isLehrer && !store.getAktivenUser.isAdmin"
  ></LehrerAccount>
  <SchuelerAccount :aktiverUser="store.getAktivenUser" v-else></SchuelerAccount>
</template>

<script setup>
import AdminAccount from '../components/AdminAccount.vue';
import LehrerAccount from '../components/LehrerAccount.vue';
import SchuelerAccount from '../components/SchuelerAccount.vue';

import { PiniaStore } from '../Store/Store.js';

const store = PiniaStore();
</script>
