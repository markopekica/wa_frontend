<template>
  <div id="app">
    <NavigationBar :authenticated="authenticated"/>
    <router-view class="body"/>
  </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'
import { Auth } from "@/services";


export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data() {
    return {
      ...Auth.state,
    }
  },
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
.body {
  padding: 30px 0;
  width: 100%;
}
@media only screen and (orientation: landscape) {
  #app {
    display: flex;
  }
}
</style>
