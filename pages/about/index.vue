<template>
  <div class="page-container about-page" data-namespace="about-page">
    <div class="about-page-container">
      <!-- Rgpd link -->
      <nuxt-link to="/rgpd" class="activity-panel--rgpd main-font">
        Mentions légales
      </nuxt-link>

      <!-- Leave about page -->
      <nuxt-link to="/" class="activity-panel--cross">
        <svg
          width="24"
          height="24"
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
      </nuxt-link>

      <!-- Slider -->
      <div class="slider">
        <div class="arrow prev slider-btn" @click="toPrev">
          <div class="circle">
            <img src="~/assets/img/next-arrow.svg" alt="" />
          </div>
        </div>
        <div class="arrow next slider-btn" @click="toNext">
          <div class="circle">
            <img src="~/assets/img/next-arrow.svg" alt="" />
          </div>
        </div>
        <div class="container">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ item: true, active: index === activeItem }"
          >
            <!-- Photo -->
            <div
              class="image photo-person"
              v-if="slide.contentType === 'image' && slide.content !== ''"
              :style="{
                backgroundImage: 'url(' + getUrlImageTeam(slide.content) + ')'
              }"
            ></div>
            <div class="text main-font" v-if="slide.contentType === 'text'">
              <span
                v-for="(paraf, index) in slide.content"
                :key="index"
                v-html="paraf"
              ></span>
            </div>

            <!-- Name -->
            <div>
              <p
                :class="{
                  title: true,
                  'main-font': true,
                  'title-text': slide.contentType === 'text'
                }"
                class="name-person"
              >
                {{ slide.title }}
                <img
                  src="~/assets/img/arrow-draft-two.png"
                  class="doodle arrow-two-doodle"
                  alt=""
                />
                <img
                  src="~/assets/img/arrow-draft-one.png"
                  class="doodle arrow-one-doodle"
                  alt=""
                />
                <img
                  src="~/assets/img/heart-draft.png"
                  class="doodle heart-doodle"
                  alt=""
                />
              </p>
            </div>

            <!-- Role -->
            <div>
              <span class="desc main-font role-person">
                {{ slide.description }}
                <img
                  src="~/assets/img/doodle-packed.png"
                  class="doodle packed-doodle"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <img src="~/assets/img/logo-gobelins.png" class="logo" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Slide } from "~/core/types";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

@Component
export default class TestProgressPage extends Vue {
  // Default
  public onProgress: boolean = false;
  public slides: Array<Slide> = require("~/core/datas/teamInfos.json");
  public activeItem: number = 0;

  mounted() {}

  transition() {
    CustomEase.create("container", "M0,0 C0.89,0 0.24,1 1,1 ");
    return {
      enter(el: Element, done: Function) {
        const tl = gsap.timeline({
          onComplete: () => {
            done();
          }
        });
        tl.from(el, {
          duration: 1.5,
          width: 0,
          ease: "container"
        })
          .from(
            el.querySelector(".photo-person"),
            {
              duration: 0.7,
              y: -400,
              autoAlpha: 0,
              ease: "container"
            },
            "-=0.4"
          )
          .from(
            [
              el.querySelector(".name-person"),
              el.querySelector(".role-person")
            ],
            {
              duration: 0.7,
              y: 100,
              autoAlpha: 0,
              stagger: 0.2
            },
            "-=0.3"
          )
          .from(
            el.querySelectorAll(".slider-btn"),
            {
              duration: 0.8,
              stagger: 0.2,
              y: -30,
              autoAlpha: 0
            },
            "-=0.3"
          );
      },
      leave(el: Element, done: Function) {
        const tl = gsap.timeline({
          onComplete: () => {
            done();
          }
        });
        tl.to(el, {
          duration: 1.5,
          width: 0,
          ease: "container"
        });
      }
    };
  }

  getUrlImageTeam(imgName: string) {
    return require(`~/assets/img/team/${imgName}`);
  }

  toNext() {
    if (this.activeItem == this.slides.length - 1) this.activeItem = 0;
    else this.activeItem += 1;
  }

  toPrev() {
    if (this.activeItem == 0) this.activeItem = this.slides.length - 1;
    else this.activeItem -= 1;
  }
}
</script>

<style scoped lang="scss">
.about-page {
  height: 100vh;
  width: 100vw;
  background-color: $blue-grey;
  z-index: 100;

  .logo {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 24px;
  }

  &-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;

    .activity-panel--rgpd {
      position: absolute;
      top: 30px;
      left: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: 0.3s ease all;
      text-align: center;

      &:hover {
        color: $orange;
        text-decoration: none;
      }
    }

    .activity-panel--cross {
      position: absolute;
      top: 30px;
      right: 30px;
      background: linear-gradient(
        146.31deg,
        rgba(255, 255, 255, 0.4) 7.41%,
        rgba(255, 255, 255, 0.1) 94.07%
      );
      box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
      backdrop-filter: blur(20px);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;
    }

    .slider {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.prev {
          left: -180px;

          img {
            transform: rotate(180deg);
          }
        }

        &.next {
          right: -180px;
        }

        .circle {
          position: relative;
          width: 59px;
          height: 59px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin: 10px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;

          &:before {
            content: "";
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            height: 80px;
            width: 80px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
            box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
          }
        }
      }

      .container {
        padding: 0;
        margin: 0;

        .item {
          width: 440px;
          height: 540px;
          display: flex;
          align-items: center;
          justify-content: center;
          display: none;
          transform: translateY(-50px);
          position: relative;

          .doodle {
            position: absolute;
            z-index: -1;
          }

          .image,
          .text {
            width: 100%;
            height: 100%;

            transform: rotate(5deg);
          }

          .image {
            border: 40px solid white;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }

          .text {
            background-color: white;
            padding: 46px;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;

            span {
              width: 100%;
              margin-top: 15px;
              color: $dark-blue;
            }
          }

          .title,
          .desc {
            position: absolute;
            bottom: 0;
            left: 50%;
            z-index: 5;
            width: max-content;
            text-align: center;
          }

          .title {
            transform: translate(-50%, 50%);
            color: $orange;
            font-weight: bold;
            font-size: 90px;

            &.title-text {
              top: -70px !important;
              bottom: auto;
            }

            .arrow-two-doodle {
              left: -30px;
              top: 0;
            }

            .arrow-one-doodle {
              left: 20%;
              bottom: -20px;
            }

            .heart-doodle {
              right: 0;
              top: 0;
              transform: translate(100%, 50%);
            }
          }

          .desc {
            transform: translate(-50%, 200%);
            color: white;
            font-size: 40px;

            .packed-doodle {
              bottom: -20%;
              left: 50%;
              transform: translateX(-50%);
            }
          }

          &.active {
            display: inherit;
          }
        }
      }
    }
  }
}
</style>
