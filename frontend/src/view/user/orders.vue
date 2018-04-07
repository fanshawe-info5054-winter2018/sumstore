<template>
<form class="container">
  <br>
  <h2>Orders</h2>
  <br>
  <!-- <label>Are you wondering where your order is?</label>

  <br>
  <label>Filter search by</label><br>
  <select name="orderStatus">
    <option value="allStatuses">[ All ]</option>
    <option value="processing">Processing</option>
    <option value="notProcessed">Not processed</option>
    <option value="orderedUnsent">Ordered, not Shipped</option>
    <option value="shipped">Shipped</option>
    <option value="cancelled">Cancelled</option>
  </select>
  <button type="button" class="btn btn-secondary">Apply Filter</button>
  <input type="search" class="form-control" id="mySearch" placeholder="Search through orders...">
  <button type="button" class="btn btn-secondary">Search</button>
  <br>
  <br> -->
  <h3>Order History</h3>

  <table id="OrdersTable" class="table">
    <thead class="thead-light">
    <tr><th>Order Number</th><th>Date</th><th>Status</th><th>Tracking Number</th><th>Order Total</th></tr>
    </thead>
    <tr v-for="order in orders" @click="orderDetails(order)">
      <td>{{order.uid}}</td>
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
    }
  },
  created(){
    this.$store.dispatch("user/getorders");
  },
  methods:{
    orderDetails(order){
      this.$store.dispatch('user/selectOrder',order);
      this.$router.push({ path: '/user/orderdetails'});
    }
  }
};
</script>
