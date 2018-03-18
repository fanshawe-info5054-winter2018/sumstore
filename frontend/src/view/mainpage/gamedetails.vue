<template>
<div>
  <!-- put game details html here -->
  <h1>Game Details</h1>
          <h3>
            {{game.name}}
          </h3>
          platform: {{game.platform.name}}
          price: {{game.price}}
          rating: {{game.rating}}
          qty: {{game.qty}}

</div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch("game/fetch",{platformuid:this.$route.query.platformuid,gameuid:this.$route.query.gameuid});
  },
  computed:{
    game(){
      return this.$store.getters["game/selectedGame"];
    }
  }
}
</script>
