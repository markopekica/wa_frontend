<template>
  <div class="nav">
    <div class="logo">
      <i class="bi bi-triangle"></i>
    </div>
    <div class="menu">
      <router-link class="rlink" to="/activity" title="activity list">
        <i class="bi bi-list-task"></i
      ></router-link>
      <router-link class="rlink" to="/timer" title="timer"
        ><i class="bi bi-stopwatch"></i
      ></router-link>
      <router-link class="rlink" to="/" title="stats">
        <i class="bi bi-graph-up"></i>
      </router-link>
    </div>
    <!-- other icons; sign out, info -->
    <div class="other-icons">
      <router-link class="rlink" to="" title="sign out">
        <i class="bi bi-box-arrow-left"></i>
      </router-link>
      <router-link class="rlink" to="about" title="info">
        <i class="bi bi-info-circle"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rlink {
  /* invisible border stops jumping in case a border appears on hover */
  border: 1px solid white;
  padding: 0.5em;
  margin: 0.5em;
  max-width: 32px;
}
.rlink:hover {
  border: 1px solid pink;
  border-radius: 6px;
}
@media only screen and (orientation: portrait) {
  .nav {
    border-bottom: 1px solid #111;
    div {
      line-height: 2.5em;
    }
    display: flex;
    padding: 0.75em 0.25em;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5em;
    box-shadow: 1px 0px 0px lightgray;
    width: 25%;
  }
  .other-icons {
    box-shadow: -1px 0px 0px lightgray;
    width: 25%;
  }
}
@media only screen and (orientation: landscape) {
  .nav {
    border-right: 1px solid #111;
    float: left;
    min-height: 100vh;
    width: 42px;
    position: fixed;
    padding: 0.5em;
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
  }
  .other-icons {
    box-shadow: 0px -1px 0px lightgray;
  }
}
</style>
