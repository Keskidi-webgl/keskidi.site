<template>
  <div class="activity-container">
    <ActivityElement class="activity-two">
      <!-- Aside -->
      <template ref="aside" v-slot:activity-element-aside>
        <div class="aside-container">
          <ProgressBar
            :step="progressBarStep"
            :total="3"
            text-color="white"
          ></ProgressBar>

          <div class="word-container">
            <h1 class="main-font bold big-title">
              {{ activityStore.dataWord.name }}
            </h1>
            <img
              :src="activityStore.dataWord.activity_data.good_object"
              alt=""
            />
          </div>

          <div class="aside-container-footer">
            <span @click.native="goToNextActivity">Passer à l'activité suivante ></span>
          </div>
        </div>
      </template>
      <!-- Content -->
      <template class="content" v-slot:activity-element-content>
        <div class="content-container">
          <h2 class="content-title">
            {{ activityStore.dataWord.name }}
            <img
              src="~/assets/img/doodle-packed-large.png"
              class="doodle packed-doodle"
              alt=""
            />
          </h2>

          </h2>

          <div class="content-wordInfo">
            <span class="content-phonetic">{{
              activityStore.dataWord.definition.phonetic
            }}</span>
            <span class="content-gender">{{
              activityStore.dataWord.definition.gender
            }}</span>
            <p class="content-definition">
              "{{ activityStore.dataWord.definition.definition }}"
            </p>
          </div>

          <p class="content-origin">
            <strong>Origine : </strong
            >{{ activityStore.dataWord.definition.origin }}
          </p>

          <div class="content-mediaContainer">
            <div
              class="content-mediasWrapper"
              v-for="(item, index) in activityStore.dataWord.definition.medias"
              v-bind:key="index"
            >
              <ImageMedia
                :caption="item.caption"
                :media-url="item.url"
                v-if="item.type === 'image'"
              ></ImageMedia>
              <VideoMedia
                :caption="item.caption"
                :media-url="item.url"
                v-if="item.type === 'video'"
              ></VideoMedia>
            </div>
          </div>

          <svg
            class="content-scrollIndicator"
            width="13"
            height="72"
            viewBox="0 0 13 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="6.25"
              y1="1.25"
              x2="6.25"
              y2="68.75"
              stroke="#000648"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.7183 65.3594L6.35914 70.7185L1.00001 65.3594"
              stroke="#000648"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div @click="goTop" class="content-goTop">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.94775 6.58887L7.30688 1.22974L12.666 6.58887"
                stroke="#000648"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <CustomButton
            @click.native="goToNextActivity"
            class="btn-validate"
            arrow-color="#FFF8EE"
            color="#000648"
            text="Pratiquer le mot"
          ></CustomButton>
        </div>
      </template>
    </ActivityElement>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import ActivityElement from "~/components/activities/ActivityElement.vue";
import { Step } from "~/core/types";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import ImageMedia from "~/components/medias/ImageMedia.vue";
import VideoMedia from "~/components/medias/VideoMedia.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";

import { ACTIVITY_TYPE } from "~/core/enums";

@Component({
  components: {
    ActivityElement,
    ProgressBar,
    ImageMedia,
    VideoMedia,
    CustomButton
  }
})
export default class ActivityTwo extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public progressBarStep: Step = { id: 2, text: "Tu gères !" };

  public async mounted() {}

  public goToNextActivity() {
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_3);
  }

  private goTop() {
    let content = document.querySelector(".activity-element-content");
    content!.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}
</script>

<style scoped lang="scss">
.activity-container {
  width: 100%;
  height: 100%;
  .activity-two {
    .aside-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .word-container {
        position: relative;
        h1 {
          color: white;
          margin-top: 20px;
        }

        img {
          position: absolute;
          width: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
          // animation: slide-top 3s ease-in-out infinite alternate both;
        }
      }

      &-footer {
        text-align: right;
        padding-bottom: 20px;
        color: white;

        span {
          transform: translateX(20px);
          display: inline-block;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .content {
      &-container {
        display: flex;
        max-width: 800px;
        margin: auto;
        padding-top: 130px;
        padding-bottom: 30px;
        flex-direction: column;
        color: $dark-blue;
        position: relative;
      }
      &-title {
        font-size: $title-activity;
        font-family: $main_font;
        font-weight: bold;
        position: relative;
        z-index: 10;
        width: fit-content;

        .doodle {
          position: absolute;
          z-index: -1;

          &.packed-doodle {
            bottom: -20px;
            right: -150px;
          }
        }
      }
      &-wordInfo {
        font-family: $secondary_font;
        font-size: 30px;
        font-weight: normal;
      }
      &-phonetic {
        font-weight: bold;
      }
      &-mediasWrapper {
        margin-bottom: 60px;
        text-align: center;
        font-family: $secondary_font;
        color: $dark-blue;
        font-style: italic;
      }
      &-scrollIndicator {
        position: absolute;
        top: 90vh;
        right: -50px;
      }
      &-goTop {
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 90px;
        cursor: pointer;
        background: white;
        right: -50px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 25px -1px rgba(0, 0, 0, 0.15);
      }
    }
  }
  .activity-element-content {
    overflow-y: scroll;
    height: 100%;
  }
  .btn-validate {
    align-self: center;
  }
}
/* ----------------------------------------------
 * Generated by Animista on 2021-5-2 18:44:26
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translate(-50%, -100%) rotate(-1.5deg);
    transform: translate(-50%, -100%) rotate(-1.5deg);
  }
  100% {
    -webkit-transform: translate(-50%, -105%) rotate(1.5deg);
    transform: translate(-50%, -105%) rotate(1.5deg);
  }
}
@keyframes slide-top {
  0% {
    -webkit-transform: translate(-50%, -100%) rotate(-1.5deg);
    transform: translate(-50%, -100%) rotate(-1.5deg);
  }
  100% {
    -webkit-transform: translate(-50%, -105%) rotate(1.5deg);
    transform: translate(-50%, -105%) rotate(1.5deg);
  }
}
</style>
