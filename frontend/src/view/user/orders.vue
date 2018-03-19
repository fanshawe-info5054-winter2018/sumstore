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
    <tr><th>Order Number</th><th>Date</th><th>Status</th><th>Tracking Number</th><th>Order Sum</th></tr>
    </thead>
    <tr><td>66636537</td><td>03.03.18</td><td>Processing</td><td>0123456789101112</td><td>$ 39.99</td></tr>
    <tr><td>66123123</td><td>03.03.18</td><td>cancelled</td><td>0123456789101112</td><td>$ 39.99</td></tr>
    <tr><td>66639876</td><td>01.09.18</td><td>OrderUnsent</td><td>0123456789101112</td><td>$ 9.99</td></tr>
    <tr><td>65776087</td><td>01.03.18</td><td>shipped</td><td>0123456789101112</td><td>$ 4.99</td></tr>
    <tr><td>65636539</td><td>02.03.18</td><td>shipped</td><td>0123456789101112</td><td>$ 79.98</td></tr>
    <tr><td>63689510</td><td>12.03.17</td><td>shipped</td><td>0123456789101112</td><td>$ 39.99</td></tr>
    <tr><td>63646599</td><td>05.07.17</td><td>shipped</td><td>0123456789101112</td><td>$ 39.99</td></tr>
    <tr><td>62156715</td><td>27.03.17</td><td>shipped</td><td>0123456789101112</td><td>$ 39.99</td></tr>
  </table>
</form>
</template>
<script>
export default {
  name:"orders"
};
</script>
