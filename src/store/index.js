import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0,
  temporaryMenu: {},
  ingredients: {},
};

const mutations = {
  setTemporaryMenu(state, obj) {
    for (const key of Object.keys(obj)) {
      state.temporaryMenu[key] = obj[key];
    }
  },
  resetTemporaryMenu(state) {
    state.temporaryMenu = {};
  },
  setIngredients(state, ingreds) {
    state.ingredients = ingreds;
  }
};

const actions = {

};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
