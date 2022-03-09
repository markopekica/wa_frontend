<template>
  <div class="activity">
    <div class="tag-div">
      <h2>Tags</h2>
      <p>activities, skills, tools</p>
      <button
        type="button"
        class="btn btn-light"
        v-on:click="showNewActivityForm()"
        v-if="!this.displayNewActivityForm"
      >
        <small>Add new</small>
      </button>
      <form v-if="this.displayNewActivityForm">
        <div class="mb-3">
          <input
            id="activityName"
            type="text"
            class="new-activity-input"
            placeholder="Skill/tool/activity name"
          />
        </div>
        <div class="mb-3">
          <span>Color: &nbsp;</span>
          <input id="activityColor" type="color" />
        </div>
        <button
          type="button"
          class="btn btn-warning"
          v-on:click="hideNewActivityForm()"
        >
          <small>Cancel</small>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="hideNewActivityForm(), saveActivity()"
        >
          <small>Add</small>
        </button>
      </form>
      <div class="activity-list">
        <div class="activities">
          <ActivityCard
            v-for="activity in tags"
            :key="activity.name"
            :info="activity"
          />
        </div>
      </div>
    </div>

<!-- <hr style="width:80%; margin:auto;"> -->

    <div class="task-div">
      <h2>Tasks</h2>
      <!-- <p><small>Can contain multiple tags</small></p> -->
      <button
        type="button"
        class="btn btn-light"
        v-on:click="showNewTaskForm()"
        v-if="!this.displayNewTaskForm"
      >
        Add new
      </button>
      <form class="task-form" v-if="this.displayNewTaskForm">
        <div class="mb-3">
          <input
            id="taskName"
            type="text"
            class="new-task-input"
            placeholder="Task name"
          />
        </div>
        <div class="mb-3">
          <span>Color: &nbsp;</span>
          <input id="taskColor" type="color" />
        </div>
        <div class="task-tags">
          <p>tags:</p>
          <ul>
            <!-- https://stackoverflow.com/questions/43797010/dynamic-value-checkbox-vuejs-2 -->
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
        <button
          type="button"
          class="btn btn-warning"
          v-on:click="hideNewTaskForm()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="hideNewTaskForm(), saveTask()"
        >
          Add
        </button>
      </form>
      <div class="task-list">
        <div class="tasks">
          <TaskCard v-for="task in tasks" :key="task.name" :info="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityCard from "@/components/ActivityCard.vue";
import { Activities, Tasks, Auth } from "@/services/index.js";
import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "Activity",
  components: {
    ActivityCard,
    TaskCard,
  },
  data() {
    return {
      displayNewActivityForm: false,
      tags: [],
      tasks: [],
      displayNewTaskForm: false,
      chosenTags: []
    };
  },
  methods: {
    saveActivity: function () {
      let activity = {
        name: document.getElementById("activityName").value,
        color: document.getElementById("activityColor").value,
        userName: Auth.getUser().username,
      };
      if (activity.name != "") {
        Activities.create(activity).then(() => {
          window.location.reload();
        });
      }
    },
    hideNewActivityForm() {
      return (this.displayNewActivityForm = false);
    },
    showNewActivityForm() {
      return (this.displayNewActivityForm = true);
    },
    hideNewTaskForm() {
      return (this.displayNewTaskForm = false);
    },
    showNewTaskForm() {
      this.chosenTags = []
      return (this.displayNewTaskForm = true);
    },
    saveTask() {
      let task = {
        name: document.getElementById("taskName").value,
        color: document.getElementById("taskColor").value,
        userName: Auth.getUser().username,
        tags: this.chosenTags
      };
      if (task.name != "") {
        Tasks.create(task).then(() => {
          window.location.reload();
        });
      }
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
    },
    async getTasks() {
      let t = await Tasks.getAll(Auth.getUser().username);
      t.forEach((e) => {
        if (e.userName == Auth.state.userEmail) {
          this.tasks.push(e);
        }
      });
    },
  },
  async mounted() {
    await this.getTags;
    await this.getTasks;
  },
};
</script>

<style lang="scss" scoped>
.activity {
  display: flex;
  flex-direction: column;
}
h1,
h2 {
  font-size: 24px;
}
.btn {
  border-radius: 6px;
  border: 1px solid rgba(17, 17, 17, 0.427);
  margin: 0.2em 0.75em;
}
.btn:hover {
  box-shadow: 1px 1px 1px 0px #111;
}
.tag-div {
  /* box-shadow: 1px 1px 1px grey; */
  padding: 1em 0;
}
form {
  border: 1px solid lightgray;
  box-shadow: 2px 2px 3px 2px lightgrey;
  border-radius: 6px;
  width: fit-content;
  margin: auto;
  padding: 1em 0.75em;
}
#activityName {
  border: 1px solid lightgray;
  border-radius: 6px;
}
#newActivity {
  border: none;
  border-bottom: 1px solid lightgray;
}
.mb-3 {
  display: flex;
  /* flex-direction: column; */
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
}
.activity-list {
  padding: 1em;
  margin: auto;
  display: flex;
  justify-content: center;
}

.task-div {
  /* border: 1px solid red; */
  padding: 1em 0;
  /* box-shadow: 1px 1px 1px pink; */
}
.task-tags {
  text-align: left;
  ul {
  list-style-type: none;
 }
}
.group-div {
  padding: 1em 0;
}
</style>