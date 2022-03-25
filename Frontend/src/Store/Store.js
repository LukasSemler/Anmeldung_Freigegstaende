import { defineStore } from 'pinia';

export const PiniaStore = defineStore({
  id: 'AnmeldungFreifaecher',
  state: () => ({
    aktiverUser: null,
    gAuth: null,

    fristEinreichen: null,
    fristAnmelden: null,
  }),
  getters: {
    getAktivenUser: function () {
      return this.aktiverUser;
    },

    getSchueler() {
      try {
        if (this.aktiverUser.s_id) {
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
        if (this.aktiverUser.isLehrer) {
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
        if (this.aktiverUser.isLehrer && this.aktiverUser.isAdmin) {
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
    },

    getFristEinreichen() {
      return this.fristEinreichen;
    },

    getFristAnmelden() {
      return this.fristAnmelden;
    },
  },
  actions: {
    //Actions fuer state setzen
    setFristAnmelden: function (frist) {
      this.fristAnmelden = frist;
    },
    setFristEinreichen: function (frist) {
      this.fristEinreichen = frist;
    },
    setgAuth: function (gAuth) {
      this.gAuth = gAuth;
    },
    setAktiverUser: function (aktiverUser) {
      this.aktiverUser = aktiverUser;
    },

    //Aktiven User setzen
    aktivenUsersetzen: function (neuerUser) {
      this.aktiverUser = neuerUser;
    },

    aktivenUserAbmelden: function () {
      this.aktiverUser = null;
    },


  },
  persist: {
    enable: true,
  },
});
