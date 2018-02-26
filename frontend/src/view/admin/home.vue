<template>
<div>
  <ul>
    <li v-for="platform in platformlist">
      <h3>
        {{platform.name}}
      </h3>
      games: 
      <ul>
        <li v-for="game in platform.games" @click="editGame(game)">
          Title: {{game.name}}<br/>
          Price: {{game.price}}<br/>
          Rate: {{game.rate}}<br/>
          Quantity in Stock: {{game.qty}}<br/>
        </li>
      </ul>
      <button @click="addGame(platform)">Add a Game</button>
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
  }
}
</script>
