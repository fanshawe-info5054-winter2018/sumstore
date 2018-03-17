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
    <div class="row">
      <div class="input-group col-sm-4">
      <input type="text" v-model="search" class="form-control" placeholder="Search for a game title"/>
      </div>
      <div class="input-group col-md-4">
      <select v-model="splatform" class="form-control">
        <option value="">Filter by Platform</option>
        <option v-for="platform in platformlist" :key="platform.name">{{platform.name}}</option>
      </select>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="game in gamelist">
        <router-link :to="{ path: '/gamedetails', query: { gameuid: game.uid, platformuid: game.platform.uid }}">
        <h3>
          {{game.name}}
        </h3>
        platform: {{game.platform.name}}
        </router-link>
      </li>
    </ul>
  </div>


  
</template>
<script>
    export default {

        // Initialize filter form elements.
        data() {
            return {
                search: '',
                splatform: '',
            }
        },
        computed: {
            gamelist(){
                // Store this for use in filter functions.
                var self = this;
                return this.$store.getters["game/games"].filter(function (item) {
                    // Filters games by Title.
                    return item.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }).filter(function (item) {
                    // Filters games by platform.
                    return self.splatform == '' || item.platform.name == self.splatform;
                });
            },
            platformlist(){
                return this.$store.getters["platform/platforms"];
            }

        }
    }
</script>
