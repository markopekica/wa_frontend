<template>
  <div class="nav">
    <router-link class="rlink logo" to="about" title="info">
      <i class="bi bi-box"></i>
    </router-link>
    <div class="menu">
      <router-link class="rlink" to="/activity" title="activities/tasks">
        <i class="bi bi-diagram-3"></i>
      </router-link>

      <router-link class="rlink" to="/clock" title="timer"
        ><i class="bi bi-stopwatch"></i
      ></router-link>
      <router-link class="rlink" to="/" title="stats">
        <i class="bi bi-bar-chart"></i>
      </router-link>
    </div>
    <div class="other-icons">
      <router-link
        class="rlink"
        to="/signIn"
        title="sign in"
        v-if="!authenticated"
        ><i class="bi bi-box-arrow-in-right"></i
      ></router-link>
      <router-link
        class="rlink"
        to="/options"
        title="options"
        v-if="authenticated"
      >
        <i class="bi bi-gear"></i>
      </router-link>
      <router-link class="rlink" to="" title="sign out" v-if="authenticated">
        <i class="bi bi-box-arrow-left" @click="logout()"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Auth } from "@/services";

export default {
  name: "NavigationBar",
  props: ["authenticated"],
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
  },
};
</script>

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
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25em;
}
.rlink:hover {
  border: 1px solid lightgray;
  border-radius: 6px;
}
.bi-box-arrow-left {
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
    margin-right: 0.5em;
  }
  .other-icons {
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
    min-height: 100vh;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rlink {
    padding: 0.25em 0.5em;
  }
  .logo {
    margin-bottom: 1em;
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
