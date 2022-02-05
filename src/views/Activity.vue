<template>
  <div class="activity">
    <button
      type="button"
      class="btn btn-primary"
      v-on:click="showNewActivityForm()"
      v-if="!this.displayNewActivityForm"
    >
      Add new activity
    </button>
    <form v-if="this.displayNewActivityForm">
      <div class="mb-3">
        <input
          id="activityName"
          type="text"
          class="new-activity-input"
          placeholder="New activity name"
        />
      </div>
      <div class="mb-3">
        <label for="newActivity" class="form-label">Pick a color</label>
        <input id="activityColor" type="color" />
      </div>
      <button
        type="button"
        class="btn btn-warning"
        v-on:click="hideNewActivityForm()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="hideNewActivityForm(), saveActivity()"
      >
        Add
      </button>
    </form>
    <div class="activity-list">
      <h2>My activities</h2>
      <div class="activities">
        <ActivityCard
          v-for="activity in cards"
          :key="activity.name"
          :info="activity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ActivityCard from "@/components/ActivityCard.vue";
import { Activities, Auth } from '@/services/index.js'

export default {
  name: "Activity",
  components: {
    ActivityCard,
  },
  data() {
    return {
      displayNewActivityForm: false,
      cards: [],
    };
  },
  methods: {
    saveActivity: function () {
      let activity = {
        name: document.getElementById('activityName').value,
        color: document.getElementById('activityColor').value,
        userName: Auth.getUser().username
      }
      Activities.create( activity )
      .then( ( ) => {
        window.location.reload()
      })
    },
    hideNewActivityForm() {
      return (this.displayNewActivityForm = false);
    },
    showNewActivityForm() {
      return (this.displayNewActivityForm = true);
    },
  },
  computed: {
    async getCards() {
      let cards = await Activities.getAll(Auth.getUser().username)
      cards.forEach( card => {
        if(card.userName == Auth.state.userEmail){
          this.cards.push(card)
        }
      })
    },
  },
  async mounted() {
    await this.getCards
  }
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  font-size: 24px;
}
.btn {
  margin: 0.75em 0.5em;
}
form {
  border: 1px solid lightgray;
  box-shadow: 1px 1px 3px 0px lightgray;
  border-radius: 6px;
  width: fit-content;
  margin: auto;
  padding: 0.75em;
}
#newActivity {
  border: none;
  border-bottom: 1px solid lightgray;
}
.mb-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.activity-list {
  padding: 1em;
  margin: 1em auto;
}
</style>