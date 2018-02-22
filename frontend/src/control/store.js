import Vue from 'vue/dist/vue.common';
import Vuex from 'vuex';

const auth = require('./modules/auth');

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
});