<template>
  <div class="clock">
    <h1>It's time</h1>
    <!-- <form>

    <div class="radios">

      <div>
      <input type="radio" id="tag-radio" name="selected" value="tag" /><br>
      <label for="tag">Tag</label>
    </div>

    <div>
      <input type="radio" id="task-radio" name="selected" value="task" /><br>
      <label for="task">Task</label>
    </div>
    </div>

</form> -->

    <div class="select-tag" v-if="!hideTag">
      <label for="tag"><small>Choose tag: &nbsp;</small></label>
      <select name="tag" id="tag" v-model="tagValue">
        <!-- https://stackoverflow.com/questions/40438924/dynamically-change-select-input-options-in-vuejs-2 -->
        <option
          v-for="option in options"
          v-bind:value="option.name"
          v-bind:key="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="select-task" v-if="!hideTask">
      <label for="task"><small>Choose task: &nbsp;</small></label>
      <select name="task" id="task" v-model="taskValue">
        <option
          v-for="task in tasks"
          v-bind:value="task.name"
          v-bind:key="task.id"
        >
          {{ task.name }}
        </option>
      </select>
    </div>
    <div
      class="time-div"
      v-bind:class="{ 'focus-time-div': !isRest, 'rest-time-div': isRest }"
    >
      <div class="time-label">
        <span class="focus-label">focus</span>
        <span class="rest-label">rest</span>
      </div>

      <div class="select-minutes-div" v-if="timeInputVisible">
        <div>Set minutes</div>
        <input type="number" id="minute-input" min="0" />
        <br />
        <button
          type="button"
          class="btn btn-warning"
          v-on:click="closeTimeInput"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="saveTimeInput"
        >
          Ok
        </button>
      </div>
      <div
        id="focus-time-digits"
        class="focus-minutes"
        v-on:click="displayTimeInput"
        v-if="!isRest"
      ></div>
      <div
        id="rest-time-digits"
        class="rest-minutes"
        v-on:click="displayTimeInput"
        v-if="isRest"
      ></div>
      <div class="clock-buttons">
        <!-- <i class="bi bi-pause-circle" v-on:click="pause"></i> -->
        <i class="bi bi-play-circle" v-on:click="startTime" v-if="!isPlay"></i>
        <i class="bi bi-stop-circle" v-on:click="stop" v-if="isPlay"></i>
      </div>
    </div>

    <audio id="audio" src="../audio/sound2.ogg"></audio>
  </div>
</template>

<script>
import { Activities, Sessions, Auth, Tasks } from "@/services";

