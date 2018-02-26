import axios from 'axios';

const PLATFORMS = "PLATFORMS";
const SELECTEDPLATFORM = "SELECTEDPLATFORM";

const storedPlatforms = localStorage.getItem('platforms') ? JSON.parse(localStorage.getItem('platforms')) : {};
const storedSelectedPlatform = localStorage.getItem('selectedPlatform') ? JSON.parse(localStorage.getItem('selectedPlatform')) : {};

const state = {
  platforms: storedPlatforms,
  selectedPlatform: storedSelectedPlatform
};

const getters = {
  platforms: state => state.platforms,
  selectedPlatform: state => state.selectedPlatform
};

const mutations = {
  [PLATFORMS](state, platforms) {
    state.platforms = platforms;
    localStorage.setItem('platforms', JSON.stringify(platforms));
  },
  [SELECTEDPLATFORM](state, platform) {
    state.selectedPlatform = platform;
    localStorage.setItem('selectedPlatform', JSON.stringify(platform));
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
  select({commit},platform) {
    return commit(SELECTEDPLATFORM, platform);
  },
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
};
