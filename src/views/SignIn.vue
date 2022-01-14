<template>
  <div class="signIn">
    <h1>Sign in</h1>
    <div class="error-div" v-if="eMsg">
      {{ eMsg }}
    </div>
    <form @submit.prevent="signIn()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="Email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Sign in
      </button>
    </form>
    <div class="singup-link-div">
      Don't have an account?
      <router-link to="/signUp">Sign up</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Auth } from "@/services";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      eMsg: ""
    };
  },
  methods: {
    async signIn() {
      let success = await Auth.signIn(this.email, this.password);
      console.log("rezultat prijave", success)



      if( success == true ){
        await this.$router.push({ name: 'Stats' })
        window.location.reload()
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
  margin: auto;
  padding: 1em;
}
label {
  font-size: small;
}
.singup-link-div {
  font-size: smaller;
  padding: 1em;
}
</style>
