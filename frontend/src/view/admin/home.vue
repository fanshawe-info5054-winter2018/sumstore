<template>
<div>
  <ul class="list-group">
    <li class="list-group-item" v-for="platform in platformlist">
      <h3>
        {{platform.name}}
      </h3>
      games: 
      <ul class="list-group">
        <li class="list-group-item" v-for="game in platform.games" @click="editGame(game)">
          Title: {{game.name}}<br/>
          Price: {{game.price}}<br/>
          Rating: {{game.rating}}<br/>
          Quantity in Stock: {{game.qty}}<br/>
        </li>
      </ul>
      <button class="btn btn-secondary" @click="addGame(platform)">Add a Game</button>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  computed:{
    platformlist(){
      return this.$store.getters["platform/platforms"];
    }
  },
  methods:{
    editGame(game){
      this.$store.dispatch('game/select',game);
      this.$router.push({ path: '/admin/game', query: { action: 'edit' }});
    },
    addGame(platform){
      this.$store.dispatch('platform/select',platform);
      this.$router.push({ path: '/admin/game', query: { action: 'new' }});
    }
  },
  created(){
    this.$store.dispatch("platform/list");
    this.$store.dispatch("game/listall");
  }
}
</script>
