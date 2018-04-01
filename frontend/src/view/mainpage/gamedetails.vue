<template>
<div class="container">
  <!-- put game details html here -->
  <h1>Game Details</h1>
  <h3>
    {{game.name}}
  </h3>
  <p>
    For: {{game.platform.name}}
  </p>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" :src="game.trailer.replace('watch?v=', 'embed/')" frameborder="0" allowfullscreen></iframe>
  </div>
  <div>
    <div class="float-left">
      <span class="badge badge-success" v-if="game.qty>=10">
        In Stock
      </span>
      <span class="badge badge-warning" v-else-if="game.qty>0">
        Limited Stock
      </span>
      <span class="badge badge-dark" v-else>
        Out of Stock
      </span>
    </div>
    <div class="float-right">
      <span class="rating">
        <input type="image" value="like" class="btn" src="/images/thumbs-up.jpg"/>
        <input type="image" value="dislike" class="btn" src="/images/thumbs-down.jpg"/>
      </span>
      <br/>
      <span class="price">
        price: {{game.price}}
      </span>
    </div>
  </div>

</div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("game/fetch", {
      platformuid: this.$route.query.platformuid,
      gameuid: this.$route.query.gameuid
    });
  },
  computed: {
    game() {
      let game = Object.assign({}, this.$store.getters["game/selectedGame"]);
      game.platform = this.$store.getters["platform/platforms"].find(
        platform => {
          return platform.uid == game.platform;
        }
      );
      return game;
    }
  }
};
</script>
