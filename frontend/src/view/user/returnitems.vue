<template>
<div class="container">
  <br>
  <h2>Return an item</h2>
  <br>
  <h3>Select which items you wish to return (use the ctrl key to select more than one)</h3>
  <select class="custom-select form-group" v-model="selectedItems" multiple>
    <option class="list-group-item" v-for="product in order.products" :value="product.game.uid">
      <span>Game Title: {{product.game.name}}</span></br>
      <span>Subtotal: ${{product.game.price}}</span></br>
    </option>
    <br/>
  </select>
  <button class="btn btn-secondary" @click="returnItems()">Return items</button>
</div>
</template>
<script>
export default {
  data() {
    return { selectedItems: [] };
  },
  computed: {
    order() {
      let order = this.$store.getters["user/orders"][
        this.$store.getters["user/selectedOrder"]
      ];
      return order ? order : { total: 0 };
    }
  },
  created() {
    this.$store.dispatch("user/getorders");
  },
  methods: {
    returnItems() {
      console.log(this.selectedItems);
    }
  }
};
</script>
