<template>
<div>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">SumStore</a>
      <!-- <router-link class="navbar-brand" :to="{ path: '/'}">SumStore</router-link> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" :class="{active:$route.path == '/'}">
              <router-link class="nav-link" :to="{ path: '/'}">Home</router-link>
          </li>
          <li v-if="!user" class="nav-item" :class="{active:$route.path == '/auth' && $route.query.action =='login'}">
            <router-link class="nav-link" :to="{ path: '/auth', query: { action: 'login' }}">Login</router-link>

          </li>
          <li v-if="!user" class="nav-item" :class="{active:$route.path == '/auth' && $route.query.action =='register'}">
            <router-link class="nav-link" :to="{ path: '/auth', query: { action: 'register' }}">Register</router-link>
          </li>
          <li v-if="user" class="nav-item" :class="{active:$route.path == '/user/orders'}">
            <router-link class="nav-link" :to="{ path: '/user/orders'}">Hello, {{user.username}}</router-link>
          </li>
          <li class="nav-item" :class="{active:$route.path == '/user/cart'}">
            <router-link class="nav-link" :to="{ path: '/user/cart'}">Cart <span v-if="cart.length" class="badge badge-light">{{cart.length}}</span></router-link>
          </li>
          <li v-if="user" class="nav-item" :class="{active:$route.path == '/user/preferences'}">
            <router-link class="nav-link" :to="{ path: '/user/preferences'}">Settings</router-link>
          </li>
          <li v-if="user && user.admin" class="nav-item" :class="{active:$route.path == '/admin'}">
              <router-link class="nav-link" :to="{ path: '/admin'}">Admin Home</router-link>
          </li>
          <li v-if="user" class="nav-item">
            <a class="nav-link" href="" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view></router-view>

<!-- Footer -->
  <!-- <footer class="py-2 bg-dark fix-down">
    <div class="container">
      <p class="text-center text-white">&nbsp</p>
    </div> -->
    <!-- /.container -->
  <!-- </footer> -->
</div>
</template>
<script>
export default {
  name:"mainpage",
  created(){
    this.$store.dispatch("platform/list");
    this.$store.dispatch("game/listall");
  },
  methods:{
    logout(){
      this.$store.dispatch("user/logout");
      console.log("logging out");
      location.reload();
    }
  },
  computed:{
    user(){
      let loggedUser = this.$store.getters["user/user"];
      if(loggedUser){
        return JSON.parse(atob(loggedUser.split('.')[1]));
      }
      return null;
    },
    cart(){
      return this.$store.getters["user/cart"];
    }
  }
};
</script>
