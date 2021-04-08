<template>
  <div class="container">
    <div>
      <span ref="icon">{{ icon }}</span>
      <h1 class="title">
        {{ message }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import gsap from 'gsap'

@Component
export default class Home extends Vue {
  public message: string = 'Work in progress'
  public icon: string = '🚧'

  mounted() {
    this.triggerIconAnimation()
  }

  public triggerIconAnimation(): void {
    // Only GSAP 3 is compatible : https://greensock.com/cheatsheet/
    const timeline = gsap.timeline({
      repeat: -1
    })

    timeline.to(this.$refs.icon as HTMLElement, {
      duration: 2,
      y: -25,
      ease: "sine.out"
    }).to(this.$refs.icon as HTMLElement, {
      duration: 2,
      y: 0,
      ease: "sine.in"
    })

  }
}
</script>

<style>
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
