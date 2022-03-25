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
    <div class="edit" v-if="isEditTask">
      <div class="task-tags">
        <h4>edit</h4>
        <p>choose tags:</p>
        <ul>
          <!--- https://stackoverflow.com/questions/43797010/dynamic-value-checkbox-vuejs-2 -->
          <li v-for="tag in tags" v-bind:value="tag" v-bind:key="tag.name">
            <input
              type="checkbox"
              v-model="chosenTags"
              v-bind:value="tag"
              v-bind:key="tag.name"
            />
            {{ tag.name }}
          </li>
        </ul>

        <label for="">{{ tags.name }}</label>
      </div>
      <button type="button" v-on:click="cancelEdit()" class="btn btn-warning">
        Cancel
      </button>
      <button type="button" v-on:click="saveEdit()" class="btn btn-success">
        Save
      </button>
    </div>
    <div class="full-info" v-if="showFullInfo">
      <p>Added at: {{ formatDate(info.addedAt) }}</p>

      <button type="button" v-on:click="deleteTask()" class="btn btn-danger">
        Delete
      </button>
      <button type="button" v-on:click="editTask()" class="btn btn-warning">
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
      isEditTask: false,
      chosenTags: [],
    };
  },
  methods: {
    showHideCardInfo() {
      if (!this.isEditTask) {
        this.showFullInfo == false
          ? (this.showFullInfo = true)
          : (this.showFullInfo = false);
      }
    },
    deleteTask() {
      alert("delete");
    },
    editTask() {
      this.isEditTask = true;
    },
    cancelEdit() {
      this.isEditTask = false;
    },
    async saveEdit() {
      let l = [];
      this.chosenTags.forEach((e) => {
        l.push(e.name);
      });
      let task = {
        tags: l,
      };
      await Tasks.updateOne(this.info._id, task);
      window.location.reload();
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
.edit {
  box-shadow: 1px 1px 3px 0px #111;
  margin: 0.5em;
  padding: 0.75em 0;
  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    * {
      margin: 0.5em;
    }
  }
}
.full-info {
  text-align: left;
}
button {
  margin-right: 1em;
}
</style>
