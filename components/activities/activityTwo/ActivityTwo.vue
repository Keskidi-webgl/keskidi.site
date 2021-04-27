<template>
  <div class="activity-page">

    <aside class="activity-page-aside" ref="activityPageAside">
      <canvas ref="activityTwoObjects"></canvas>
      <custom-button @click.native="goToNextActivity" class="next-activity-btn"  color="white" text="Continuer" arrow-color="#FF7651"></custom-button>
    </aside>

    <main class="activity-page-content">
      <div>
          <h2 class="activity-item--title">{{ activityModule.dataWord.name }}</h2>
          <div class="activity-item--info">
            <span class="activity-item--phonetic">{{ activityModule.dataWord.definition.phonetic }}</span>
            <span class="activity-item--gender">{{ activityModule.dataWord.definition.gender }}</span>
            <p class="activity-item--definition">"{{ activityModule.dataWord.definition.definition }}"</p>

          </div>


        <p class="activity-item--origin main-font">{{ activityModule.dataWord.definition.origin }}</p>

          <div class="activity-item--mediaContainer">
            <div class="activity-item--mediasWrapper" v-for="item in activityModule.dataWord.definition.medias">
              <ImageMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'image'"></ImageMedia>
              <VideoMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'video'"></VideoMedia>
            </div>
          </div>

      </div>

      <svg class="activity-item--arrow" width="15" height="73" viewBox="0 0 15 73" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="7.25" y1="1.25" x2="7.25" y2="68.75" stroke="#000648" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.7183 65.3591L7.35914 70.7183L2.00001 65.3591" stroke="#000648" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </main>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {SceneManager} from "~/core/managers";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityModule from "~/store/activity";
import ImageMedia from "~/components/medias/ImageMedia.vue";
import VideoMedia from "~/components/medias/VideoMedia.vue";
import {ActivityTwoCanvasInitializer} from "~/core/utils/initializers/activities/canvas";
import CustomButton from "~/components/buttons/CustomButton.vue";

@Component({
  components: {
    ImageMedia,
    VideoMedia,
    CustomButton
  }
})
export default class ActivityTwo extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public isValidate: boolean = false


  public mounted() {
    this._initCanvasScenes()
  }

  public beforeDestroy() {
    SceneManager.ACTIVITY_2_OBJECTS.destroy()
  }


  /**
   * Callback on user validate activity
   */
  public validateActivity() {
    this.isValidate = true
  }

  /**
   * Callback when click to the continue button
   */
  public goToNextActivity() {
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_3)
  }

  /**
   * Init canvas of activity
   */
  private _initCanvasScenes() {
    (<HTMLCanvasElement>this.$refs.activityTwoObjects).width = (<HTMLElement>this.$refs.activityPageAside).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityTwoObjects).height = 600;

    new ActivityTwoCanvasInitializer({
      wordObjectCanvas: this.$refs.activityTwoObjects as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
  }
}
</script>

<style scoped lang="scss">
.activity-page-aside{
  align-items: center !important;
  justify-content: center !important;

  canvas {
    margin-bottom: 50px;
  }
  .next-activity-btn {

  }
}
.activity-itemPractice{
  overflow-y: scroll;
}
.activity-2-objects{
  position: absolute;
}
.activity-page-content{
  padding-top: 8rem;
  color: $dark-blue;
  div:first-child{
    margin: auto;
    max-width: 630px;
  }
}
.activity-item{
  &--title{
    font-size: $title-activity;
    font-family: "TTNormsPro";
    font-weight: bold;
  }
  &--info{
    font-family: "TiempoFine";
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 0;
  }
  &--phonetic{
    font-weight: bold;
  }
  &--definition{
    font-family: "TiempoFine";
    font-size: 30px;
    margin-bottom: 30px;
  }
  &--origin{
    font-size: 18px;
  }
  &--arrow{
    position: absolute;
    right: 30px;
    top: 90vh;
  }
}

</style>
