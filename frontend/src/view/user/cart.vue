<template>
<form class="container">
  <br>
  <h2>Cart</h2>
  <br>

  <div v-if="cart.length">
    <table class="table">
      <thead class="thead-light">
      <tr><th class="col-sm">Product</th><th class="col-sm text-right">Price</th><th class="col-xs"></th></tr>
      </thead>
      <tr v-for="product in cart">
        <td>{{product.game.name}}</td>
        <td align="right">${{product.game.price}}</td>
        <td align="right"><button class="btn" @click="removeFromCart(product.game)">Remove</button></td>
      </tr>
      <tr>
        <td>Subtotal:</td>
        <td align="right">${{subtotal.toFixed(2)}}</td>
      </tr>
    </table>
    <button class="btn btn-success" @click="gotocheckout()">Checkout</button>
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
    },
    subtotal(){
      let subtotal = this.cart.length?this.cart.reduce((a, b)=>{
        return parseFloat(a.game.price) + parseFloat(b.game.price);
      }):0;
      subtotal = subtotal.game?parseFloat(subtotal.game.price):subtotal;
      return subtotal;
    }
  },
  methods:{
    removeFromCart(game){
      this.$store.dispatch("user/removeFromCart",game);
    },
    gotocheckout(){
      this.$router.push({ path: '/user/checkout'});
    }
  }
};
</script>
