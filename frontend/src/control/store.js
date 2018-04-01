import Vue from 'vue/dist/vue.common';
import Vuex from 'vuex';

import user from './modules/user';
import game from './modules/game';
import platform from './modules/platform';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    game,
    platform
  },
});