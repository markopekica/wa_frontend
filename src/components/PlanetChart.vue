<template>
  <div class="planet-chart">
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import planetChartData from "../planet-data.js";
import store from "@/store.js";

export default {
  name: "PlanetChart",
  data() {
    return {
      store,
      planetChartData: planetChartData,
      dataSets: [],
      dataSet: {
        label: "",
        data: [],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "rgba(54,73,93,.5)",
        borderWidth: 1,
      },
    };
  },
  mounted() {
    this.makeDatasets();
    const ctx = document.getElementById("planet-chart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Mercury",
          "Venus",
          "Earth",
          "Mars",
          "Jupiter",
          "Saturn",
          "Uranus",
          "Neptune",
        ],
        datasets: this.dataSets /* [
          {
            label: "Number of Moons",
            data: [0, 0, 1, 2, 79, 82, 27, 14],
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
          },
          {
            label: "Planetary Mass (relative to the Sun x 10^-6)",
            data: [
              0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514,
            ],
            backgroundColor: "rgba(71, 183,132,.5)",
            borderColor: "#47b784",
            borderWidth: 3,
          },
          {
            label: "Critical Mass",
            data: [0.6, 0.081, 3.003, 0.323, 54.792, 25.886, 430.662, 1.514],
            backgroundColor: "rgba(71, 183,132,.5)",
            borderColor: "#32g724",
            borderWidth: 6,
          },
        ], */,
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                /* padding: 25 */
              },
            },
          ],
        },
      },
    });
  },
  methods: {
    makeDatasets() {
      
      

      this.store.activity.forEach((el) => {

      this.dataSet = []
      this.dataSet.data = []

        console.log(el.name);
        this.dataSet.label = el.name;
        this.dataSet.backgroundColor = el.color;
        this.dataSet.borderColor = el.color;
        /* console.log(this.dataSets.push(el)) */

        el.session.forEach((e) => {
          console.log(e.minutes)
          this.dataSet.data.push(e.minutes);
        });

        this.dataSets.push(this.dataSet);
        console.log(this.dataSet)
        console.log(this.dataSets)
        
      });
      /* console.log(this.dataSets) */
    },
    async getData() {},
  },
};
</script>
<style scoped>
canvas {
  margin: auto;
}
.planet-chart {
  /* border: 1px solid red; */
  margin: auto;
  max-width: 800px;
}
</style>