<template>
  <ActivityElement class="activity-three">
    <template v-slot:activity-element-aside>
      <div class="aside-container">
        <ProgressBar
          :step="progressBarStep"
          :total="3"
          text-color="#FF9D6F"
        ></ProgressBar>
        <div class="word-container">
          <h1 class="main-font bold big-title">
            {{ activityStore.dataWord.name }}
          </h1>
        </div>

        <canvas class="tom-canvas" ref="tom"></canvas>
      </div>
    </template>
    <template v-slot:activity-element-content>
      <div class="content-container">
        <h2 class="content-title main-font">
          Comme dirait la prof d'
          <span>
            anglais
            <img
              src="~/assets/img/doodle-packed.png"
              class="doodle packed-doodle"
              alt=""
            /> </span
          >,
          <span>
            repeat
            <img
              src="~/assets/img/doodle-line.png"
              class="doodle line-doodle"
              alt=""
            />
          </span>
          after me :
        </h2>

        <div class="content-expressionsWrapper" v-if="activeExpression">
          <div class="content-expressions">
            <span class="content-expressions--text">"{{ activeExpression.content }}"</span>
            <div class="playWrapper">
              <button ref="playAudio" v-if="globalStore.microphonePermission" class="content-expressions--play" @click="playExpressionAudio">
              </button>
              <svg
                ref="playAudioSvg"
                width="33"
                height="24"
                viewBox="0 0 33 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8985 1.93365L7.68303 7.70604H1.91064V16.3646H7.68303L14.8985 22.137V1.93365Z"
                  stroke="#000648"
                  stroke-width="2.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.5448 1.83044C29.2501 4.53665 30.7699 8.20657 30.7699 12.0331C30.7699 15.8597 29.2501 19.5296 26.5448 22.2358M21.4506 6.92458C22.8033 8.27768 23.5632 10.1126 23.5632 12.0259C23.5632 13.9392 22.8033 15.7742 21.4506 17.1273"
                  stroke="#000648"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

          </div>


          <div class="content-recordWrapper" v-if="globalStore.microphonePermission">
            <button class="recordContainer" ref="activityRecord" v-for="(expression, index) in activityStore.dataWord.expressions" :key="index"  @click.prevent="startRecordVoice(expression)" :disabled="expression.id !== activeExpression.id">

              <div ref="recordBtn" class="content-expressions--record start-record"></div>
              <svg ref="iconRecord" class="content-expressions--recordActive" width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path
                    d="M14.0001 1.59088C12.6051 1.59088 11.2673 2.11984 10.2809 3.06138C9.29447 4.00293 8.74033 5.27993 8.74033 6.61148V19.9997C8.74033 21.3313 9.29447 22.6083 10.2809 23.5498C11.2673 24.4914 12.6051 25.0203 14.0001 25.0203C15.395 25.0203 16.7329 24.4914 17.7193 23.5498C18.7057 22.6083 19.2598 21.3313 19.2598 19.9997V6.61148C19.2598 5.27993 18.7057 4.00293 17.7193 3.06138C16.7329 2.11984 15.395 1.59088 14.0001 1.59088V1.59088Z"
                    stroke="#FF9D6F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.2726 16.6529V20C26.2726 23.1069 24.9796 26.0866 22.678 28.2835C20.3765 30.4805 17.2548 31.7147 13.9999 31.7147C10.745 31.7147 7.62338 30.4805 5.3218 28.2835C3.02022 26.0866 1.7272 23.1069 1.7272 20V16.6529"
                    stroke="#FF9D6F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.9999 31.715V38.4091"
                    stroke="#FF9D6F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.98663 38.4083H21.0126"
                    stroke="#FF9D6F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
              <svg ref="iconValidate" class="content-expressions--recordValidated" width="36" height="23" viewBox="0 0 36 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.63647 9.466L13.3978 21.2274L34.3637 1.28418"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div ref="recordBorder" class="record-border"></div>

            </button>
          </div>

          <!--🔇🔇🔇🔇🔇🔇🔇 MICROPHONE IS NOT ALLOWED 🔇🔇🔇🔇🔇🔇-->
          <!--      TODO -> adapt microphone not allowed with new structure -->

          <div class="content-recordWrapper" v-if="!globalStore.microphonePermission">
            <button ref="activityRecord" class="content-expressions--record start-record" @click="playExpressionAudio"
              v-for="(expression, index) in activityStore.dataWord.expressions" :key="index" :disabled="expression.id !== activeExpression.id">
              <svg class="content-expressions--recordActive" width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8985 1.93365L7.68303 7.70604H1.91064V16.3646H7.68303L14.8985 22.137V1.93365Z" stroke="#000648" stroke-width="2.5"
                  stroke-linejoin="round"/>
                <path d="M26.5448 1.83044C29.2501 4.53665 30.7699 8.20657 30.7699 12.0331C30.7699 15.8597 29.2501 19.5296 26.5448 22.2358M21.4506 6.92458C22.8033 8.27768 23.5632 10.1126 23.5632 12.0259C23.5632 13.9392 22.8033 15.7742 21.4506 17.1273" stroke="#000648" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <audio style="display: none" ref="audioElement" :src="activeExpression.audio.url"></audio>

          <CustomButton @click.native="goToResult" v-bind:class="countExpressionSuccess <= 2 ? 'btn-disabled' : ''" class="btn-validate" arrow-color="#FFF8EE" color="#000648" text="Continuer"></CustomButton>
          <img class="content-img" :src="activityStore.dataWord.activity_data.good_object" alt=""/>
        </div>
      </div>
    </template>
  </ActivityElement>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import ActivityStore from "~/store/activity";
