<template>
<div>

  <div id="carouselExampleIndicators" class="carousel slide my-4 col-lg-9" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <ul>
    <li v-for="game in gamelist">
      <h3>
        {{game.name}}
      </h3>
      platform: {{game.platform.name}}
    </li>
  </ul>
  <router-link :to="{ path: '/auth', query: { action: 'login' }}">Login</router-link>
  <router-link :to="{ path: '/auth', query: { action: 'register' }}">Register</router-link>
</div>
</template>
<script>
export default {
  computed:{
    gamelist(){
      return this.$store.getters["game/games"];
    }
  }
}
</script>
