import Vue from "vue";
import Vuex from "vuex";
import { AuthApi, UsersApi } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: null
  },
  getters: {
    token(state) {
      if (state.token) state.token = localStorage.getItem("token") as string;
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setRefreshToken(_state, token) {
      localStorage.setItem("refresh-token", token);
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async validateToken({ getters }) {
      const localToken = getters.token;

      const response = await AuthApi.validateToken(localToken);
      return response.status == 200;
    },
    async fetchUser({ commit }, userId) {
      const user = await UsersApi.getUserById(userId);
      commit("setUser", user.data);
    },
    async signIn({ commit, dispatch }, payload) {
      const { username, password } = payload;

      const response = await AuthApi.authenticate(username, password);

      if (response.status == 200) {
        const data = response.data;
        commit("setToken", data.accessToken);
        commit("setRefreshToken", data.refreshToken);
        await dispatch("fetchUser", data.id);
        return true;
      }
      return false;
    },
    async signUp({ dispatch }, payload) {
      const { username, password } = payload;

      const response = await UsersApi.createUser(username, password);

      if (response.status == 201) {
        await dispatch("fetchUser", response.data);
        return true;
      }
      return false;
    }
  },
  modules: {}
});
