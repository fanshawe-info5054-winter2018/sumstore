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
  <br/>
  <div class="clearfix">
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
      <span class="rating">
        <input v-if="!liked" type="image" value="like" class="btn" src="/images/thumbs-up.jpg" @click="like(true)"/>
        <input v-else type="image" value="like" class="btn" src="/images/thumbs-up.jpg" disabled/>
        
        <input v-if="liked" type="image" value="dislike" class="btn" src="/images/thumbs-down.jpg" @click="like(false)"/>
        <input v-else type="image" value="dislike" class="btn" src="/images/thumbs-down.jpg" disabled/>
        {{Object.values(game.likes).length}} Users liked this game
      </span>
      <br/>
      <span class="price">
        price: {{game.price}}
      </span>
    </div>
    <div class="float-right">
      <button class="btn btn-primary" :disabled="isInCart" @click="addToCart()">Add to Cart</button>
    </div>
  </div>
  <br />
  <div v-if="similar.length" class="float-left">
    <br>
    <h3>Similar games you may like..</h3>
    <br>
    <ul class="list-group" v-once>
      <li class="list-group-item btn" v-for="similargame in similar" @click="gotoGame(similargame)">
        <h3>
          {{similargame.name}}
        </h3>
        platform: {{similargame.platform.name}}
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  created() {
    this.getData();
  },
  computed: {
    game() {
      let game = Object.assign({}, this.$store.getters["game/selectedGame"]);
      game.platform = this.$store.getters["platform/platforms"].find(
        platform => {
          return platform.uid == game.platform;
        }
      );
      game.likes = game.likes ? game.likes : {};
      return game;
    },
    isInCart() {
      return (
        this.$store.getters["user/cart"].findIndex(product => {
          return product.game.uid == this.game.uid;
        }) > -1
      );
    },
    liked() {
      return (
        this.$store.getters["user/likedGames"].findIndex(likedGame => {
          return likedGame == this.game.uid;
        }) > -1
      );
    },
    similar() {
      // Get the game from detail
      let self = this;
      let game = this.game;
      let gamesList = [];
      self.$store.dispatch("game/similargames", game);
      gamesList = self.$store.getters["game/similarGames"];

      return gamesList;
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("user/addToCart", this.game);
    },
    like(likevalue) {
      this.$store
        .dispatch("user/likegame", { game: this.game, like: likevalue })
        .then(() => {
          this.$store.dispatch("user/getlikedgames");
          this.$store.dispatch("game/fetch", {
            platformuid: this.$route.query.platformuid,
            gameuid: this.$route.query.gameuid
          });
        });
    },
    gotoGame(similargame) {
      this.$route.query.platformuid = similargame.platform.uid;
      this.$route.query.gameuid = similargame.uid;
      this.getData();
    },
    getData() {
      this.$store.dispatch("game/fetch", {
        platformuid: this.$route.query.platformuid,
        gameuid: this.$route.query.gameuid
      });
      this.$store.dispatch("user/getlikedgames");
    }
  }
};
</script>
