<template>
<div class="container" :class="{printcontainer:printing}">
  <br>
  <h2>Return an item</h2>
  <br>
  <h3 v-if="!returncode">Select which items you wish to return (use the ctrl key to select more than one)</h3>
  <select v-if="!returncode" class="custom-select form-group" v-model="selectedItems" multiple>
    <option class="list-group-item" v-for="product in order.products" :value="product.game.uid">
      <span>Game Title: {{product.game.name}}</span></br>
      <span>Subtotal: ${{product.game.price}}</span></br>
    </option>
    <br/>
  </select>
  <button v-if="!returncode" class="btn btn-secondary" @click="returnItems()">Return items</button>
  <div v-else>
  <button class="btn btn-secondary" @click="printing = true;">Show QR Code for Printing</button>
  <button class="btn btn-secondary" @click="$router.go(-1)">Done</button>
  </div>
  <!-- Modal -->
  <div class="modal fade" :class="{show: printing, printelement: printing}" id="itemreturnModal" tabindex="-1" role="dialog" aria-labelledby="itemreturnModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="itemreturnModalLabel">Your return code</h5>
          <button type="button" class="close" @click="donePrinting" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Please print the QR code below and stick it on the box you use for returning the item(s)
          <div v-html="returncode" align="middle"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="print">Print</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      selectedItems: [],
      printing: false,
      returncode: ""
    };
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
      this.$store
        .dispatch("user/requestreturn", {
          ordernumber: this.order.uid,
          games: this.selectedItems
        })
        .then(qrcodeImage => {
          console.log(qrcodeImage);
          this.printing = true;
          this.returncode = qrcodeImage;
        });
    },
    print() {
      window.print();
    },
    donePrinting(){
      this.printing=false;
    }
  }
};
</script>
