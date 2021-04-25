<template>
  <div class="activity-item activity-2">
    <div class="activity-itemInfos">
      <span>Pour vous, quel objet représente ce mot ?</span>
      <canvas ref="activity_2_objects" class="activity-2-objects"></canvas>
    </div>

    <div class="activity-itemPractice">
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

      <button @click="goToNextActivity" ref="nextActivity" class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {SceneManager} from "~/core/managers";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityModule from "~/store/activity";
import {ActivityTwoObjectsInitializer} from "~/core/utils/initializers/activities";
import ImageMedia from "~/components/medias/ImageMedia.vue";
import VideoMedia from "~/components/medias/VideoMedia.vue";

@Component({
  components: {
    ImageMedia,
    VideoMedia
  }
})
export default class ActivityTwo extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  public mounted() {
    this._initCanvasScenes()
  }

  public beforeDestroy() {
    SceneManager.ACTIVITY_2_OBJECTS.destroy()
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
    new ActivityTwoObjectsInitializer({
      canvas: this.$refs.activity_2_objects as HTMLCanvasElement,
      sceneModule: this.sceneModule
    }).init()
    SceneManager.ACTIVITY_2_OBJECTS.scene.position.set(0, 0, -60)
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
</style>
