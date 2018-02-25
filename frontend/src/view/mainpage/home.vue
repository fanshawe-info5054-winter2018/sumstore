<template>
<div>
  <ul>
    <li v-for="game in gamelist">
      <h3>
        {{game.name}}
      </h3>
      platform: {{game.platform.name}}
    </li>
  </ul>
  <router-link :to="{ path: '/auth', query: { action: 'login' }}">Login</router-link>
  <router-link :to="{ path: '/auth', query: { action: 'register' }}">Register</router-link>
</div>
</template>
<script>
export default {
  computed:{
    gamelist(){
      return this.$store.getters["game/games"];
    }
  }
}
</script>
