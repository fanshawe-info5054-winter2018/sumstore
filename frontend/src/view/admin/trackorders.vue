<template>
<form class="container">
  <br>
  <h2>Orders</h2>
  <br>

  <h3>Order History</h3>

  <table id="OrdersTable" class="table">
    <thead class="thead-light">
    <tr><th>Order Number</th><th>Customer Name</th><th>Date</th><th>Status</th><th>Tracking Number</th><th>Order Total</th></tr>
    </thead>
    <tr v-for="(order,index) in orders" @click="orderDetails(index)">
      <td>{{order.uid}}</td>
      <td>{{order.payment.ccname}}</td>
      <td>{{order.date.getMonth()+1}}.{{order.date.getDate()}}.{{order.date.getFullYear()}}</td>
      <td>{{order.status}}</td>
      <td>{{order.tracking}}</td>
      <td>${{order.total.toFixed(2)}}</td>
    </tr>
  </table>
</form>
</template>
<script>
export default {
  computed:{
    orders(){
      return this.$store.getters["user/orders"];
    },
  },
  created(){
    this.$store.dispatch("user/getallorders");
  },
  methods:{
    orderDetails(order){
      this.$store.dispatch('user/selectOrder',order);
      this.$router.push({ path: '/user/orderdetails'});
    }
  }
};
</script>
