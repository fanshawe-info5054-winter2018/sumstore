import axios from 'axios';

const GAMES = "GAMES";
const SELECTEDGAME = "SELECTEDGAME";

const storedGames = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : {};
const storedSelectedGame = localStorage.getItem('selectedGame') ? JSON.parse(localStorage.getItem('selectedGame')) : {};

const state = {
  games: storedGames,
  selectedGame: storedSelectedGame
};

const getters = {
  games: state => state.games,
  selectedGame: state => state.selectedGame
};

const mutations = {
  [GAMES](state, games) {
    state.games = games;
    localStorage.setItem('games', JSON.stringify(games));
  },
  [SELECTEDGAME](state, game) {
    state.selectedGame = game;
    localStorage.setItem('selectedGame', JSON.stringify(game));
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
  select({commit},game) {
    return commit(SELECTEDGAME, game);
  },
  fetch({commit},{platformuid,gameuid}){
    return new Promise(function (resolve, reject) {
      return axios.post('/api/game/fetch',{platformuid,gameuid}).then(response => {
        commit(SELECTEDGAME, response.data);
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  },
  save({commit},game) {
    return new Promise(function (resolve, reject) {
      game = JSON.stringify(game);
      return axios.post('/api/game/save',{game}).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  },
  remove({commit},game) {
    return new Promise(function (resolve, reject) {
      game = JSON.stringify(game);
      return axios.post('/api/game/remove',{game}).then(response => {
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
