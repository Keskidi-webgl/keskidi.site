<template>
  <div class="progress-level">
    <div class="circle">
      <span
        ><strong class="number">{{ progress }}</strong> <br />
        {{ progress > 1 ? "MOTS" : "MOT" }}</span
      >
    </div>
    <div class="jauge" id="bar">
      <div class="progress" :style="{ width: `${percent}%` }">
        <div class="star">
          <img
            src="~/assets/img/progress-max-words-star.svg"
            class="doodle"
            alt=""
          />
          <span> {{ total }} </span>
        </div>
      </div>
      <div
        class="item"
        v-for="(level, index) in levels"
        :key="index"
        :style="{ left: `${level.position}%` }"
      >
        <span v-if="level.order != 0">{{ level.name }}</span>
      </div>
    </div>

    <!-- <div
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
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Level } from "~/core/types";

// Code Example
// https://css-tricks.com/building-progress-ring-quickly/

@Component
export default class ProgressLevel extends Vue {
  // @Prop({ type: Number, required: true }) readonly radius!: number;
  // @Prop({ type: Number, required: true }) readonly stroke!: number;
  @Prop({ type: Number, required: true }) readonly total!: number;
  @Prop({ type: Number, required: true }) readonly progress!: number;
  @Prop({ type: String, required: true }) readonly level!: string;
  @Prop({ type: Array, required: true }) readonly levels!: Array<Level>;

  public circumference: number = 0;
  public normalizedRadius: number = 0;
  public isReady: boolean = false;
  // public progressSize: string = this.radius * 2 * 0.65 - this.stroke + "px";
  // public bgSize: string =
  //   this.radius * 2 - this.stroke * 2 - this.stroke + "px";
  public percent: number =
    this.total == 0 ? 0 : (this.progress * 100) / this.total;

  // OLD version

  // public mounted() {
  //   // this.init();
  // }

  // init() {
  //   this.normalizedRadius = this.radius - this.stroke * 2;
  //   this.circumference = this.normalizedRadius * 2 * Math.PI;

  //   this.isReady = true;
  // }

  // strokeDashoffset() {
  //   return this.circumference - (this.percent / 100) * this.circumference;
  // }
}
</script>

<style lang="scss" scoped>
.progress-level {
  position: relative;
  padding: 0;
  width: fit-content;
  height: fit-content;

  margin-bottom: 10vh;
  z-index: 40;

  .circle {
    height: 70px;
    width: 70px;
    background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // z-index: 5;

    span {
      color: white;

      font-style: normal;
      font-size: 15px;
      line-height: 17px;
      font-weight: lighter;

      text-align: center;

      .number {
        font-size: 24px;
        font-weight: bold;
      }
    }

    &:before {
      content: "";
      height: 90px;
      width: 90px;
      background: #ffffff;
      opacity: 0.2;
      backdrop-filter: blur(59.4294px);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: -1;
    }
  }

  .jauge {
    height: 45px;
    border-radius: 0 40px 40px 0;
    width: 290px;
    border: 2px solid white;
    position: absolute;
    top: 50%;
    transform: translate(calc(85px - (85px / 3)), -50%);
    z-index: -5;
    padding: 8px;

    .item {
      position: absolute;
      width: fit-content;
      display: flex;
      justify-content: center;
      transform: translateX(calc(-50% - 20px));
      bottom: -24px;

      span {
        position: relative;
        color: white;
        text-transform: uppercase;
        font-size: 10px;

        &:after {
          content: "";
          height: 7px;
          width: 2px;
          background-color: white;
          position: absolute;
          border-radius: 3px;
          left: 50%;
          transform: translate(-50%, -7px);
        }
      }
    }

    .progress {
      height: 100%;
      background-color: white;
      border-radius: 0 40px 40px 0;
      transition: 0.3s ease all;

      .star {
        position: absolute;
        right: 8px;
        width: fit-content;

        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 18px;
          text-align: center;

          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  // OLD version

  // .progress-bg {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   border-radius: 50%;
  //   z-index: 1;
  // }

  // svg {
  //   z-index: 5;
  //   position: relative;
  // }

  // .progress-ring__circle {
  //   transition: 0.35s stroke-dashoffset;

  //   // axis compensation
  //   transform: rotate(-90deg);
  //   transform-origin: 50% 50%;

  //   height: 100%;
  //   width: 100%;

  //   stroke: $dark-blue;
  // }

  // .progress-number {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   background-color: $dark-blue;
  //   border-radius: 50%;

  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;

  //   p {
  //     padding: 0;
  //     margin: 0;
  //     color: white;
  //     text-align: center;
  //     width: 50%;

  //     &:last-child {
  //       border-top: 1px solid white;
  //     }
  //   }
  // }

  // .progress-title {
  //   position: absolute;
  //   width: 100%;

  //   p {
  //     text-align: center;
  //     color: $dark-blue;
  //     font-weight: 700;
  //   }
  // }
}
</style>
