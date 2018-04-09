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

</div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("game/fetch", {
      platformuid: this.$route.query.platformuid,
      gameuid: this.$route.query.gameuid
    });
    this.$store.dispatch("user/getlikedgames");
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
    },
    isInCart() {
      return this.$store.getters["user/cart"].findIndex(
        product => {
          return product.game.uid == this.game.uid;
        }
      ) > -1;
    },
    liked() {
      return this.$store.getters["user/likedGames"].findIndex(
        likedGame => {
          return likedGame == this.game.uid;
        }
      ) > -1;
    }
  },
  methods:{
    addToCart(){
      this.$store.dispatch("user/addToCart",this.game);
    },
    like(likevalue){
      this.$store.dispatch("user/likegame",{game:this.game,like:likevalue})
      .then(()=>{
        this.$store.dispatch("user/getlikedgames");
        this.$store.dispatch("game/fetch", {
          platformuid: this.$route.query.platformuid,
          gameuid: this.$route.query.gameuid
        });
      });
    }
  }
};
</script>
