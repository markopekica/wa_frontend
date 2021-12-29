<template>
  <div class="stats">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>stats!</h1>

    <BarChart />
    <br /><br />

    <PlanetChart />
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
import PlanetChart from "@/components/PlanetChart.vue";
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Stats",
  components: {
    PlanetChart,
    BarChart,
  },
};
</script>