export default {
  name: "Clock",
  data() {
    return {
      timeInputVisible: false,
      isRest: false,
      restTime: 5,
      focusTime: 20,
      isPlay: false,
      /* isPause: false, */
      /* pausedTime: String, */
      i: Number, //  interval id
      options: [],
      startedAt: Date,
      tagValue: undefined,
      taskValue: undefined,
      hideTag: false,
      hideTask: false,
      tasks: [],
    };
  },
  async mounted() {
    this.displayDigits();
    await this.getOptions();
    await this.getTasks();
    /* this.hideOptions(); */
  },
  watch: {
    tagValue: function () {
      if (this.tagValue != undefined) {
        this.hideTask = true;
      }
    },
    taskValue: function () {
      console.log("bro wtf");
      if (this.taskValue != undefined) {
        this.hideTag = true;
      }
    },
  },
  methods: {
    async getOptions() {
      let o = await Activities.getAll(Auth.getUser().username);
      o.forEach((el) => this.options.push(el));
    },
    async getTasks() {
      let t = await Tasks.getAll(Auth.getUser().username);
      t.forEach((e) => this.tasks.push(e));
    },
    /* hideOptions() {
      if(this.tagValue != undefined){
        this.hideTask = true
      }
      if(this.taskValue != undefined){
        this.hideTag = true
      }
    }, */
    displayDigits() {
      this.isRest
        ? (document.getElementById("rest-time-digits").textContent =
            this.restTime)
        : (document.getElementById("focus-time-digits").textContent =
            this.focusTime);
    },
    displayTimeInput() {
      this.timeInputVisible = true;
    },
    closeTimeInput() {
      this.timeInputVisible = false;
    },
    saveTimeInput() {
      let timeInputValue = document.getElementsByTagName("input")[0].value;

      if (timeInputValue === undefined || timeInputValue == "") {
        this.closeTimeInput();
      } else {
        this.isRest
          ? (this.restTime = document.getElementsByTagName("input")[0].value)
          : (this.focusTime = document.getElementsByTagName("input")[0].value);
        this.closeTimeInput();
        this.displayDigits();
      }
    },
    pause() {
      this.isPause = true;
      this.isPlay = false;

      this.isRest
        ? (this.pausedTime =
            document.getElementById("rest-time-digits").textContent)
        : (this.pausedTime =
            document.getElementById("focus-time-digits").textContent);

      clearInterval(this.i);

      this.isRest
        ? (document.getElementById("rest-time-digits").textContent =
            this.pausedTime)
        : (document.getElementById("focus-time-digits").textContent =
            this.pausedTime);
    },
    startCounting(duration) {
      /* https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript */
      var timer = duration - 1,
        minutes,
        seconds;
      let changeRest = this.changeRest;
      let stop = this.stop;
      let save = this.saveSession;
      let isRest = this.isRest;

      function interval() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        isRest
          ? (document.getElementById("rest-time-digits").textContent =
              minutes + ":" + seconds)
          : (document.getElementById("focus-time-digits").textContent =
              minutes + ":" + seconds);

        if (--timer < 0) {
          stop();
          const audio = document.getElementById("audio");
          audio.play();
          save();
        }
      }

      this.i = setInterval(interval, 1000);
    },
    saveSession() {
      /* let veryGoodName = document.getElementById("tag").value;
      let ses = this.options.find((e) => e.name == veryGoodName); */

      /* let ses = this.utvrdiStaTrebaSejvat(); */

      let min;

      this.isRest ? (min = this.restTime) : (min = this.focusTime);

      this.tagValue ? this.saveTag(min) : this.saveTask(min);
      if( tagValue ){
        console.log("saveTag")
        this.saveTag( min )
      } else if( taskValue ){
        console.log("saveTask")
        this.saveTask(min)
      } else {
        console.log("ne sejva se nista")
      }

      /* let session = {
        name: veryGoodName,
        startTime: this.startedAt,
        minutes: Number(min),
        isRest: this.isRest,
        activityId: ses._id,
      };

      Sessions.create(session).then(() => {
        console.log("ok");
      }); */
    },
    saveTag(min) {
      
      let tagName = document.getElementById("tag").value;
      let ses = this.utvrdiStaTrebaSejvat();

      let session = {
        name: tagName,
        startTime: this.startedAt,
        minutes: Number(min),
        isRest: this.isRest,
        activityId: ses._id,
      };

      Sessions.create(session).then(() => {
        /* console.log("tag sejvan"); */
        this.changeRest();

      });
    },
    saveTask(min){
      let taskName = document.getElementById("task").value
      let ses = this.utvrdiStaTrebaSejvat( )

      let taskSession = {
        name: taskName,
        startTime: this.startedAt,
        minutes: Number(min),
        isRest: this.isRest,
        taskId: ses._id,
        tags: ses.tags
      }

      /* console.log(ses) */

      /* ses.tags.forEach( el => {
        console.log(el)
        let b = this.options.find((e) => e.name == el);
        console.log("b: ", b)
      }) */

      Tasks.saveTask(taskSession).then( () => {
        /* console.log("task sejvan") */
        this.changeRest();

      })

    },
    utvrdiStaTrebaSejvat() {
      if (this.tagValue) {
        /* console.log("tag: ", this.tagValue); */
        return this.options.find((e) => e.name == this.tagValue);
      }
      if (this.taskValue) {
        /* console.log("task: ", this.taskValue); */
        return this.tasks.find((e) => e.name == this.taskValue);
      }
    },
    startTime() {
      /* let f = this.utvrdiStaTrebaSejvat();

      console.log(f); */
      let min;

      this.isRest ? (min = this.restTime) : (min = this.focusTime);

      /* this.tagValue ? this.saveTag(min) : this.saveTask(min); */


      var seconds;

      this.isRest
        ? (seconds = this.restTime * 60)
        : (seconds = this.focusTime * 60);

      if (this.isPause == true) {
        seconds =
          Number(this.pausedTime.match(/[^:]*/i)) * 60 +
          Number(this.pausedTime.match(/[^:]*$/i) - 1);
      }

      if (this.isPlay != true) {
        this.isPlay = true;
        this.startedAt = Date.now();
        this.startCounting(seconds);
      }
    },
    changeRest() {
      this.isRest ? (this.isRest = false) : (this.isRest = true);
    },
    stop() {
      clearInterval(this.i);
      this.isPause = false;
      this.isPlay = false;
      setTimeout(() => {
        this.displayDigits();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.radios {
  display: flex;
  justify-content: center;
  * {
    margin: 0.25em 0.75em;
  }
}
.select-tag,
.select-task {
  margin: 0.25em;
}
.time-div {
  border-radius: 6px;
  margin: 2rem auto;
  width: fit-content;
  min-width: 240px;
  padding: 0.75em;
}
.focus-time-div {
  border: 2px solid rgba(0, 128, 0, 0.331);
  .rest-label {
    opacity: 0.3;
  }
}
.rest-time-div {
  border: 2px solid rgba(255, 166, 0, 0.331);
  .focus-label {
    opacity: 0.3;
  }
}
.time-label {
  display: flex;
  justify-content: space-evenly;
}
.focus-label {
  color: green;
}
.rest-label {
  color: orange;
}
.focus-minutes,
.rest-minutes {
  margin: 1em auto;
  font-size: 200%;
}
.focus-minutes:hover,
.rest-minutes:hover {
  /* margin: 1em auto; */
  opacity: 0.7;
  cursor: pointer;
}
.select-minutes-div {
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 1px 1px 2px 0 lightgray;
  padding: 0.75em;
  margin: 1em;
  .btn {
    margin: 0.5em;
  }
  #minute-input {
    width: 142px;
  }
}
.btn {
  border-radius: 6px;
  border: 1px solid rgba(17, 17, 17, 0.427);
  margin: 0.2em 0.75em;
}
.btn:hover {
  box-shadow: 1px 1px 1px 0px #111;
}
.clock-buttons {
  line-height: 2.5em;
}
.bi {
  margin: 1em;
  font-size: 120%;
}
.bi:hover {
  cursor: pointer;
}
/* .bi-pause-circle {
  color: darkorange;
} */
.bi-play-circle {
  color: green;
  font-size: 120%;
}
.bi-stop-circle {
  color: crimson;
}
</style>