<template>
  <div class="bar-chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import store from "@/store.js";

export default {
  name: "Bar",
  data() {
    return {
      store,
      labels: Array,
      da: [],
    };
  },
  mounted() {
    this.getLabels();
    this.getValues();

    /* let labels = [];
    for (let i = 0; i < store.activity.length; i++) {
      console.log(store.activity[i].name);
      labels.push(store.activity[i].name);
    } */

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        /* labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], */
        labels: this.labels,
        datasets: [
          {
            label: "Total time forEach activity",
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
          y: {
            beginAtZero: true,
            padding: 25,
          },
        },
      },
    });
  },
  methods: {
    getLabels() {

      let l = [];
      this.store.activity.forEach(function (element) {

        l.push(element.name);

      });
      this.labels = l;

    },
    getValues() {

      let data = [];
      let i = 0;

      this.store.activity.forEach((el) => {

        i = 0;
        if (el.session) {

          el.session.forEach((e) => {
            i += e.minutes;
          });

          data.push(i);

        }

      });

      this.da = data;

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
  /* max-height: 100px; */
  margin: auto;
  /* border: 1px solid red; */
}
</style>