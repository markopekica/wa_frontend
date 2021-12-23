<template>
  <div class="activity">
    <!-- <h1>What are You working on?</h1> -->
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
        <!-- <label for="newActivity" class="form-label">New activity name</label> -->
        <input
          id="newActivity"
          type="text"
          class="new-activity-input"
          placeholder="New activity name"
        />
      </div>
      <div class="mb-3">
        <label for="newActivity" class="form-label">Pick a color</label>
        <input type="color" />
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
          :key="activity.id"
          :info="activity"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ActivityCard from "@/components/ActivityCard.vue";
/* import store from "@/store.js"; */

export default {
  name: "Activity",
  components: {
    ActivityCard,
  },
  data() {
    return {
      displayNewActivityForm: false,
      /* store, */
      cards: []
    };
  },
  methods: {
    saveActivity: function () {
      // save activity to database
      alert("ok");
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
      /* return this.store.activity; */
      let r = await fetch("http://localhost:3000/activities")
      let r2 = await r.json()
      r2.forEach( el => {
        this.cards.push(el)
      })
      /* .then(r => {
        return r.json()
      }).then(r => {
        r.forEach( (element) => {
          this.cards.push(element)
        })
      }) */
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
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.activity-list {
  /* border: 1px solid red; */
  padding: 1em;
  margin: 1em auto;
}
</style>