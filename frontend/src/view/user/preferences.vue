<template>
  <form @submit.prevent="submit" class="container">
    <h2>Update Preferences</h2><br/>
    <h3>Change E-mail</h3>
    <div v-if="errors.length" class="alert alert-warning" role="alert">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div v-if="updates.length">
      <strong>The following settings were updated:</strong>
      <ul>
        <li v-for="update in updates">{{ update }}</li>
      </ul>
    </div>
    <div>
      <label for="email">Email:
        <input type="email" class="form-control" v-model="user_update.email">
      </label>
    </div>
    <div>
      <label for="email_confirmation">Confirm Email:
        <input type="email" class="form-control" v-model="user_update.email_confirmation" >
      </label>
    </div>
    <h3>Change Password</h3>

    <div>
      <label for="password">New Password:
        <input type="password" class="form-control" v-model="user_update.password" >
      </label>
    </div>
    <div>
      <label for="password_confirmation">Confirm New Password:
        <input type="password" class="form-control" v-model="user_update.password_confirmation" >
      </label>
    </div>
    <input type="submit" class="btn btn-success" value="Update preferences">
  </form>
</template>
<script>
    export default {
        data() {
            return {
                user_update: { email: "", email_confirmation: "", password: "", password_confirmation: "" },
                errors: [],
                updates: []
            };
        },
        computed: {
            // Fetch the current user from storage.
            user(){
                let loggedUser = this.$store.getters["user/user"];
                if(loggedUser){
                    return JSON.parse(atob(loggedUser.split('.')[1]));
                }
                return null;
            },
        },
        created() {
            // set the default value for email to the original one.
            this.user_update.email = this.user.email;
        },
        methods: {
            submit() {
                //Initialize variables for later use
                this.errors = [];
                let changes = false;
                this.updates =[];

                // Update the user object
                if(this.user_update.email != this.user.email && this.user_update.email != this.user_update.email_confirmation) {
                    this.errors.push("The email and confirmed email must be the same.");
                } else if(this.user_update.email == this.user_update.email_confirmation && this.user_update.email != ""){
                    this.user.email = this.user_update.email;
                    changes = true;
                    this.updates.push("e-mail address");
                }

                // Update the user object
                if(this.user_update.password != '' && this.user_update.password != this.user_update.password_confirmation) {
                    this.errors.push("The password and confirmed password must be the same.");
                } else if(this.user_update.password == this.user_update.password_confirmation && this.user_update.password != ''){
                    this.user.password = this.user_update.password;
                    changes = true;
                    this.updates.push("password");
                }

                // If there are no errors, push the user to the database.
                if(!this.errors.length && changes){
                    this.$store.dispatch("user/updatePreferences",this.user);
                    this.$router.push("/user/preferences");
                    this.user_update.email_confirmation = "";
                    this.user_update.password = "";
                    this.user_update.password_confirmation = "";
                }
                else{
                    this.updates = [];
                }

            }
        }
    };
</script>
