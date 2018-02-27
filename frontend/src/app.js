import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Vue from "vue/dist/vue.common";
import VueRouter from 'vue-router';

import router from './router';
import store from './control/store';

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router,
  store
});