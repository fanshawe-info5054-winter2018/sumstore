import axios from 'axios';

const LOGIN = "LOGIN";
const REGISTRATION = "REGISTRATION";
const LOGOUT = "LOGOUT";
const USER = "USER";

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";

const state = {
  user: storedUser,
};

const getters = {
  user: state => state.user,
};

const mutations = {
  [LOGIN](state, user) {
    state.user = user;
  },
  [LOGOUT](state) {
    state.loggedIn = false;
    localStorage.clear();
  },
  [USER](state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  registerPage(state) {
    state.registerPage = true;
  },
  loginPage(state) {
    state.registerPage = false;
  }
};

const actions = {

  register({commit}, creds) {
    return new Promise(function (success, error) {
      return axios.post('/api/auth/register', {token:btoa(JSON.stringify({user:creds}))})
      .then(response => {
        commit(USER, response.data);
        success(response);
      }).catch(err => {
        error(err);
      });
    });
  },

  login({commit}, creds) {
    return new Promise(function (success, error) {
      return axios.post('/api/auth/login', {token:btoa(JSON.stringify({user:creds}))})
      .then(response => {
        console.log(response);
        commit(USER, response.data);
        success(response);
      }).catch(err => {
        error(err);
      });
    });
  },

  logout({commit}) {
    return new Promise(function (success, error) {
      commit(LOGOUT);
      success();
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
