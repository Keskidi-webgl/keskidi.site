<template>
  <div class="activity-page">

    <aside class="activity-page-aside" ref="activityPageAside">
      <div class="progress-bar"></div>
      <canvas ref="activityTwoObjects"></canvas>
      <button @click="goToNextActivity" class="activity-validation">Valider</button>
    </aside>

    <main class="activity-page-content">
      <div>
          <h2 class="activity-item--title">{{ activityModule.dataWord.name }}</h2>
          <p class="activity-item--phonetic">{{ activityModule.dataWord.definition.phonetic }}</p>
          <p class="activity-item--definition">{{ activityModule.dataWord.definition.definition }}</p>
          <p class="activity-item--origin">{{ activityModule.dataWord.definition.origin }}</p>

          <div class="activity-item--mediaContainer">
            <div class="activity-item--mediasWrapper" v-for="item in activityModule.dataWord.definition.medias">
              <ImageMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'image'"></ImageMedia>
              <VideoMedia :caption="item.caption" :media-url="item.url" v-if="item.type === 'video'"></VideoMedia>
            </div>
          </div>

      </div>

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

@Component({
  components: {
    ImageMedia,
    VideoMedia
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
    new ActivityTwoCanvasInitializer({
      wordObjectCanvas: this.$refs.activityTwoObjects as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
  }
}
</script>

<style scoped lang="scss">
.activity-itemPractice{
  overflow-y: scroll;
}
.activity-2-objects{
  position: absolute;
}
.activity-page-content{
  padding: 8rem 4rem;
}
.activity-item{
  color: $dark-blue;
  &--title{
    font-size: 6rem;
    font-family: "TTNormsPro";
    font-weight: bold;
  }
}

</style>
