<template>
<div class="container">
  <br>
  <h2>Order Details</h2>
  <br>
  <h3>Order Number: {{order.uid}}</h3>
  <h4>Status: <span class="badge badge-info">{{order.status}}</span></h4>
  <div class="clearfix">
    <h4 class="float-left">Tracking #: {{order.tracking}}</h4>
    <h4 class= "float-right">Date Purchased: {{order.date}}</h4>
  </div>
  <ul class="list-group">
    <li class="list-group-item" v-for="product in order.products">
      <span>Game Title: {{product.game.name}}</span></br>
      <span>Subtotal: ${{product.game.price}}</span></br>
    </li>
  </ul>
      <span>Total: ${{order.total.toFixed(2)}}</span></br>
  <br/>
  <button v-if="order.status == 'Placed'" class="btn btn-danger" @click="cancelOrder()">Cancel Order</button>
  <button v-if="order.status != 'Cancelled'" class="btn btn-success" @click="buyAgain()">Get it Again</button>
</div>
</template>
<script>
export default {
  computed: {
    order() {
      let order = this.$store.getters["user/orders"][this.$store.getters["user/selectedOrder"]];
      return order?order:{total:0};
    }
  },
  created() {
    this.$store.dispatch("user/getorders");
  },
  methods:{
    cancelOrder(){
      this.$store.dispatch("user/cancelorder",this.order)
      .then(()=>{
        this.$store.dispatch("user/getorders");
      });
    },
    buyAgain(){
      this.order.products.forEach(product => {
        this.$store.dispatch("user/addToCart",product.game);
      });
      this.$router.push({ path: '/user/cart'});
    }
  }
};
</script>
