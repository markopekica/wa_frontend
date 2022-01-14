<template>
  <div class="nav">
    <div class="logo">
      <i class="bi bi-triangle"></i>
    </div>
    <div class="menu">
      <router-link class="rlink" to="/activity" title="activity list">
        <i class="bi bi-list-task"></i
      ></router-link>
      <router-link class="rlink" to="/clock" title="clock"
        ><i class="bi bi-stopwatch"></i
      ></router-link>
      <router-link class="rlink" to="/" title="stats">
        <!-- <i class="bi bi-graph-up"></i> -->
        <i class="bi bi-bar-chart"></i>
      </router-link>
    </div>
    <!-- other icons; sign out, info -->
    <div class="other-icons">
      <router-link class="rlink" to="/signIn" title="sign in" v-if="!authenticated"
        ><i class="bi bi-box-arrow-in-right"></i
      ></router-link>
      <router-link class="rlink" to="" title="sign out" v-if="authenticated">
        <i class="bi bi-box-arrow-left" @click="logout()"></i>
      </router-link>
      <router-link class="rlink" to="about" title="info">
        <i class="bi bi-info-circle"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Auth } from "@/services";

export default {
  name: "NavigationBar",
  props: ["authenticated"],
  /* data() {
    return {
      userExists: localStorage.getItem("user")
    }
  }, */
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.router-link-exact-active {
  color: #42b983 !important;
}
.rlink {
  /* invisible border stops jumping in case a border appears on hover */
  border: 1px solid white;
  color: #111;
  margin: 0.5em;
  max-width: 32px;
}
.rlink:hover {
  border: 1px solid lightgray;
  border-radius: 6px;
}
.bi-box-arrow-left{
  color: #2c3e50;
}
@media only screen and (orientation: portrait) {
  .nav {
    border-bottom: 1px solid lightgray;
    padding: 0.25em;
    div {
      line-height: 2.5em;
    }
  }
  .rlink {
    padding: 0.5em;
  }
  .logo {
    padding: 0 0.5em;
    width: 64px;
    box-shadow: 1px 0px 0px lightgray;
    margin-right: 0.5em;
  }
  .other-icons {
    box-shadow: -1px 0px 0px lightgray;
    margin-left: auto;
    margin-right: 0;
  }
}
@media only screen and (max-width: 340px) and (orientation: portrait) {
  .other-icons {
    margin-right: auto;
    margin-left: 0;
    box-shadow: none;
  }
}
@media only screen and (orientation: landscape) {
  .nav {
    border-right: 1px solid lightgray;
    /* float: left; */
    min-height: 100vh;
    /* width: fit-content; */
    /* position: fixed; */
    padding: 0.5em;
    display: flex;
    flex-direction: column;
  }
  .rlink {
    padding: 0.25em 0.5em;
  }
  .logo {
    padding: 0.5em;
    margin-bottom: 2em;
  }
  .menu,
  .other-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
  }
  .other-icons {
    box-shadow: 0px -1px 0px lightgray;
  }
}
</style>
