<template>
  <div class="nav">
    <div class="logo">
      <i class="bi bi-triangle"></i>
    </div>
    <div class="menu">
      <router-link class="rlink" to="/activity">
        <i class="bi bi-list-task"></i
      ></router-link>
      <router-link class="rlink" to="/about"
        ><i class="bi bi-stopwatch"></i
      ></router-link>
      <router-link class="rlink" to="/">
        <i class="bi bi-graph-up"></i>
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
.nav {
  border-right: 1px solid #111;
  float: left;
  min-height: 100vh;
  width: 42px;
  position: fixed;
  padding: 0.5em;
  /* background-color: #111;
    color: ghostwhite; */
}
.logo {
    padding: .5em;
  margin-bottom: 2em;
  /* border: 1px solid green; */
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rlink {
    /* invisible border stops jumping in case a border appears on hover */
  border: 1px solid white;
  padding: 0.5em;
  margin: 0.5em;
  max-width: 32px;
}
.rlink:hover {
  /* cursor: pointer; */
  border: 1px solid pink;
  border-radius: 6px;
}
</style>
