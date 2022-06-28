import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    randoms: [],
  },
  getters: {
    randoms: (state) => state.randoms,
  },
  mutations: {
    SAVE_RANDOMS(state, payload) {
      state.randoms = payload;
    },
  },
  actions: {
    addToRandoms(ctx, payload) {
      const randoms = ctx.state.randoms;
      randoms.push(payload);
      ctx.commit("SAVE_RANDOMS", randoms);
    },
  },
  modules: {},
});
