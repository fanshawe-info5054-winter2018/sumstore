<template>
<form class="container">
  <br>
  <h2>Cart</h2>
  <br>

  <div v-if="cart.length">
    <table class="table">
      <thead class="thead-light">
      <tr><th>Product</th><th>Price</th><th></th></tr>
      </thead>
      <tr v-for="product in cart">
        <td>{{product.game.name}}</td>
        <td>${{product.game.price}}</td>
        <td align="right"><button class="btn" @click="removeFromCart(product.game)">Remove</button></td>
      </tr>
    </table>
    <button class="btn btn-success">Checkout</button>
  </div>
  <div v-else>
    <h1>Oh no, your cart is empty!</h1>
    <router-link class="btn btn-primary" :to="{ path: '/'}">Here, go get some games!</router-link>
  </div>
</form>
</template>
<script>
export default {
  computed:{
    cart(){
      return this.$store.getters["user/cart"];
    }
  },
  methods:{
    removeFromCart(game){
      this.$store.dispatch("user/removeFromCart",game);
    }
  }
};
</script>
