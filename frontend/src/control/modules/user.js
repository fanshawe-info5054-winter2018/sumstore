import axios from 'axios';

const LOGIN = "LOGIN";
const REGISTRATION = "REGISTRATION";
const LOGOUT = "LOGOUT";
const USER = "USER";
const CART = "CART";
const LIKEDGAMES = "LIKEDGAMES";
const ORDERS = "ORDERS";
const SELECTEDORDER = "SELECTEDORDER";

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";
const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const storedLikedGames = localStorage.getItem('likedGames') ? JSON.parse(localStorage.getItem('likedGames')) : [];
const storedOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
const storedSelectedOrder = localStorage.getItem('selectedOrder') ? JSON.parse(localStorage.getItem('selectedOrder')) : { status: "", products: [] };

const state = {
  user: storedUser,
  cart: storedCart,
  likedGames:storedLikedGames,
  orders: storedOrders,
  selectedOrder: storedSelectedOrder,
  shipping: 5,
};

const getters = {
  user: state => state.user,
  cart: state => state.cart,
  likedGames: state => state.likedGames,
  orders: state => state.orders,
  selectedOrder: state => state.selectedOrder,
  shipping: state => state.shipping,
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
  [LIKEDGAMES](state, likedGames) {
    state.likedGames = likedGames;
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
  },
  [ORDERS](state, orders) {
    state.orders = orders.map((order) => {
      order.date = new Date(order.date);
      return order;
    });
  },
  [SELECTEDORDER](state, order) {
    state.selectedOrder = order;
    localStorage.setItem('selectedOrder', JSON.stringify(order));
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

  updatePreferences({ commit }, user) {
    return new Promise(function (resolve, reject) {
      user = JSON.stringify(user);
      return axios.post('/api/user/update', { user }).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
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

  addToCart({ commit, state }, game) {
    let cart = state.cart;
    cart.push({ game });
    commit(CART, cart);
  },

  removeFromCart({ commit, state }, game) {
    let cart = state.cart;
    let index = cart.findIndex((product) => {
      return product.game.uid === game.uid;
    });
    if (index > -1) {
      cart.splice(index, 1);
      commit(CART, cart);
    }
  },

  clearCart({ commit }) {
    commit(CART, []);
  },

  getlikedgames(context) {
    return new Promise(function (success, error) {
      return axios.post('/api/user/getlikedgames', { token: context.state.user })
        .then(response => {
          context.commit(LIKEDGAMES, response.data);
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

  getorders(context) {
    return new Promise(function (success, error) {
      return axios.post('/api/user/getorders', { token: context.state.user })
        .then(response => {
          let games = context.rootState.game.games;
          response.data.forEach(order => {
            order.products = order.products.map((product) => {
              return {
                game: games.find(game => {
                  return game.uid == product.game;
                })
              };
            });
          });
          context.commit(ORDERS, response.data);
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

  cancelorder(context, order) {
    return new Promise(function (success, error) {
      return axios.post('/api/user/cancelorder', { order })
        .then(response => {
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },

  selectOrder({ commit }, order) {
    return commit(SELECTEDORDER, order);
  },

  checkout(context, { address, payment, total }) {
    let products = context.state.cart.map((product) => {
      return { game: product.game.uid };
    });
    return new Promise(function (success, error) {
      return axios.post('/api/user/checkout', { token: context.state.user, address, payment, products, total })
        .then(response => {
          success(response);
        }).catch(err => {
          error(err);
        });
    });
  },
  likegame(context, { game, like }) {
    return new Promise(function (success, error) {
      return axios.post('/api/game/like', { token: context.state.user, game, like })
        .then(response => {
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
