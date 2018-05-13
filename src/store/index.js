import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0,
  temporaryMenu: {},
};

const mutations = {
  setTemporaryMenu(state, obj) {
    for (const key of Object.keys(obj)) {
      state.temporaryMenu[key] = obj[key];
    }
  },
  resetTemporaryMenu(state) {
    state.temporaryMenu = {};
  }
};

const actions = {

};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
