<template>
  <section class="activity-page">
    <aside ref="activityPageAside" class="activity-page-aside">
      <h2 v-if="activityModule.dataWord" class="word-title main-font">{{ activityModule.dataWord.name }}</h2>

      <canvas ref="activityThreeTom" class="activity-3-tom"></canvas>

    </aside>
    <main ref="activityPageContent" class="activity-page-content">
      <span class="activity-content--title main-font">Comme dirait le prof, repeat after me ...</span>

       <div class="activity-expressionsWrapper" v-if="activeExpression">

         <div class="activity-expressions">
           <span class="activity-expressions--content">"{{ activeExpression.content }}"</span>
           <button class="activity-expressions--play" @click="playExpressionAudio">
               <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M14.8985 1.93365L7.68303 7.70604H1.91064V16.3646H7.68303L14.8985 22.137V1.93365Z" stroke="#000648" stroke-width="2.5" stroke-linejoin="round"/>
                 <path d="M26.5448 1.83044C29.2501 4.53665 30.7699 8.20657 30.7699 12.0331C30.7699 15.8597 29.2501 19.5296 26.5448 22.2358M21.4506 6.92458C22.8033 8.27768 23.5632 10.1126 23.5632 12.0259C23.5632 13.9392 22.8033 15.7742 21.4506 17.1273" stroke="#000648" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
           </button>
         </div>
         <div class="activity-recordWrapper">
           <button :class="{disableClick: disableClick}" ref="activityRecord" class="activity-expressions--record start-record"
                @click="startRecordVoice(expression)"
                v-for="expression in activityModule.dataWord.expressions"
                :disabled="expression.id !== activeExpression.id">
               <svg class="activity-expressions--recordActive" width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g>
                   <path d="M14.0001 1.59088C12.6051 1.59088 11.2673 2.11984 10.2809 3.06138C9.29447 4.00293 8.74033 5.27993 8.74033 6.61148V19.9997C8.74033 21.3313 9.29447 22.6083 10.2809 23.5498C11.2673 24.4914 12.6051 25.0203 14.0001 25.0203C15.395 25.0203 16.7329 24.4914 17.7193 23.5498C18.7057 22.6083 19.2598 21.3313 19.2598 19.9997V6.61148C19.2598 5.27993 18.7057 4.00293 17.7193 3.06138C16.7329 2.11984 15.395 1.59088 14.0001 1.59088V1.59088Z" stroke="#FF9D6F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                   <path d="M26.2726 16.6529V20C26.2726 23.1069 24.9796 26.0866 22.678 28.2835C20.3765 30.4805 17.2548 31.7147 13.9999 31.7147C10.745 31.7147 7.62338 30.4805 5.3218 28.2835C3.02022 26.0866 1.7272 23.1069 1.7272 20V16.6529" stroke="#FF9D6F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                   <path d="M13.9999 31.715V38.4091" stroke="#FF9D6F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                   <path d="M6.98663 38.4083H21.0126" stroke="#FF9D6F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                 </g>
               </svg>
           </button>
         </div>

          <audio style="display: none" ref="audioElement" :src='activeExpression.audio.url'></audio>
        </div>

      <canvas ref="activityThreeObjects" class="activity-3-objects"></canvas>
    </main>
    <ActivityThreeResult v-if="countExpressionSuccess === 3"></ActivityThreeResult>
<!--   -->
  </section>

<!--  ✅✅✅-->
<!--  <svg width="36" height="23" viewBox="0 0 36 23" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--    <path d="M1.63637 9.46594L13.3977 21.2273L34.3636 1.28412" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--  </svg>-->


</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {VoiceRecognitionManager} from "~/core/managers"
import SceneModule from "~/store/scene"
import ActivityModule from "~/store/activity"
import {WordExpression} from "~/core/types"
import ActivityThreeResult from "~/components/activities/activityThree/ActivityThreeResult.vue"
import {ActivityThreeCanvasInitializer} from "~/core/utils/initializers/activities/canvas";
import AuthModule from "~/store/auth";

@Component({
  components: {
    ActivityThreeResult
  }
})
export default class ActivityThree extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public authModule = getModule(AuthModule, this.$store)
  public activeExpression: WordExpression | null = null
  public countExpressionSuccess: number = 0
  public disableClick = false

  public mounted() {
    this.activeExpression = this.activityModule.dataWord!.expressions[0]
    this._initCanvasScenes()
    this._initVoiceRecognitionManager()
  }

  /**
   * Start voice recognition for current expression
   */
  public startRecordVoice(expression: WordExpression) {
    this.disableClick = true
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

    (<HTMLCanvasElement>this.$refs.activityThreeTom).width = (<HTMLElement>this.$refs.activityPageAside).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityThreeTom).height = (<HTMLElement>this.$refs.activityPageAside).getBoundingClientRect().height;

    (<HTMLCanvasElement>this.$refs.activityThreeObjects).width = (<HTMLElement>this.$refs.activityPageContent).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityThreeObjects).height = (<HTMLElement>this.$refs.activityPageContent).getBoundingClientRect().height;

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
    VoiceRecognitionManager.onEnd(() => {
      this.disableClick = false
    })
  }
}
</script>

<style scoped lang="scss">
.activity-page-aside {
  .word-title {
    padding-top: 100px;
  }
}
.activity-page-content{
  position: relative;
  padding: 100px 60px 60px 60px;
  overflow: hidden !important;
}
.activity-3-tom {
  position: absolute;
}

.activity-3-objects {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-20%);
}
.activity-content{
  &--title{
    font-size: 40px;
    color: $dark-blue;
    font-weight: bold;
    margin-bottom: 90px;
    display: block;
    max-width: 600px;
  }
}
.activity-expressionsWrapper{
  display: flex;
  flex-direction: column;
  .activity-recordWrapper{
    display: flex;
  }
}
.activity-expressions{
  display: flex;
  align-items: center;
  position: relative;
  z-index: 5;
  margin-bottom: 60px;
  &--content{
    font-size: 50px;
    font-family: "TiempoFine";
    color: $dark-blue;
  }
  &--play{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 100%;
    border: unset;
    box-shadow: 0 4px 25px -1px rgba(0,0,0,0.15);
    position: relative;
    margin-left: 30px;
    transform-style: preserve-3d;
    //z-index: 5;
    &::after{
      content: "";
      width: 90px;
      height: 90px;
      background: white;
      opacity: 0.5;
      position: absolute;
      top: 0;
      border-radius: 100%;
      left: 0;
      transform: scale(1.2) translateZ(-1px);
      z-index: -1;
    }
  }
  &--record{
    cursor: pointer;
    width: 90px;
    height: 90px;
    background: $orange;
    border-radius: 100%;
    display: flex;
    align-items: center;
    z-index: 5;
    justify-content: center;
    border: unset;
    position: relative;
    margin-right: 80px;
    &::after{
      content: "";
      width: 90px;
      height: 90px;
      border: 3px solid $orange;
      position: absolute;
      border-radius: 100%;
      transform: scale(1.2);
    }
    &:disabled{
      //opacity: 0.4;
      background: #ffefe1;
      cursor: initial;
      path{
        stroke: #ffdfca;
      }
      &::after{
        content: unset;
      }
    }
  }
  &--recordActive{
     path{
      stroke: white;
    }
  }

}

canvas {
  width: 100px;
  height: 100px;
}

.disableClick {
  pointer-events: none;
}
</style>