import ActivityElement from "~/components/activities/ActivityElement.vue";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import {Step, WordExpression} from "~/core/types";
import {ApiManager, VoiceRecognitionManager} from "~/core/managers";
import CustomButton from "~/components/buttons/CustomButton.vue";
import {ActivitySceneInitializer} from "~/core/utils/initializers/activities";
import ActivityScene from "~/core/scene/ActivityScene";
import {ACTIVITY_TYPE} from "~/core/enums";
import AuthStore from "~/store/auth";
import GlobalStore from "~/store/global";
import gsap from "gsap";


@Component({
  components: {
    ActivityElement,
    ProgressBar,
    CustomButton
  }
})
export default class ActivityThree extends Vue {
  public authStore = getModule(AuthStore, this.$store);
  public globalStore = getModule(GlobalStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public progressBarStep: Step = { id: 3, text: "T'es un ouf !" };
  public activeExpression: WordExpression | null = null;
  public countExpressionSuccess: number = 0;

  public async mounted() {
    this.activeExpression = this.activityStore.dataWord!.expressions[0];
    this._createCanvas();
    this._initVoiceRecognitionManager();
  }

  /**
   * Start voice recognition for current expression
   */

  public startRecordVoice(expression: WordExpression) {
    (<Array<HTMLElement>>this.$refs.recordBorder)[this.countExpressionSuccess].classList.add("isRecording");
    gsap.to((<Array<HTMLButtonElement>>this.$refs.recordBorder)[this.countExpressionSuccess],{
      animationPlayState:'running',
      borderBottom:'2px solid rgba(255, 157, 111, 0.4)',
      borderLeft:'2px solid rgba(255, 157, 111, 0.4)',
      duration:1})


    let tl:GSAPTimeline = gsap.timeline({yoyo:true,repeat:-1})
    tl.fromTo(  (<Array<HTMLElement>>this.$refs.recordBtn)[this.countExpressionSuccess],{scale: 1},{scale:1.2,duration:1})

    VoiceRecognitionManager!.setTextToRecognize(expression.content!);
    VoiceRecognitionManager!.start();
    VoiceRecognitionManager!.onEnd(() => {
      gsap.to((<Array<HTMLButtonElement>>this.$refs.recordBorder)[this.countExpressionSuccess],{
        animationPlayState:'paused',
        borderBottom:'2px solid #ff9d6f',
        borderLeft:'2px solid #ff9d6f',
        duration:1})
      tl.kill()

    });
  }

  /**
   * Play audio of the current expression
   */
  public playExpressionAudio() {

    (<HTMLAudioElement>this.$refs.audioElement).play();

    if (!this.globalStore.microphonePermission) {
      (<Array<HTMLElement>>this.$refs.recordBorder)[this.countExpressionSuccess].classList.add("isRecording");
      // pulse effect
      let tl:any = gsap.timeline({yoyo:true,repeat:-1})
     tl.fromTo(  (<Array<HTMLElement>>this.$refs.recordBtn)[this.countExpressionSuccess],{scale: 1},{scale:1.2,duration:1})

      (<HTMLAudioElement>this.$refs.audioElement).onended = () => {
        (<Array<HTMLElement>>this.$refs.recordBorder)[this.countExpressionSuccess].classList.remove("isRecording");
        tl.kill()

        this.countExpressionSuccess++;
        if (this.countExpressionSuccess < this.activityStore.dataWord!.expressions.length) {
          this.activeExpression = this.activityStore.dataWord!.expressions[this.countExpressionSuccess];
        }
      };
    }else {
      (<HTMLAudioElement>this.$refs.playAudio).classList.add('audioPlaying');
      gsap.to((<HTMLAudioElement>this.$refs.playAudio),{backgroundColor: '#000648'});
      gsap.to((<HTMLAudioElement>this.$refs.playAudioSvg).children,{stroke: 'white'});
      (<HTMLAudioElement>this.$refs.audioElement).onended = () => {
        (<HTMLAudioElement>this.$refs.playAudio).classList.remove('audioPlaying');
        gsap.to((<HTMLAudioElement>this.$refs.playAudio),{backgroundColor: 'white'});
        gsap.to((<HTMLAudioElement>this.$refs.playAudioSvg).children,{stroke: '#000648'});
      }
    }

  }

  /**
   * Computed value for activity success condition
   */
  async goToResult() {
    await this._achievedWord();
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITIES_RESULT);
  }

