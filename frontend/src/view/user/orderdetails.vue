<template>
<div class="container">
  <br>
  <h2>Order Details</h2>
  <br>
  <h3>Order status: {{order.status}}</h3>
  <ul>
    <li v-for="product in order.products">
      <span>{{product.game.name}}</span>
      <span>${{product.game.price}}</span>
    </li>
  </ul>
<!--put order total price here and maybe other details-->
</div>
</template>
<script>
export default {
  computed: {
    order() {
      return this.$store.getters["user/selectedOrder"];
    }
  },
  created() {
    this.$store.dispatch("user/getorders");
  }
};
</script>
