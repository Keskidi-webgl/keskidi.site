<template>
  <div class="progress-level" v-bind:class="{ active: canShow }">
    <div class="container-level">
      <div class="circle-level" @click="show">
        <p class="main-font suffix">Mots appris</p>
        <p class="main-font stats">
          <span class="number">{{ this.getProgress() }}</span>
          <span class="total">/ {{ this.getTotal() }} </span>
        </p>
      </div>

      <div class="jauge-level">
        <div
          class="level-item"
          v-for="(level, index) in this.getLevels()"
          :key="index"
          :class="{
            current: getLevel().name === level.name,
            validated: level.order < getLevel().order,
            blocked: level.order > getLevel().order
          }"
        >
          <div class="level-badge">
            <img :src="getIcon(level)" alt="" />
          </div>
          <div class="level-description">
            <p class="main-font level-name">
              <strong>{{ level.name }}</strong>
            </p>
            <p class="main-font level-words">
              {{ Math.round((level.position / 100) * getTotal()) }} mots appris
            </p>
          </div>
        </div>
        <div class="bar-level">
          <div class="percent-level" :style="{ height: getPercent() }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import { Level } from "~/core/types";
import { ProgressPercentManager } from "~/core/managers";
import GlobalStore from "~/store/global";

// Code Example
// https://css-tricks.com/building-progress-ring-quickly/

@Component
export default class ProgressLevel extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public canShow: boolean = false;

  mounted() {
    ProgressPercentManager.init(this.getProgress(), this.getTotal());
  }

  show() {
    this.canShow = !this.canShow;
  }

  public getProgress() {
    return this.globalStore.achievedWords.length;
  }

  public getTotal() {
    return this.globalStore.dataWord.length;
  }

  public getPercent() {
    return this.getTotal() == 0
      ? "0%"
      : (this.getProgress() * 100) / this.getTotal() + "%";
  }

  public getLevels() {
    return ProgressPercentManager.levels;
  }

  public getLevel() {
    return ProgressPercentManager.current!;
  }

  public getIcon(level: Level) {
    // Si le niveau a déjà été validé
    if (level.order < this.getLevel().order) {
      return require("~/assets/img/progress/validated.svg");
    }
    // Si le niveau n'a pas été passé
    else if (level.order > this.getLevel().order) {
      return require("~/assets/img/progress/blocked.svg");
    }
    // Si le niveau est le niveau courant
    else if (this.getLevel().name === level.name) {
      return require("~/assets/img/progress/current.svg");
    }
  }
}
</script>

<style lang="scss" scoped>
$jauge-level-padding-w: 57px;
$jauge-level-padding-h: 100px;
$badge-size: 50px;

.progress-level {
  position: relative;
  padding: 0;
  width: fit-content;
  height: fit-content;
  z-index: 40;

  p {
    padding: 0;
    margin: 0;
  }

  .container-level {
    position: absolute;
    top: 0;
    background: linear-gradient(
      120.55deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    backdrop-filter: blur(59.4294px);
    width: 0;
    height: 100vh;
    transition: 0.3s ease all;
    display: flex;
    flex-direction: column;
    align-items: center;

    .circle-level {
      cursor: pointer;
      width: 150px;
      height: 150px;
      background: linear-gradient(
        120.55deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.85) 100%
      );
      backdrop-filter: blur(59.4294px);
      border-radius: 245.5px;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      position: relative;
      color: $dark-blue;
      transform: translate(30px, -30px);
      transition: 0.3s ease all;

      p {
        transform: translate(15px, 15px);
        transition: 0.3s ease all;
      }

      .suffix {
        font-size: 14px;
      }

      .stats {
        font-size: 24px;

        .number {
          font-weight: bold;
          position: relative;
        }

        .total {
          opacity: 0.4;
        }
      }
    }

    .jauge-level {
      width: 100%;
      height: calc(100% - 150px);
      overflow: hidden;
      padding: 0;
      transition: 0.3s ease all;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      opacity: 0;

      .level-item {
        display: flex;
        align-items: center;
        min-width: max-content;

        .level-badge {
          height: $badge-size;
          width: $badge-size;
          // background-color: $dark-blue;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          position: relative;
        }

        &.current {
          .level-badge {
            background-color: $dark-blue;

            &:before {
              content: "";
              height: calc(#{$badge-size} + 10px);
              width: calc(#{$badge-size} + 10px);
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: rgba(0, 6, 72, 0.4);
              z-index: -1;
              border-radius: 50%;
            }
          }
        }

        &.validated {
          .level-badge {
            background-color: white;
            border: 1px solid $dark-blue;
          }
        }

        &.blocked {
          .level-badge {
            background-color: white;
            border: 1px solid rgba(0, 6, 72, 0.2);

            img {
              opacity: 0.2;
            }
          }

          .level-description {
            opacity: 0.2;
          }
        }

        .level-description {
          font-size: 19px;
          margin-left: 25px;

          p {
            color: $dark-blue;
            line-height: 19px;
          }
        }
      }

      .bar-level {
        height: calc(100% - 2 * #{$jauge-level-padding-h});
        width: 2px;
        position: absolute;
        background-color: rgba(0, 6, 72, 0.2);
        top: $jauge-level-padding-h;
        left: 0;
        z-index: -1;
        transition: 0.3s ease all;

        display: flex;
        align-items: flex-end;

        .percent-level {
          width: 100%;
          background-color: $dark-blue;
        }
      }
    }
  }

  &.active {
    .container-level {
      width: 316px;

      .circle-level {
        margin-top: 34px;
        transform: translate(0, 0);

        p {
          transform: translate(0, 0);
        }
      }

      .jauge-level {
        padding: $jauge-level-padding-h $jauge-level-padding-w;
        opacity: 1;

        .bar-level {
          left: calc(#{$jauge-level-padding-w} + #{$badge-size} / 2);
        }
      }
    }
  }
}
</style>
