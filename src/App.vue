<template>
  <div id="app">
    <NavigationBar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signIn">Sign in</router-link>
    </div> -->
    <router-view class="body"/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  border: 1px solid #111;
  min-height: 150vh;
}

/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */

.body {
  /* border: 1px solid red; */
  padding: 30px 0;
  width: 100%;
}
@media only screen and (orientation: landscape) {
  #app {
    /* body does not overlap navigationBar */
    display: flex;
  }
}
</style>
