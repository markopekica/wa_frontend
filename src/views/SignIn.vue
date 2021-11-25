<template>
  <div class="signIn">
    <h1>Sign in</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    <div class="singup-link-div">
        Don't have an account?
        <router-link to="/signUp">Sign up</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SignIn",
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