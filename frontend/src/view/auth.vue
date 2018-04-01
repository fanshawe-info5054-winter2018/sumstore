<template>
<div>
  <form @submit.prevent="submit">
      <div>
        <label for="username">User name:
          <input type="text" class="form-control" v-model="user.username" required>
        </label>
      </div>
      <div v-if="action == 'register'">
        <label for="email">Email:
          <input type="email" class="form-control" v-model="user.email" required>
        </label>
      </div>
      <div>
        <label for="password">Password:
          <input type="password" class="form-control" v-model="user.password" required>
        </label>
      </div>
      <input type="submit" class="btn btn-success" :value="action.charAt(0).toUpperCase() + action.slice(1)">
    </form>
</div>
</template>
<script>
export default {
  data() {
    return {
      user: { username: "", email: "", password: "" }
    };
  },
  computed: {
    action() {
      return this.$route.query.action;
    }
  },
  created() {
    console.log("auth", this.$route.query);
  },
  methods: {
    submit() {
      if (this.action == "login") {
        delete this.user.email;
        this.$store
          .dispatch("user/login", this.user)
          .then(() => {
            let loggedUser = JSON.parse(
              atob(this.$store.getters["user/user"].split(".")[1])
            );
            console.log(loggedUser);
            if (loggedUser.admin) {
              console.log("admin!!");

              this.$router.push("/admin");
            } else {
              this.$router.push("/user/orders");
            }
          })
          .catch(err => {
            alert("invalid username or password");
          });
      } else if (this.action == "register") {
        this.$store
          .dispatch("user/register", this.user)
          .then(() => {
            this.$router.push("/user/orders");
          })
          .catch(err => {
            alert("something went wrong: " + err.response.data);
          });
      }
    }
  }
};
</script>
