<template>
  <div class="task-card" @click="showHideCardInfo">
    <h3 :style="thisStyle">{{ info.name }}</h3>
    <span class="tags">{{ info.tags }}</span>
    <!-- <div class="tags">
        {{ info.tags }}
      </div> -->
    <div class="full-info" v-if="showFullInfo">
      <p>Added at: {{ formatDate(info.addedAt) }}</p>

      <button type="button" v-on:click="deleteTask()" class="btn btn-danger">
        Delete
      </button>
      <button type="button" class="btn btn-warning">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["info"],
  data() {
    return {
      showFullInfo: false,
      tags: this.info.tags,
      thisStyle: {
        /* https://stackoverflow.com/questions/53229804/how-to-change-style-of-background-color-using-vue-js-only */
        color: this.info.color,
      },
    };
  },
  methods: {
    showHideCardInfo() {
      console.log("tags:", this.tags)
      this.showFullInfo == false
        ? (this.showFullInfo = true)
        : (this.showFullInfo = false);
    },
    deleteTask() {
      alert("delete");
    },
    formatDate(timestamp) {
      /* https://stackoverflow.com/questions/13459866/javascript-change-date-into-format-of-dd-mm-yyyy */
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(timestamp);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        "-"
      );
    },
    colorTags() {
      
    }
  },
};
</script>

<style scoped lang="scss">
.task-card {
  border: 1px solid lightgray;
  box-shadow: 1px 1px 3px 0px lightgray;
  border-radius: 6px;
  padding: 1em;
  margin: 1em auto;
  /* float: left; */
  max-width: 300px;
}
.activity-card:hover {
  box-shadow: 1px 1px 3px 3px lightgray;
  cursor: pointer;
}
.tags {
  margin: 1em auto;
}
.full-info {
  text-align: left;
}
button {
  margin-right: 1em;
}
</style>
