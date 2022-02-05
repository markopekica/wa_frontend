<template>
  <div class="bar-chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { Activities, Sessions, Auth } from "@/services";

export default {
  name: "Bar",
  data() {
    return {
      labels: Array,
      da: [],
      map: new Map(),
      ds: [
        {
          label: "Total focus time for each activity",
          data: this.da,
          backgroundColor: [],
          borderColor: [],
        }
      ],
      options: [],
    };
  },
  async mounted() {
    await this.getOptions();
    await this.getLabels();
    await this.getValues();

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        /* labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], */
        labels: this.labels,
        datasets: [
          {
            label: "Total time",
            data: this.da,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              padding: 25,
              ticks: {
                /* https://stackoverflow.com/questions/37922518/how-to-set-start-value-as-0-in-chartjs */
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
  methods: {
    async getLabels() {

      let l = [];
      let r = await Activities.getAll(Auth.getUser().username);

      r.forEach((element) => {
        l.push(element.name);
        this.map.set(element.name);
      });

      this.labels = l;

    },
    async getValues() {

      let data = [];
      let i = 0;
      let r = await Sessions.getAll(this.options);

      r.forEach((element) => {
        for (let key of this.map.keys()) {
          i = 0;
          if (key == element.name && element.isRest == false) {
            this.map.get(key) === undefined ? (i = 0) : (i = this.map.get(key));
            i += element.minutes;
            this.map.set(key, i);
          }
        }
      });

      for (const value of this.map.values()) {
        data.push(value);
      }

      this.da = data;

    },
    async getOptions() {
      let o = await Activities.getAll(Auth.getUser().username);
      o.forEach((el) => this.options.push(el));
    },
  },
};
</script>
<style scoped>
canvas {
  max-width: 800px;
  height: auto;
  margin: auto;
}
.bar-chart {
  max-width: 800px;
  margin: auto;
}
</style>