<template>
  <div class="clock">
    <h1>It's time</h1>
    <div class="select-activity">
      <label for="activity">Choose activity: &nbsp;</label>
      <select name="activity" id="activity">
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
        <i class="bi bi-pause-circle" v-on:click="pause"></i>
        <i class="bi bi-play-circle" v-on:click="startTime"></i>
        <i class="bi bi-stop-circle" v-on:click="stop"></i>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store.js";

export default {
  name: "Clock",
  data() {
    return {
      store,
      timeInputVisible: false,
      isRest: false,
      restTime: 0.2,
      focusTime: 0.1,
      isPlay: false,
      isPause: false,
      pausedTime: String,
      i: Number, //  interval id
      options: store.activity,
    };
  },
  mounted() {
    this.displayDigits();
  },
  methods: {
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
      let wtf = console.log(document.getElementsByTagName("input")[0].value);
      if (wtf === undefined) {
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
      /* console.log("pause"); */
      this.isPause = true;
      this.isPlay = false;
      this.isRest
        ? (this.pausedTime =
            document.getElementById("rest-time-digits").textContent)
        : (this.pausedTime =
            document.getElementById("focus-time-digits").textContent);
      /* this.displayDigits(); */
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

        /* console.log(timer); */
        
        if (--timer < 0) {
          /* console.log("bs grip"); */
          // saveSession
          changeRest();
          stop();
        }
      }

      this.i = setInterval(interval, 1000);
      /* console.log("1: " + this.i); */
    },
    saveSession() {
      let veryGoodName = document.getElementById('activity').value
      console.log("for activity: ", veryGoodName)
    },
    startTime() {
      var seconds;

      this.saveSession()

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
        this.startCounting(seconds);
      }
    },
    changeRest() {
      this.isRest ? (this.isRest = false) : (this.isRest = true);
    },
    stop() {
      /* console.log("stop"); */
      clearInterval(this.i);
      this.isPause = false;
      this.isPlay = false;
      /* console.log("rest: ", this.isRest); */
      setTimeout(() => {
        this.displayDigits();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-div {
  border-radius: 6px;
  margin: 2rem auto;
  width: fit-content;
  padding: 1em 2em;
}
.focus-time-div {
  border: 1px solid rgba(0, 128, 0, 0.331);
  .rest-label {
    opacity: 0.4;
  }
}
.rest-time-div {
  border: 1px solid rgba(255, 166, 0, 0.331);
  .focus-label {
    opacity: 0.4;
  }
}
.time-label {
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-evenly;
}
.focus-label {
  color: green;
}
.focus-label:hover {
  cursor: pointer;
}
.rest-label:hover {
  cursor: pointer;
}
.rest-label {
  color: orange;
}
.focus-minutes,
.rest-minutes {
  /* border: 1px solid red; */
  margin: 1em auto;
  font-size: 180%;
}
.focus-minutes:hover {
  cursor: pointer;
}
.rest-minutes:hover {
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
.clock-buttons {
  line-height: 2.5em;
}
.bi {
  /* border: 1px solid red; */
  margin: 1em;
  font-size: 120%;
}
.bi:hover {
  cursor: pointer;
}
.bi-pause-circle {
  color: darkorange;
}
.bi-play-circle {
  color: green;
  font-size: 120%;
}
.bi-stop-circle {
  color: crimson;
}
</style>