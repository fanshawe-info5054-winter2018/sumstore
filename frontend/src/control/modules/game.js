import axios from 'axios';

const GAMES = "GAMES";

const storedGames = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : {};

const state = {
  games: storedGames,
};

const getters = {
  games: state => state.games,
};

const mutations = {
  [GAMES](state, games) {
    state.games = games;
    localStorage.setItem('games', JSON.stringify(games));
  },
};

const actions = {
  list({commit},platform) {
    return new Promise(function (resolve, reject) {
      return axios.post('/api/game/list',{platform}).then(response => {
        commit(GAMES, response.data);
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  },
  listall({commit}) {
    return new Promise(function (resolve, reject) {
      return axios.post('/api/game/listall').then(response => {
        commit(GAMES, response.data);
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
