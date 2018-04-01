import axios from 'axios';

const LOGIN = "LOGIN";
const REGISTRATION = "REGISTRATION";
const LOGOUT = "LOGOUT";
const USER = "USER";
const CART = "CART";
const ORDERS = "ORDERS";

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";
const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const state = {
  user: storedUser,
  cart: storedCart,
  orders: [],
};

const getters = {
  user: state => state.user,
  cart: state => state.cart,
  orders: state => state.orders,
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
  [CART](state, cart) {
    state.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  [ORDERS](state, orders) {
    state.orders = orders.map((order) => {
      order.date = new Date(order.date);
      return order;
    });
  },
  registerPage(state) {
    state.registerPage = true;
  },
  loginPage(state) {
    state.registerPage = false;
  }
};

const actions = {

  register({ commit }, creds) {
    return new Promise(function (success, error) {
      return axios.post('/api/auth/register', { token: btoa(JSON.stringify({ user: creds })) })
        .then(response => {
          commit(USER, response.data);
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

  login({ commit }, creds) {
    return new Promise(function (success, error) {
      return axios.post('/api/auth/login', { token: btoa(JSON.stringify({ user: creds })) })
        .then(response => {
          console.log(response);
          commit(USER, response.data);
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise(function (success, error) {
      commit(LOGOUT);
      success();
    });
  },
  
  addToCart({commit, state}, game){
    let cart = state.cart;
    cart.push({game});
    commit(CART,cart);
  },

  removeFromCart({commit, state}, game){
    let cart = state.cart;
    let index = cart.findIndex((product)=>{
      return product.game.uid === game.uid;
    });
    if(index>-1){
      cart.splice(index,1);
      commit(CART,cart);
    }
  },

  getorders({ commit, state }) {
    return new Promise(function (success, error) {
      return axios.post('/api/user/getorders', { token: state.user })
        .then(response => {
          console.log(response);
          commit(ORDERS, response.data);
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
