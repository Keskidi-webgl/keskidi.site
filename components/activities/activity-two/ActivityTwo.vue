<template>
  <div class="activity-container">
    <ActivityElement class="activity-two">
      <!-- Aside -->
      <template ref="aside" v-slot:activity-element-aside>
        <div class="aside-container">
          <ProgressBar :step="progressBarStep" :total="3" text-color="white"></ProgressBar>

          <div class="word-container">
            <h1 class="main-font bold big-title">{{ activityStore.dataWord.name }}</h1>
            <img :src="activityStore.dataWord.activity_data.good_object" alt="">
          </div>

          <div class="aside-container-footer">
            <span>Passer à l'activité suivante ></span>
          </div>
        </div>
      </template>
      <!-- Content -->
      <template class="content" v-slot:activity-element-content>
        <div class="content-container">
          <h2 class="content-title">{{ activityStore.dataWord.name }}
            <svg width="270" height="110" viewBox="0 0 270 110" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="270" height="110">
                <rect width="270" height="110" fill="#C1F1FF"/>
              </mask>
              <g mask="url(#mask0)">
                <rect x="26" y="34" width="435" height="134" fill="url(#pattern0)"/>
              </g>
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0" transform="translate(-0.00642759) scale(0.00123218 0.004)"/>
                </pattern>
                <image id="image0" width="822" height="250" xlink:href="data:image/png;base64,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"/>
              </defs>
            </svg>

          </h2>

          <div class="content-wordInfo">
            <span class="content-phonetic">{{ activityStore.dataWord.definition.phonetic }}</span>
            <span class="content-gender">{{ activityStore.dataWord.definition.gender }}</span>
            <p class="content-definition">"{{ activityStore.dataWord.definition.definition }}"</p>
          </div>

          <p class="content-origin"><strong>Origine : </strong>{{ activityStore.dataWord.definition.origin }}</p>

          <div class="content-mediaContainer">
            <div class="content-mediasWrapper" v-for="item in activityStore.dataWord.definition.medias">
              <ImageMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'image'"></ImageMedia>
              <VideoMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'video'"></VideoMedia>
            </div>
          </div>

          <svg class="content-scrollIndicator" width="13" height="72" viewBox="0 0 13 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="6.25" y1="1.25" x2="6.25" y2="68.75" stroke="#000648" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.7183 65.3594L6.35914 70.7185L1.00001 65.3594" stroke="#000648" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <div @click="goTop" class="content-goTop">
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.94775 6.58887L7.30688 1.22974L12.666 6.58887" stroke="#000648" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <CustomButton @click.native="goToNextActivity" class="btn-validate" arrow-color="#FFF8EE" color="#000648"
                        text="Pratiquer le mot"></CustomButton>
        </div>
      </template>
    </ActivityElement>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityElement from "~/components/activities/ActivityElement.vue";
import {Step} from "~/core/types";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import ImageMedia from "~/components/medias/ImageMedia.vue";
import VideoMedia from "~/components/medias/VideoMedia.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";

import {ACTIVITY_TYPE} from "~/core/enums";

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
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public progressBarStep: Step = {id: 2, text: 'Tu gères !'}

  public async mounted() {
  }

  public goToNextActivity() {
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_3)
  }

  private goTop(){
    let content = document.querySelector('.activity-element-content')
      content!.scrollTo({
        top:0,
        behavior: 'smooth'
      })
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

    .content{
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
      &-title{
        font-size: $title-activity;
        font-family: $main_font;
        font-weight: bold;
        position: relative;
        width: fit-content;
        z-index: 1;
        svg{
          position: absolute;
          right: -20%;
          bottom: -40%;
          z-index: -1;
        }
      }
      &-wordInfo{
        font-family: $secondary_font;
        font-size: 30px;
        font-weight: normal;
      }
      &-phonetic{
        font-weight: bold;
      }
      &-mediasWrapper{
        margin-bottom: 60px;
        text-align: center;
        font-family: $secondary_font;
        color: $dark-blue;
        font-style: italic;

      }
      &-scrollIndicator{
        position: absolute;
        top: 90vh;
        right: -50px;
      }
      &-goTop{
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
  .activity-element-content{
    overflow-y: scroll;
    height: 100%;
  }
  .btn-validate{
    align-self: center;
  }
}

</style>
