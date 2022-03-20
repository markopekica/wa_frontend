<template>
  <div id="options">
    <h1>Options</h1>

    <form action="">
      <div class="work-div">
        <span>Work minutes: </span
        ><!-- &nbsp; -->
        <input type="number" id="work-minute-input" min="0" v-model="workMin"/>
      </div>

      <br />

      <div class="rest">
        <span>Rest minutes: </span
        ><!-- &nbsp; -->
        <input type="number" id="rest-minute-input" min="0" v-model="restMin" />
      </div>
    </form>

    <button type="button" class="btn btn-success" v-on:click="saveOptions">
      Save
    </button>

    <br>

    <!-- <button type="button" class="btn btn-danger" v-on:click="saveOptions">
      Delete account
    </button> -->

    <!-- <div>
        <div>
          workMin: {{ this.workMin }}
        </div>
        <div>
          restMin: {{ this.restMin }}
        </div>
    </div> -->
  </div>
</template>

<script>
import { Options, Auth } from "@/services";
export default {
  name: "Options",
  data() {
      return {
          workMin: Number,
          restMin: Number,
          options: this.getOptions()
      }
  },
  async mounted() {
    await this.getOptions()
  },
  methods: {
      async saveOptions( ){

        /* console.log(Number.isInteger(parseInt(this.restMin))) */

        /* let options = await this.getOptions() */

        console.log("options: ", this.options)

        this.options == undefined ? this.save( ) : this.update( )
        



      },
      async getOptions( ){
        /* console.log("ok") */
        /* console.log( await Options.getOptions( Auth.getUser().username ) ) */
        this.options = await Options.getOptions( Auth.getUser().username )
        this.workMin = this.options.workMin
        this.restMin = this.options.restMin
        /* return await Options.getOptions( Auth.getUser().username ) */
      },
      makeOptionObject( ){
        return {
          workMin: this.workMin,
          restMin: this.restMin,
          userName: Auth.getUser().username,
        }
      },
      async save( ){

        let options = this.makeOptionObject()/* {
          workMin: this.workMin,
          restMin: this.restMin,
          userName: Auth.getUser().username,
        } */

        console.log(options)

        if( Number.isInteger(parseInt(this.workMin)) && Number.isInteger(parseInt(this.restMin)) ){
          
          Options.save(options).then( () => {
            window.location.reload();
          })

        }
        
      },
      async update( ){

        let options = this.makeOptionObject()/* {
          workMin: this.workMin,
          restMin: this.restMin,
          userName: Auth.getUser().username,
        } */

        /* console.log("options: ", options)
        console.log("id: ", this.options._id ) */

        /* let r = await  */
        Options.updateOptions( this.options._id, options ).then( () => {
          window.location.reload();
        })

        /* console.log("r: ", r) */

        

      }
  }
};
</script>


<style lang="scss">
form {
  margin: 2em auto;
}
#minute-input {
  border-width: 0;
  border-bottom-width: 1px;
}
.btn-danger {
    margin: 4em auto;
}
</style>
