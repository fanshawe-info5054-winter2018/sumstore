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
        <td><router-link :to="{ path: '/gamedetails', query: { gameuid: product.game.uid, platformuid: product.game.platform.uid }}">
          {{product.game.name}}
        </router-link>
        </td>
        <td align="right">${{product.game.price}}</td>
        <td align="right">
          <button class="btn" @click="removeFromCart(product.game)">Remove</button></td>
      </tr>
      <tfoot>
        <tr>
          <td>Subtotal:</td>
          <td align="right">${{subtotal.toFixed(2)}}</td>
        </tr>
      </tfoot>
    </table>
    <button class="btn btn-success" @click="gotocheckout()">Checkout</button>
  </div>
  <div v-else>
    <h1>Oh no, your cart is empty!</h1>
    <router-link class="btn btn-primary" :to="{ path: '/'}">Here, go get some games!</router-link>
  </div>
  <div v-if="similar.length">
    <br>
    <h3>Similar games you may like..</h3>
    <br>
    <ul class="list-group" v-once>
      <li class="list-group-item" v-for="game in similar">
        <router-link :to="{ path: '/gamedetails', query: { gameuid: game.uid, platformuid: game.platform.uid }}">
          <div>
            <h3>
              {{game.name}}
            </h3>
            platform: {{game.platform.name}}
          </div>
        </router-link>
      </li>
    </ul>
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
    },
    similar(){
      // Get the products in this order;
      let self = this;
      let products = this.cart;
      let productslist = [];
      let gamesList = [];
      products.forEach(function (product) {productslist.push(product.game);});
      self.$store.dispatch("game/similargames", productslist);
      gamesList = self.$store.getters["game/similarGames"];

      return gamesList;
    },
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
