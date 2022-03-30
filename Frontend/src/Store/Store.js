import { defineStore } from 'pinia';

//Die Funktion läuft intern bei allen actions ab um den State im localstorage zu speichern
function SaveState(abmelden) {
  const store = PiniaStore();

  //State speichern
  if (store.aktiverUser != null) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  } else if (abmelden) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  }
}

export const PiniaStore = defineStore('AnmeldungFreifaecher', {
  //State
  state: () => ({
    aktiverUser: null,

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

      //State speichern
      SaveState();
    },
    setFristEinreichen: function (frist) {
      this.fristEinreichen = frist;

      //State speichern
      SaveState();
    },
    setAktiverUser: function (neuerUser) {
      console.log('Erstelle neuen User!');
      this.aktiverUser = neuerUser;

      //State speichern
      SaveState();
    },
    aktivenUserAbmelden: function () {
      this.aktiverUser = null;

      //State speichern
      SaveState(true);
    },
  },
});

//Store ist nur für Google zuständig
export const GoogleStore = defineStore('GoogleLoginLogoutStore', {
  state: () => ({
    gAuth: null,
  }),

  getters: {},

  actions: {
    setgAuth: function (gAuth) {
      this.gAuth = gAuth;

      //State speichern
      SaveState();
    },
  },
});
