import { defineStore } from 'pinia';

export const PiniaStore = defineStore('AnmeldungFreifaecher', {
  //State
  state: () => ({
    aktiverUser: null,
    gAuth: null,

    fristEinreichen: null,
    fristAnmelden: null,
  }),
  //Getter
  getters: {
    getAktivenUser: function () {
      return this.aktiverUser;
    },

    isSchueler() {
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
    isLehrer() {
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
    isAdmin() {
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
  //Actions
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
    setAktiverUser: function (neuerUser) {
      console.log('Erstelle neuen User!');
      this.aktiverUser = neuerUser;

      console.log(`Name: ${this.aktiverUser.vorname}`);
    },
    aktivenUserAbmelden: function () {
      this.aktiverUser = null;
    },
  },
});
