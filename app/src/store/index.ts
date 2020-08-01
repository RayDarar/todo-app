import Vue from "vue";
import Vuex from "vuex";
import { AuthApi } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  getters: {
    token(state) {
      if (state.token) state.token = localStorage.getItem("token") as string;
      return state.token;
    }
  },
  mutations: {},
  actions: {
    async validateToken({ getters }) {
      const localToken = getters.token;

      const response = await AuthApi.validateToken(localToken);
      return response.status == 200;
    }
  },
  modules: {}
});
