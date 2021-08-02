import { auth, usersCollection } from '@/includes/firebase';

export default {
  // namespaced: true,
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
  actions: {
    async register({ commit }, payload) {
      const {
        password,
        confirmPassword,
        tos,
        ...userObj
      } = payload;
      const userCred = await auth.createUserWithEmailAndPassword(payload.email, password);
      await usersCollection.doc(userCred.user.uid).set(userObj);

      await userCred.user.updateProfile({
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

      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: 'home' });
      // }
    },
  },
};
