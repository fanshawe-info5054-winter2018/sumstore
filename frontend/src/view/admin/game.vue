<template>
  <div>
    <form @submit.prevent="submit">
      <div>
      <label for="title">Game Title:
        <input type="text" class="form-control" v-model="game.name" required>
      </label>
      </div>
      <div>
      <label for="title">Price:
        <input type="number" step="0.01" min="0" class="form-control" v-model="game.price" required>
      </label>
      </div>
      <div>
      <label for="title">Game Rating (from 0 to 1):
        <input type="number" step="0.01" min="0" max="1" class="form-control" v-model="game.rating" required>
      </label>
      </div>
      <div>
      <label for="title">Quantity in Stock:
        <input type="number" class="form-control" v-model="game.qty" required>
      </label>
      </div>
      <input type="submit" class="btn btn-success" value="Save">
      
      <!-- Button trigger modal -->
      <button v-if="$route.query.action == 'edit'" type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
        Delete
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Game</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to remove this game and all information contained in it?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove">Delete</button>
            </div>
          </div>
        </div>
      </div>
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
    },
    remove(){
      this.$store.dispatch("game/remove",this.game);
      this.$router.push("/admin");
    }
  }
}
</script>
