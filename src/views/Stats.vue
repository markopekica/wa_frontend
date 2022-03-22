<template>
  <div class="stats">
    <h1>stats!</h1>
    <div>
      <input
        type="radio"
        id="tag"
        name="choose"
        value="tag"
        v-model="tag"
        v-on:click="m()"
      />
      <label for="tag">tag</label>
    </div>

    <div>
      <input
        type="radio"
        id="task"
        name="choose"
        value="task"
        v-model="task"
        v-on:click="m()"
      />
      <label for="task">task</label>
    </div>

    <br />

    <BarChart v-if="tag" />

    <TaskChart v-if="task" />
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import TaskChart from "@/components/TaskChart.vue";

export default {
  name: "Stats",
  components: {
    TaskChart,
    BarChart,
  },
  data() {
    return {
      task: null,
      tag: "tag",
    };
  },
  methods: {
    ref() {
      window.location.reload();
    },
    m() {
      if (this.task != null) {
        this.task = null;
      }
      if (this.tag != null) {
        this.tag = null;
      }
    },
  },
};
</script>