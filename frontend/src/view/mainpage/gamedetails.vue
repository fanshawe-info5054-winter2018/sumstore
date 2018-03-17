<template>
<div>
  <!-- put game details html here -->
  <h1>Game Details</h1>
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
