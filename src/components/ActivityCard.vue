<template>
  <div class="activity-card" @click="showHideCardInfo" :style="thisStyle">
    <h3>{{ info.name }}</h3>
    <div class="full-info" v-if="showFullInfo">
      <p>Id: {{ info.id }}</p>
      <p>Added at: {{ info.addedAt }}</p>
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
import store from "@/store.js";

export default {
  name: "ActivityCard",
  props: ["info"],
  data() {
    return {
      showFullInfo: false,
      store,
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.activity-card {
  border: 1px solid lightgray;
  box-shadow: 1px 1px 3px 0px lightgray;
  border-radius: 6px;
  /* width: fit-content; */
  padding: 1em;
  margin: 1em;
  float: left;
}
.activity-card:hover {
  /* padding: 1.25em; */
  box-shadow: 1px 1px 3px 3px lightgray;
  cursor: pointer;
}
.full-info {
  text-align: left;
}
</style>
