<template>
  <router-view></router-view>
</template>
<script>
export default {
  name:"mainpage",
  created(){
    this.$store.dispatch("platform/list");
    this.$store.dispatch("game/listall");
  }
};
</script>
