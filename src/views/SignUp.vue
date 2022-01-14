<template>
  <div class="signUp">
    <h1>Create an account</h1>
    <form @submit.prevent="signUp">
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailInput"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="mb-3">
        <label for="repeatPassword" class="form-label">Repeat password</label>
        <input
          type="password"
          class="form-control"
          id="repeatPassword"
          placeholder="Repeat password"
          v-model="repeatPassword"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
    <div class="singup-link-div">
      Have an account?
      <router-link to="/signIn">Sign in</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Auth } from "@/services";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async signUp() {
      let success = await Auth.signUp(
        this.email,
        this.password,
        this.repeatPassword
      );
      console.log("rezultat registracije", success);

      if (success == true) {
        let ok = await Auth.signIn(this.email, this.password);
        if (ok) {
          await this.$router.push({ name: "Stats" });
          window.location.reload();
        }
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