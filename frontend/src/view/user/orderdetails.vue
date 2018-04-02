<template>
<div class="container">
  <br>
  <h2>Order Details</h2>
  <br>
  <h3>Order status: {{order.status}}</h3>
  <ul>
    <li v-for="product in order.products">
      <span>Order Number: {{order.number}}</span></br>
      <span>Game Title: {{product.game.name}}</span></br>
      <span>Subtotal: ${{product.game.price}}</span></br>
      <span>Total: ${{order.price}}</span></br>
      <span>Date Purchased: {{order.date}}</span></br>
      <span>Tracking #: {{order.tracking}}</span>
    </li>
  </ul>
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
