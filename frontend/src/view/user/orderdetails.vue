<template>
<div class="container">
  <br>
  <h2>Order Details</h2>
  <br>
  <h3>Order Number: {{order.number}}</h3>
  <h4>Status: <span class="badge badge-info">{{order.status}}</span></h4>
  <div class="clearfix">
    <h4 class="float-left">Tracking #: {{order.tracking}}</h4>
    <h4 class= "float-right">Date Purchased: {{order.date}}</h4>
  </div>
  <ul class="list-group">
    <li class="list-group-item" v-for="product in order.products">
      <span>Game Title: {{product.game.name}}</span></br>
      <span>Subtotal: ${{product.game.price}}</span></br>
      <span>Total: ${{order.price}}</span></br>
    </li>
  </ul>
  <br/>
  <button v-if="order.status == 'Placed'" class="btn btn-danger" @click="cancelOrder()">Cancel Order</button>
</div>
</template>
<script>
export default {
  computed: {
    order() {
      return this.$store.getters["user/orders"][this.$store.getters["user/selectedOrder"]];
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
    }
  }
};
</script>
