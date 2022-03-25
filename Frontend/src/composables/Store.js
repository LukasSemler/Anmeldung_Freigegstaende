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

  //Returning true oder false, je nachdem was der Aktuelle User ist
  getSchueler() {
    try {
      if (state.aktiverUser.s_id) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  },
  getLehrer() {
    try {
      if (state.aktiverUser.isLehrer) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  },
  getAdmin() {
    try {
      if (state.aktiverUser.isLehrer && state.aktiverUser.isAdmin) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
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
