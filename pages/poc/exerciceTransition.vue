<template>
  <div class="app-container">
    <canvas class="canvas" ref="canvas"></canvas>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import gsap from 'gsap'
import App from "~/core/app";

@Component
export default class ExerciceTransition extends Vue {
  public app: App

  mounted(): void {
    this.app = new App(this.$refs.canvas as HTMLCanvasElement)
    console.log('app mounted')

    window.addEventListener('toExercice',()=>{
      console.log("SAUCE GOOOOOOD")
    })
  }
}
</script>

<style>
.canvas
{
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
span {
  font-size: 80px;
  display: block;
}
</style>
