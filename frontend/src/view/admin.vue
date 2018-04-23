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
              <router-link class="nav-link" :to="{ path: '/admin'}">Admin Home</router-link>
          </li>
          <li class="nav-item active">
              <router-link class="nav-link" :to="{ path: '/admin/trackorders'}">Track Orders</router-link>
          </li>
          <li class="nav-item" :class="{active:$route.path == '/'}">
            <router-link class="nav-link" :to="{ path: '/'}">Back</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name:"admin"
};
</script>
