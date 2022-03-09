<template>
  <div class="task-card" @click="showHideCardInfo">
    <h3 :style="thisStyle">{{ info.name }}</h3>
    <span
      class="tags"
      v-for="tag in x"
      :value="tag.name"
      :key="tag.id"
      :color="tag.color"
      :style="{ color: tag.color }"
      >&nbsp;{{ tag.name }}&nbsp;</span
    >
    <div class="full-info" v-if="showFullInfo">
      <p>Added at: {{ formatDate(info.addedAt) }}</p>

      <button type="button" v-on:click="deleteTask()" class="btn btn-danger">
        Delete
      </button>
      <button type="button" v-on:click="patchTask()" class="btn btn-warning">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { Activities, Tasks, Auth } from "@/services/index.js";
export default {
  name: "TaskCard",
  props: ["info"],
  data() {
    return {
      showFullInfo: false,
      t: this.info.tags,
      tags: [],
      thisStyle: {
        /* https://stackoverflow.com/questions/53229804/how-to-change-style-of-background-color-using-vue-js-only */
        color: this.info.color,
      },
      color: "red",
      x: [],
    };
  },
  methods: {
    showHideCardInfo() {
      this.showFullInfo == false
        ? (this.showFullInfo = true)
        : (this.showFullInfo = false);
    },
    deleteTask() {
      alert("delete");
    },
    patchTask() {
      alert("patch");
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
  },
  computed: {
    async getTags() {
      let cards = await Activities.getAll(Auth.getUser().username);
      cards.forEach((card) => {
        if (card.userName == Auth.state.userEmail) {
          this.tags.push(card);
        }
      });
      this.tags.filter((id) => {
        if (this.t.includes(id.name)) {
          this.x.push(id);
        }
      });
    },
  },
  async mounted() {
    await this.getTags;
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
  max-width: 300px;
}
.activity-card:hover {
  box-shadow: 1px 1px 3px 3px lightgray;
  cursor: pointer;
}
.tags {
  margin: 1em auto;
  padding: 0.25em;
}
.full-info {
  text-align: left;
}
button {
  margin-right: 1em;
}
</style>
