<template>
  <div class="about">
    <h1>About</h1>
    <p>A small and simple app made to help keep focus, track invested time and keep reaching Your goals.</p>

    <div class="one">
      <h2></h2>
      <p>Visualize your activities and tasks with cards</p>
      <img src="@/assets/1.png" alt="">
    </div>

    <div class="two">
      <p>Work in sessions to keep focus optimal to You</p>
      <img src="@/assets/2.png" alt="">
    </div>

    <div class="three">
      <p>Check out Your progress</p>
      <img src="@/assets/3.png" alt="">
    </div>

    <div class="four">
      <p>Set time for work and for rest</p>
      <img src="@/assets/4.png" alt="">
    </div>

  </div>
</template>
<style scoped>
img{
  width: 100%;
  height: auto;
}
.one, .two, .three, .four{
  margin: 2em auto;
  box-shadow: 1px 1px 4px 0px grey;
  width: 90vw;
  max-width: 500px;
  padding: .5em 0 0 0;
}
</style>