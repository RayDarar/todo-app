import Vue from "vue";
import Vuex from "vuex";
import { AuthApi, UsersApi } from "@/api";

import { Mutations } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: null,
    snackbar: {
      message: "",
      isShow: false,
      color: "success"
    }
  },
  getters: {
    token(state) {
      if (state.token) state.token = localStorage.getItem("token") as string;
      return state.token;
    }
  },
  mutations: {
    [Mutations.SET_TOKEN](state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    [Mutations.SET_REFRESH_TOKEN](_state, token) {
      localStorage.setItem("refresh-token", token);
    },
    [Mutations.SET_USER](state, user) {
      state.user = user;
    },
    [Mutations.SET_SNACKBAR](state, payload) {
      state.snackbar.isShow = payload.isShow || false;
      state.snackbar.message = payload.message ? payload.message : "";
      state.snackbar.color = payload.color
        ? payload.color
        : state.snackbar.color;
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
      commit(Mutations.SET_USER, user.data);
    },
    async signIn({ commit, dispatch }, payload) {
      const { username, password } = payload;

      const response = await AuthApi.authenticate(username, password);

      if (response.status == 200) {
        const data = response.data;
        commit(Mutations.SET_TOKEN, data.accessToken);
        commit(Mutations.SET_REFRESH_TOKEN, data.refreshToken);
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
    },
    showSnackbar({ commit }, payload) {
      const { message, isShow, color } = payload;

      commit(Mutations.SET_SNACKBAR, {
        message,
        isShow,
        color
      });
    }
  },
  modules: {}
});
