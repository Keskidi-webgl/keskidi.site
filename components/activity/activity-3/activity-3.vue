<template>

  <div class="activity-item activity-3">
    <div class="activity-itemInfos">
      <span>Comme dirait le prof, reapeat after me ...</span>
      <canvas ref="activity_3_tom"  class="activity-3-tom"></canvas>
    </div>

    <div class="activity-itemPractice">
      <h2 class="activity-item--title">{{ activityModule.dataWord.name }}</h2>
      <canvas ref="activity_3_objects" class="activity-3-objects"></canvas>

      <div v-if="activeExpression">
        <span>{{ activeExpression.content }}</span>
        <button class="start-record"
                @click="startRecordVoice(expression)"
                v-for="expression in activityModule.dataWord.expressions"
                :disabled="expression.id !== activeExpression.id"
        >
          Start
        </button>
        <button @click="playExpressionAudio">Play audio</button>
        <audio style="display: none" ref="audioElement" :src='activeExpression.audio.url'></audio>
      </div>
    </div>

    <activity-3-result v-if="activityIsSucceed()"></activity-3-result>

  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import Activity3Result from "~/components/activity/activity-3/activity-3-result.vue";
import {SceneManager, VoiceRecognitionManager} from "~/core/managers";
import ActivityThree0bjectsInitializer from "~/core/utils/initializers/activities/ActivityThree0bjectsInitializer";
import SceneModule from "~/store/scene";
import ActivityThreeTomInitializer from "~/core/utils/initializers/activities/ActivityThreeTomInitializer";
import ActivityModule from "~/store/activity";
import {WordExpression} from "~/core/types";

@Component({
  components: {Activity3Result}
})
export default class activity3 extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public activeExpression: WordExpression | null = null
  public countExpressionSuccess: number = 0

  public mounted() {
    this.activeExpression = this.activityModule.dataWord!.expressions[0]
    this._initCanvasScenes()
    this._initVoiceRecognitionManager()
  }

  /**
   * Start voice recognition for current expression
   */
  public startRecordVoice(expression: WordExpression) {
    VoiceRecognitionManager.setTextToRecognize(expression.content!)
    VoiceRecognitionManager.start()
  }

  /**
   * Play audio of the current expression
   */
  public playExpressionAudio() {
    (<HTMLAudioElement>this.$refs.audioElement).play()
  }

  /**
   * Computed value for activity success condition
   */
  public activityIsSucceed() {
    return this.countExpressionSuccess >= 3
  }

  /**
   * Init canvas of activity
   */
  private _initCanvasScenes() {
    new ActivityThree0bjectsInitializer({
      canvas: this.$refs.activity_3_objects as HTMLCanvasElement,
      sceneModule: this.sceneModule
    }).init()
    SceneManager.ACTIVITY_3_OBJECTS.scene.position.set(0, 0, -60)

    new ActivityThreeTomInitializer({
      canvas: this.$refs.activity_3_tom as HTMLCanvasElement,
      sceneModule: this.sceneModule
    }).init()
    SceneManager.ACTIVITY_3_TOM.scene.position.set(10, -2, -2)
  }

  /**
   * Init voice recognition manager callbacks
   */
  private _initVoiceRecognitionManager() {
    VoiceRecognitionManager.onResult((result => {
      if (result.distance > 0.5) {
        this.countExpressionSuccess++
        if (this.countExpressionSuccess < this.activityModule.dataWord!.expressions.length) {
          this.activeExpression = this.activityModule.dataWord!.expressions[this.countExpressionSuccess]
        }
      }
    }))
  }
}
</script>

<style scoped lang="scss">
.activity-3-tom {
  position: absolute;
}

.activity-3-objects {
  position: absolute;
}

canvas {
  width: 100px;
  height: 100px;
}
</style>
