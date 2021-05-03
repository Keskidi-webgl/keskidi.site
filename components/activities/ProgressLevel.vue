<template>
  <div class="progress-level">
    <div
      class="progress-bg"
      :style="{
        height: bgSize,
        width: bgSize,
        border: `${this.stroke}px solid rgba(0, 6, 72, 0.2)`
      }"
    ></div>
    <svg
      v-if="isReady"
      class="progress-ring"
      :style="{ height: `${this.radius * 2}px`, width: `${this.radius * 2}px` }"
    >
      <circle
        class="progress-ring__circle"
        stroke="white"
        :stroke-dasharray="circumference"
        :style="{ strokeDashoffset: strokeDashoffset() }"
        :stroke-width="stroke"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
    <div
      class="progress-number"
      :style="{
        height: progressSize,
        width: progressSize
      }"
    >
      <p>{{ progress }}</p>
      <p>{{ total }}</p>
    </div>
    <div class="progress-title">
      <p>{{ level }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

// Code Example
// https://css-tricks.com/building-progress-ring-quickly/

@Component
export default class ProgressLevel extends Vue {
  @Prop({ type: Number, required: true }) readonly radius!: number;
  @Prop({ type: Number, required: true }) readonly stroke!: number;
  @Prop({ type: Number, required: true }) readonly total!: number;
  @Prop({ type: Number, required: true }) readonly progress!: number;
  @Prop({ type: String, required: true }) readonly level!: string;

  public circumference: number = 0;
  public normalizedRadius: number = 0;
  public isReady: boolean = false;
  public progressSize: string = this.radius * 2 * 0.65 - this.stroke + "px";
  public bgSize: string =
    this.radius * 2 - this.stroke * 2 - this.stroke + "px";
  public percent: number =
    this.total == 0 ? 0 : (this.progress * 100) / this.total;

  public mounted() {
    this.init();
  }

  init() {
    this.normalizedRadius = this.radius - this.stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;

    this.isReady = true;
  }

  strokeDashoffset() {
    return this.circumference - (this.percent / 100) * this.circumference;
  }
}
</script>

<style lang="scss" scoped>
.progress-level {
  position: relative;
  padding: 0;
  width: fit-content;
  height: fit-content;
  margin-bottom: 50px;

  .progress-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 1;
  }

  svg {
    z-index: 5;
    position: relative;
  }

  .progress-ring__circle {
    transition: 0.35s stroke-dashoffset;

    // axis compensation
    transform: rotate(-90deg);
    transform-origin: 50% 50%;

    height: 100%;
    width: 100%;

    stroke: $dark-blue;
  }

  .progress-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $dark-blue;
    border-radius: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      padding: 0;
      margin: 0;
      color: white;
      text-align: center;
      width: 50%;

      &:last-child {
        border-top: 1px solid white;
      }
    }
  }

  .progress-title {
    position: absolute;
    width: 100%;

    p {
      text-align: center;
      color: $dark-blue;
      font-weight: 700;
    }
  }
}
</style>
