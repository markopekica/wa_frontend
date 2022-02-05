<template>
  <div class="stats">

    <h1>stats!</h1>

    <BarChart />

  </div>
</template>

<script>
/* import PlanetChart from "@/components/PlanetChart.vue"; */
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Stats",
  components: {
    /* PlanetChart, */
    BarChart,
  },
};
</script>