<template>
  <div class="planet-chart">
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { Activities, Sessions } from "@/services";

export default {
  name: "PlanetChart",
  data() {
    return {
      /* store, */
      /* planetChartData: planetChartData, */
      dataSets: [],
      dataSet: {
        label: "",
        data: [],
        backgroundColor: String,
        borderColor: String,
        borderWidth: 1,
      },
    };
  },
  async mounted() {
    await this.makeDatasets();
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
    async makeDatasets() {
      let activities = await Activities.getAll();
      let sessions = await Sessions.getAll();

      activities.data.forEach((el) => {
        this.dataSet = [];
        this.dataSet.data = [];

        this.dataSet.label = el.name;
        this.dataSet.backgroundColor = el.color;
        this.dataSet.borderColor = el.color;

        sessions.data.forEach((el2) => {
          if (el.name == el2.name) {
            this.dataSet.data.push(el2.minutes);
          }
        });

        this.dataSets.push(this.dataSet);
      });
    },
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