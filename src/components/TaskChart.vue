<template>
  <div class="task-chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { Tasks, TaskSessions, Auth } from "@/services";

export default {
  name: "TaskChart",
  data() {
    return {
      labels: Array,
      da: [],
      map2: new Map(),
      ds: [
        {
          label: "minutes invested in each task",
          data: this.da,
          backgroundColor: [],
          borderColor: [],
        },
      ],
      options: [],
    };
  },
  async mounted() {
    await this.getOptions();
    await this.getLabels2();

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
    async getLabels2() {
      let l = [];
      let r = await Tasks.getAll(Auth.getUser().username);

      /* console.log(r) */

      this.da = r;

      r.forEach((element) => {
        /* console.log("element: ", element) */
        l.push(element.name);
        this.map2.set(element.name);
      });

      this.labels = l;

      /* console.log("this.map", this.map2) */
    },
    async getValues() {
      let data = [];
      let i = 0;
      /* console.log("this.optione: ", this.options) */
      let r = await TaskSessions.getAllForChart(this.options);

      /* console.log("r: ", r) */

      /* console.log("r: ", r)

      console.log("da: ", this.da) */

      r.forEach((element) => {
        /* console.log("wtf")
          console.log("element: ", element) */

        /* console.log("this.map.kezs ", this.map2) */
        /* console.log("element: ", element) */
        /* element.data.forEach((j) => { */

        for (let key of this.map2.keys()) {
          i = 0;
          /* console.log("key: ", key)
          console.log("element.data: ", element.data) */
          /* console.log(element); */

          /* console.log("2") */
          if (key == element.name && element.isRest == false) {
            this.map2.get(key) === undefined
              ? (i = 0)
              : (i = this.map2.get(key));
            /* console.log(j)
                console.log("j.minutes: ", j.minutes) */
            i += element.minutes;
            this.map2.set(key, i);
          }
        }
        /* }); */
      });

      /* console.log("this.map2: ", this.map2) */

      for (const value of this.map2.values()) {
        /* console.log("value :", value); */
        data.push(value);
      }

      this.da = data;
      /* console.log("this.da: ", this.da) */
    },
    async getOptions() {
      let o = await Tasks.getAll(Auth.getUser().username);
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