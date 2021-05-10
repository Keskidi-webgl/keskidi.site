<template>
  <div class="progress-bar-container">
  <div class="progress-bar-width" :style="{width: containerWidth()}"></div>
    <div class="progress-bar-info">
    <p> {{step.id}}/{{total}} </p>
    <p :style="{color: textColor}"> {{ step.text }} </p>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import {Step} from "~/core/types";

@Component
export default class ProgressBar extends Vue {
  @Prop({type: Object, required: true}) readonly step!: Step;
  @Prop({type: Number, required: true}) readonly total!: number
  @Prop({type: String, required: true}) readonly textColor!: string

  public mounted() {
  }

  public containerWidth() {
    return (this.step.id * 100) / this.total + "%";
  }

}
</script>

<style lang="scss" scoped>
.progress-bar-container {
    width: 360px;
    height: 45px;
    padding: 6px;
    border: 2px solid white;
    border-radius: 60px;
    margin: 0 auto;

    .progress-bar-width {
        height: 100%;
        background: white;
        border-radius: 60px;
        transition: 0.3s ease all;
    }

    .progress-bar-info {
      display: flex;
      justify-content: space-between;
      transform: translate(0px, -27px);
      padding: 0 16px;
      color: $dark-orange;
    }

}
</style>