  /**
   * Init voice recognition manager callbacks
   */
  private _initVoiceRecognitionManager() {
    VoiceRecognitionManager!.onResult(result => {
      if (result.distance > 0.5) {

        let tl:any = gsap.timeline()
        tl.to((<Array<HTMLElement>>this.$refs.recordBorder)[this.countExpressionSuccess], {
            opacity:0,
            duration:0.2
        })
        tl.to((<Array<HTMLElement>>this.$refs.iconRecord)[this.countExpressionSuccess],{
          opacity:0,
          scale:0.6,
          duration:0.5
        })
        tl.fromTo((<Array<HTMLElement>>this.$refs.iconValidate)[this.countExpressionSuccess],{opacity:0,scale:0.6,duration:0.5},{opacity:1,scale:1,duration:0.5})

        tl.to(  (<Array<HTMLElement>>this.$refs.recordBtn)[this.countExpressionSuccess],{
          backgroundColor:'rgb(0, 6, 72)',
          scale:1,
          duration:0.5,
          onComplete:()=>{
            this.countExpressionSuccess++;
            if (this.countExpressionSuccess < this.activityStore.dataWord!.expressions.length) {
              this.activeExpression = this.activityStore.dataWord!.expressions[this.countExpressionSuccess];
            }
          }},
          '-0.2')

        if (this.countExpressionSuccess >= 2) {
          (<Array<HTMLButtonElement>>this.$refs.activityRecord)[this.countExpressionSuccess].disabled = true;
        }

      }
    });
  }
  private _createCanvas() {
    (<HTMLCanvasElement>this.$refs.tom).height = 500;
    (<HTMLCanvasElement>this.$refs.tom).width = (<HTMLElement>(
      document.querySelector("aside.activity-element-aside")
    ))!.clientWidth;

    new ActivitySceneInitializer({
      canvas: this.$refs.tom as HTMLCanvasElement
    }).init();
    ActivityScene.context.start();
  }

  private async _achievedWord() {
    await ApiManager.request({
      url: `/users/${this.authStore.user!.id}/words/${
        this.activityStore.dataWord!.id
      }/validate`,
      method: "POST"
    });
    const { data } = await ApiManager.request({
      url: `/users/${this.authStore.user!.id}/words`
    });
    this.globalStore.setUserWordData(data);
  }
}
</script>

