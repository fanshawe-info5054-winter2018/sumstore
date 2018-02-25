import axios from 'axios';

const PLATFORMS = "PLATFORMS";

const storedPlatforms = localStorage.getItem('platforms') ? JSON.parse(localStorage.getItem('platforms')) : {};

const state = {
  platforms: storedPlatforms,
};

const getters = {
  platforms: state => state.platforms,
};

const mutations = {
  [PLATFORMS](state, platforms) {
    state.platforms = platforms;
    localStorage.setItem('platforms', JSON.stringify(platforms));
  },
};

const actions = {
  list({commit}) {
    return new Promise(function (resolve, reject) {
      return axios.post('/api/platform/list').then(response => {
        commit(PLATFORMS, response.data);
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  },
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
};
