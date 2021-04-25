<template>
  <div class="activity-item activity-3">
    <div class="activity-itemInfos">
      <span>Comme dirait le prof, reapeat after me ...</span>
      <canvas ref="activityThreeTom" class="activity-3-tom"></canvas>
    </div>

    <div class="activity-itemPractice">
      <h2 class="activity-item--title">{{ activityModule.dataWord.name }}</h2>
      <canvas ref="activityThreeObjects" class="activity-3-objects"></canvas>

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

    <ActivityThreeResult v-if="activityIsSucceed()"></ActivityThreeResult>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {VoiceRecognitionManager} from "~/core/managers"
import SceneModule from "~/store/scene"
import ActivityModule from "~/store/activity"
import {WordExpression} from "~/core/types"
import ActivityThreeResult from "~/components/activities/activityThree/ActivityThreeResult.vue"
import {ActivityThreeCanvasInitializer} from "~/core/utils/initializers/activities/canvas";

@Component({
  components: {
    ActivityThreeResult
  }
})
export default class ActivityThree extends Vue {
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
    new ActivityThreeCanvasInitializer({
      tomCanvas: this.$refs.activityThreeTom as HTMLCanvasElement,
      wordObjectCanvas: this.$refs.activityThreeObjects as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
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
