import { reactive } from 'vue';

const state = reactive({
  aktiverUser: null,
  // aktiverUser: {
  //   name: 'Robert Baumgartner',
  //   email: 'robert.baumgartner@htlwienwest.at',
  //   isAdmin: false,
  //   isLehrer: true,
  // },
  // schuelerUser: {
  //   name: 'Lukas semler',
  //   email: 'semler.l04@htlwienwest.at',
  //   isAdmin: false,
  //   isLehrer: false,
  // },
  fristEinreichen: null,
  fristAnmelden: null,
});

const getters = {};

const actions = {};

export default state;
