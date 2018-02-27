<template>
  <div>
    <form @submit.prevent="submit">
      <div>
      <label for="title">Game Title:
        <input type="text" class="form-control" v-model="game.name">
      </label>
      </div>
      <div>
      <label for="title">Price:
        <input type="number" class="form-control" v-model="game.price">
      </label>
      </div>
      <div>
      <label for="title">Game Rating (from 0 to 1):
        <input type="number" class="form-control" v-model="game.rating">
      </label>
      </div>
      <div>
      <label for="title">Quantity in Stock:
        <input type="number" class="form-control" v-model="game.qty">
      </label>
      </div>
      <input type="submit" value="Save">
    </form>
  </div>
</template>
<script>
export default {
  data(){
    let selectedGame = this.$store.getters["game/selectedGame"];
    let selectedPlatform = this.$store.getters["platform/selectedPlatform"];    
    return {
      game:(this.$route.query.action=="edit"?selectedGame:{
        platform:selectedPlatform.uid
      })
    }
  },
  methods:{
    submit(){
      console.log(this.game);
      this.$store.dispatch("game/save",this.game);
      this.$router.push("/admin");
    }
  }
}
</script>
