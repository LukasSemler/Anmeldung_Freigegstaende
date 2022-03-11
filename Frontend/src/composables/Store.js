import { reactive, readonly } from 'vue';

const state = reactive({
  aktiverUser: null,
  gAuth: null,

  fristEinreichen: null,
  fristAnmelden: null,
});

const getters = {
  getAktivenUser() {
    return readonly(state.aktiverUser);
  },
};

const actions = {
  //Setzt User als Aktiv
  aktivenUserSetzen(neuerUser) {
    state.aktiverUser = neuerUser;
  },

  //Entfernt aktiven User
  AktivenUserAbmelden() {
    state.aktiverUser = null;
  },
};

export default {
  getters,
  actions,
  state,
};
