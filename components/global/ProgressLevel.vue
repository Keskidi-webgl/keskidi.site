<template>
  <div class="progress-level">
    <div class="circle">
      <span class="main-font"
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
          <span class="main-font"> {{ total }} </span>
        </div>
      </div>
      <div
        class="item main-font"
        v-for="(level, index) in levels"
        :key="index"
        :style="{ left: `${level.position}%` }"
      >
        <span v-if="level.order != 0">{{ level.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Level } from "~/core/types";

// Code Example
// https://css-tricks.com/building-progress-ring-quickly/

@Component
export default class ProgressLevel extends Vue {
  @Prop({ type: Number, required: true }) readonly total!: number;
  @Prop({ type: Number, required: true }) readonly progress!: number;
  @Prop({ type: String, required: true }) readonly level!: string;
  @Prop({ type: Array, required: true }) readonly levels!: Array<Level>;

  public circumference: number = 0;
  public normalizedRadius: number = 0;
  public isReady: boolean = false;
  public percent: number =
    this.total == 0 ? 0 : (this.progress * 100) / this.total;
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
    padding: 7px;

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
        right: 10px;
        width: fit-content;
        height: 23px;
        width: 22px;
        top: 50%;
        transform: translateY(-50%);

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

          color: white;
        }
      }
    }
  }
}
</style>
