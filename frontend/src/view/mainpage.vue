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
          <li class="nav-item active">
              <router-link class="nav-link" :to="{ path: '/'}">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: 'auth', query: { action: 'login' }}">Login</router-link>

          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: 'auth', query: { action: 'register' }}">Register</router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>

  <router-view></router-view>

<!-- Footer -->
  <footer class="py-2 bg-dark fix-down">
    <div class="container">
      <p class="text-center text-white">&nbsp</p>
    </div>
    <!-- /.container -->
  </footer>
</div>
</template>
<script>
export default {
  name:"mainpage",
  created(){
    this.$store.dispatch("platform/list");
    this.$store.dispatch("game/listall");
  }
};
</script>
