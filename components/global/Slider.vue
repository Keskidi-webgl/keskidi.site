<template>
  <div class="slider-component">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class PreviewScene extends Vue {
  mounted() {}
}
</script>

<style lang="scss" scoped>
.slider-component {
  .container {
    display: flex;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
}
</style>
