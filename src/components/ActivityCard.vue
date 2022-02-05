<template>
  <div class="activity-card" @click="showHideCardInfo" :style="thisStyle">
    <h3>{{ info.name }}</h3>
    <div class="full-info" v-if="showFullInfo">
      <p>Added at: {{ formatDate(info.addedAt) }}</p>
      <button
        type="button"
        v-on:click="deleteActivity()"
        class="btn btn-danger"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",
  props: ["info"],
  data() {
    return {
      showFullInfo: false,
      thisStyle: {
        /* https://stackoverflow.com/questions/53229804/how-to-change-style-of-background-color-using-vue-js-only */
        color: this.info.color,
      },
    };
  },
  methods: {
    showHideCardInfo() {
      this.showFullInfo == false
        ? (this.showFullInfo = true)
        : (this.showFullInfo = false);
    },
    deleteActivity() {
      alert("delete");
    },
    formatDate(timestamp){
      /* https://stackoverflow.com/questions/13459866/javascript-change-date-into-format-of-dd-mm-yyyy */
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(timestamp)
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    },
  },
};
</script>

<style scoped lang="scss">
.activity-card {
  border: 1px solid lightgray;
  box-shadow: 1px 1px 3px 0px lightgray;
  border-radius: 6px;
  padding: 1em;
  margin: 1em;
  float: left;
}
.activity-card:hover {
  box-shadow: 1px 1px 3px 3px lightgray;
  cursor: pointer;
}
.full-info {
  text-align: left;
}
</style>