<style scoped lang="scss">
.activity-three {
  .content {
    &-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      // padding: 130px 40px 0px 80px;
      color: $dark-blue;

      justify-content: space-around;
      padding: 100px 80px;
    }
    &-title {
      font-size: 40px;
      max-width: 600px;
      line-height: 1.3;
      z-index: 5;
      .doodle {
        position: absolute;
        z-index: -1;
      }

      span {
        position: relative;

        .packed-doodle {
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .line-doodle {
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    &-expressionsWrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
    }
    &-recordWrapper {
      display: flex;
      margin: 15px 0;
      // margin-bottom: 50px;
    }
    &-img {
      position: absolute;
      bottom: 50px;
      right: -50px;
      width: 400px;
    }
    &-expressions {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 5;
      // margin-bottom: 60px;
      &--text {
        font-size: 56px;
        font-family: $secondary_font;
        color: $dark-blue;
        max-width: 600px;
      }
      &--play {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 77px;
        height: 77px;
        background: white;
        border-radius: 100%;
        border: unset;
        box-shadow: 0 4px 25px -1px rgba(0, 0, 0, 0.15);
        position: relative;
        margin-left: 30px;
        transform-style: preserve-3d;
        //z-index: 5;
        &::after {
          content: "";
          width: 104px;
          height: 104px;
          background-color: rgba(255, 255, 255, 0.3);
          // background-color: grey;
          backdrop-filter: blur(10px);
          border-top: 2px solid rgba(255, 255, 255, 0.2);
          border-left: 2px solid rgba(255, 255, 255, 0.2);
          border-bottom: 2px solid $dark-cream;
          border-right: 2px solid $dark-cream;
          opacity: 0.5;
          position: absolute;
          border-radius: 100%;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, -1px);
          z-index: -1;
        }
      }
      &--record {
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
        transition: 0.6s all ease;
        &:disabled {
          background: #ffefe1;
          cursor: initial;
          path {
            stroke: #ffdfca;
          }
          &::after {
            content: unset;
          }
        }
      }
      &--recordActive {
        position: absolute;
        z-index: 7;
        path {
          stroke: white;
        }
      }
      &--recordValidated {
        position: absolute;
        opacity: 0;
        z-index: 7;
        path {
          stroke: white !important;
        }
      }
    }
  }

  .word-container {
    h1 {
      color: white;
    }
  }
  .audioPlaying{
    background: $dark-blue;
    transform-origin: center center;
    animation: play 1s alternate infinite ease-in-out;
    svg{
      path{
        stroke: white;
      }
    }
    &::after {
      content: "";
      width: 104px;
      height: 104px;
      background-color: rgba(0, 6, 72,0.3);
      border: none;
      backdrop-filter: blur(10px);
      opacity: 0.5;
      position: absolute;
      border-radius: 100%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, -1px);
      z-index: -1;
    }
  }
}
.btn-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.validateRecord {
  background: $dark-blue !important;

  .content-expressions--recordActive {
    display: none;
  }
}
.clearButton {
  &:after {
    content: unset;
  }
}
.recordContainer .record-border.isRecording {
  pointer-events: none;
  border-top: 2px solid $orange ;
  border-right: 2px solid $orange ;
  border-bottom: 2px solid rgba(255, 157, 111, 0.4) ; // rgba(255, 255, 255, 0.2);
  border-left: 2px solid rgba(255, 157, 111, 0.4) ; //rgba(255, 255, 255, 0.2);
  animation: rotate-center 5s linear infinite both;
  transition: 0.3s ease all;
}
.playWrapper{
  width: 77px;
  height: 77px;
  position: relative;
  svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(40%,-50%);
    pointer-events: none;
  }
}
.recordContainer{
  position: relative;
  height: 135px;
  width: 135px;
  margin-right: 80px;
  border: none;
  background: transparent;
  transition: 0.3s ease all;
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    //opacity: 0.4;
    div{
      background: #ffefe1;
      cursor: initial;
    }
    .record-border{
      opacity: 0;
      transition: 0.3s all ease;
    }

    path {
      stroke: #ffdfca;
    }
    &::after {
      content: unset;
    }
  }
  .record-border{
    position: absolute;
    height: 135px;
    width: 135px;
    margin-right: 80px;
    background: transparent!important;
    border: 2px solid $orange;
    border-radius: 50%;
    transition: 0.3s ease all;
    left: 0;
  }
}
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes play {
  0%   {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
