<template>
  <div class="container">
    <div>
      <span>{{ icon }}</span>
      <h1 class="title">
        {{ message }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as THREE from 'three'

@Component
export default class Home extends Vue {
  public message: string = 'Work in progress'
  public icon: string = '🚧'

  mounted() {

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
}
</style>
