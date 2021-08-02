import { auth, usersCollection } from '@/includes/firebase';

export default {
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    authModalShow: (state) => state.authModalShow,
  },
  actions: {
    async register({ commit }, payload) {
      const {
        password,
        confirmPassword,
        tos,
        ...userObj
      } = payload;
      const userCredentials = await auth.createUserWithEmailAndPassword(payload.email, password);
      await usersCollection.doc(userCredentials.user.uid).set(userObj);

      await userCredentials.user.updateProfile({
        displayName: payload.name,
      });
      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }) {
      await auth.signOut();
      commit('toggleAuth');
    },
  },
};
