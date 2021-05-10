<template>
  <div class="progress-level" v-if="getLevel() != null">
    <div class="container-level">
      <!-- Leave about page -->
      <div class="close-progress" @click="close">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L22 21.9997"
            stroke="#000648"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 22L22 2.00027"
            stroke="#000648"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="circle-level" @click="show">
        <div class="circleWrapper">
          <p class="main-font suffix">Mots appris</p>
          <p class="main-font stats">
            <span class="number">{{ this.getProgress() }}</span>
            <span class="total">/ {{ this.getTotal() }} </span>
          </p>
        </div>
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
import { Component, getModule, Vue } from "nuxt-property-decorator";
import { Level } from "~/core/types";
import { ProgressPercentManager } from "~/core/managers";
import GlobalStore from "~/store/global";
import gsap from "gsap";

// Code Example
// https://css-tricks.com/building-progress-ring-quickly/

@Component
export default class ProgressLevel extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public canShow: boolean = false;

  beforeMount() {
    ProgressPercentManager.init(
      this.globalStore.achievedWords.length,
      this.globalStore.dataWord.length
    );
  }

  show() {
    if (!this.canShow) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.canShow = true;
    let tl: GSAPTimeline = gsap.timeline();
    gsap.set(".bar-level", { opacity: 1});
    tl.to(".container-level", {
      duration: 1.2,
      ease: "expo.inOut",
      translateX: 0
    });
    tl.to(
      ".circle-level",
      {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(".circle-level", { right: "50%", delay: 0.3, translateX: "50%", translateY: "30px"});
          gsap.set(".circleWrapper", {left: "-15px", delay: 0.3, top: "-10px"});
        }
      },
      "-0.2"
    );
    tl.to(".circle-level", { opacity: 1, duration: 0.5 });
    tl.to(".bar-level", {
      // 100px = $jauge-level-padding-h
      height: "calc(100% - 2 * 100px)",
      duration: 0.8,
      ease: "expo.inOut"
    },'-=0.8');
    tl.fromTo(
      ".level-item",
      { y: 10 },
      {
        y: 0,
        stagger: {
          each: 0.1
        },
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );
    tl.to(".close-progress", { opacity: 1 });

    console.log("open menu");
  }

  close() {
    this.canShow = false;
    let tl: GSAPTimeline = gsap.timeline();

    gsap.to(".container-level", {
      duration: 1.2,
      delay: 0.3,
      ease: "expo.inOut",
      translateX: -316,
      onComplete: () => {
        gsap.set(".bar-level", { height: "0px"});
      }
    });

    tl.to(
      ".circle-level",
      {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(".circle-level", {right: "-80px", delay: 0.3, translateX: "30px", translateY: "-30px"
          });
          gsap.set(".circleWrapper", {left: "unset", delay: 0.3, top: "unset"});
        }
      },
      "-0.2"
    );
    tl.to(".close-progress", { opacity: 0 });
    tl.to(".circle-level", { opacity: 1, duration: 0.5});
    tl.to(".bar-level", { opacity: 0 ,duration:0.5});

    tl.to(".level-item", { opacity: 0, duration: 0.6 }, "-=1");


    console.log("close menu");
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
    // return ProgressPercentManager.levels;

    return ProgressPercentManager.levels.sort((a, b) =>
      a.order > b.order ? -1 : b.order > a.order ? 1 : 0
    );
  }

  public getLevel() {
    ProgressPercentManager.init(
      this.globalStore.achievedWords.length,
      this.globalStore.dataWord.length
    );
    return ProgressPercentManager.setCurrentLevel().current!;
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
    width: 316px;
    transform: translateX(-316px);
    top: 0;
    background: linear-gradient(
      120.55deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    backdrop-filter: blur(59.4294px);
    height: 100vh;
    //transition: 0.3s ease all;
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
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      position: absolute;
      right: -80px;
      //position: relative;
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
      transition: 0.3s ease all;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      //opacity: 1;
      margin-top: auto;
      padding: 75px 0;

      .level-item {
        display: flex;
        align-items: center;
        min-width: max-content;
        opacity: 0;

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
        height: 0; // calculated height --> calc(100% - 2 * #{$jauge-level-padding-h});
        width: 2px;
        position: absolute;
        background-color: rgba(0, 6, 72, 0.2);
        top: $jauge-level-padding-h;
        //left: 0;
        left: 88px;
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
    .circleWrapper {
      position: relative;
      text-align: center;
    }

    .close-progress {
      position: absolute;
      top: 6px;
      right: 3px;
      background: linear-gradient(
        146.31deg,
        rgba(255, 255, 255, 0.4) 7.41%,
        rgba(255, 255, 255, 0.1) 94.07%
      );
      box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
      backdrop-filter: blur(20px);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;

      opacity: 0;
    }
  }

  //&.active {
  //  .container-level {
  //    //width: 316px;
  //
  //    .circle-level {
  //      margin-top: 34px;
  //      transform: translate(0, 0);
  //
  //      p {
  //        transform: translate(0, 0);
  //      }
  //    }
  //
  //    .jauge-level {
  //      padding: $jauge-level-padding-h $jauge-level-padding-w;
  //      opacity: 1;
  //
  //      .bar-level {
  //        left: calc(#{$jauge-level-padding-w} + #{$badge-size} / 2);
  //      }
  //    }
  //  }
  //}
}
</style>
