<template>
<form class="container" @submit.prevent="performcheckout">
  <br>
  <h2>Checkout</h2>
  <br>
  <div v-if="cart.length">
    <div v-if="!user.length" class="form-group">
      <label for="email">Email:
        <input type="text" class="form-control" v-model="address.email" required>
      </label>
    </div>
    <div class="row">
      <div class="col-md">
        <h4>Shipping Information</h4>
        <div>
          <label for="street">Street Address:
            <input type="text" class="form-control" v-model="address.street" required>
          </label>
        </div>
        <div>
          <label for="city">City:
            <input type="text" class="form-control" v-model="address.city" required>
          </label>
        </div>
        <div>
          <label for="province">Province:
            <input type="text" class="form-control" v-model="address.province" required>
          </label>
        </div>
      </div>
      <div class="col-md">
      <h4>Payment Information</h4>
      <div>
        <label for="street">Credit Card Name:
          <input type="text" class="form-control" v-model="payment.ccname" required>
        </label>
      </div>
      <div>
        <label for="city">Credit Card#:
          <input type="text" class="form-control" v-model="payment.ccnumber" required>
        </label>
      </div>
      <div>
        <label for="province">Security number:
          <input type="text" class="form-control" v-model="payment.cvc" required>
        </label>
      </div>
    </div>
    </div>
    <br/>
    <table class="table">
      <tr>
        <td>Subtotal:</td>
        <td align="right">${{subtotal.toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Shipping & Handling:</td>
        <td align="right">${{shipping.toFixed(2)}}</td>
      </tr>
    </table>
    <div class="clearfix">
      <h4 class="float-left">Total:</h4>
      <h4 class="float-right">${{total.toFixed(2)}}</h4>
    </div>
    <input type="submit" class="btn btn-success float-right" value="Place Order"/>
  </div>
  <div v-else>
    <h1>Hey, you shouldn't be here, your cart is empty!</h1>
    <router-link class="btn btn-primary" :to="{ path: '/'}">Here, go get some games!</router-link>
  </div>
</form>
</template>
<script>
export default {
  data() {
    return {
      address: {
        street: "",
        city: "",
        province: "",
        email:""
      },
      payment: {
        ccnumber: "",
        ccname: "",
        cvc: ""
      }
    };
  },
  computed: {
    user(){
      return this.$store.getters["user/user"];
    },
    cart() {
      return this.$store.getters["user/cart"];
    },
    subtotal() {
      let subtotal = 0;
      this.cart.forEach(product => {
        if(product.game){
          subtotal += parseFloat(product.game.price);
        }
      });
      return subtotal;
    },
    shipping() {
      return this.$store.getters["user/shipping"];
    },
    total() {
      let total = this.subtotal + this.shipping;
      return total;
    }
  },
  methods: {
    performcheckout() {
      this.$store
        .dispatch("user/checkout", {
          address: this.address,
          payment: this.payment,
          total: this.total
        })
        .then(() => {
          this.address = {
            street: "",
            city: "",
            province: ""
          };
          this.payment = {
            ccnumber: "",
            ccname: "",
            cvc: ""
          };
          this.$store.dispatch("user/clearCart");
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>
