<template>
  <div class="signUp">
    <h1>Create an account</h1>
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
      <div class="mb-3">
        <label for="exampleInputPassword2" class="form-label">Repeat password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Repeat password"
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

export default {
  name: "SignUp",
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