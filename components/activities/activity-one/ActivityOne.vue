<template>
  <div class="activity-container">
    <ActivityElement class="activity-one">
      <!-- Aside -->
      <template ref="aside" v-slot:activity-element-aside>
        <div class="aside-container">
          <ProgressBar
            :step="progressBarStep"
            :total="3"
            text-color="white"
          ></ProgressBar>
          <h1 class="word-name main-font bold big-title">
            {{ activityStore.dataWord.name }}
          </h1>
          <canvas class="tom-canvas" ref="tom"></canvas>
        </div>
      </template>
      <!-- Content -->
      <template class="content" v-slot:activity-element-content>
        <div class="content-container">
          <div class="exercise-block">
            <p class="instruction text-common">
              Alors, alors... A ton avis, lequel de ces objets représente le mot
              <span class="bold current-word"
                >{{ activityStore.dataWord.name }}
                <img
                  src="~/assets/img/circle-doodle-huge.png"
                  class="doodle circle-doodle"
                  alt=""
              /></span>
              ?
              <img
                src="~/assets/img/arrow-draft-one.png"
                class="doodle bottom-left-arrow"
                alt=""
              />
              <img
                src="~/assets/img/arrow-draft-two.png"
                class="doodle top-left-arrow"
                alt=""
              />
            </p>
            <div class="choices-container">
              <ChoiceCard
                v-for="(choice, index) in blockChoices"
                v-bind:key="index"
                :title="choice.description"
                :image="choice.url"
                :width="310"
                :imageWidth="200"
                :class="{ isSelected: choice.isSelected, card: true }"
                @click.native="onClickChoice(choice)"
              ></ChoiceCard>

              <img
                class="interrogation"
                src="~/assets/img/interrogation.svg"
                alt=""
              />
            </div>

            <CustomButton
              @click.native="validateActivity"
              v-bind:class="
                userSelection == null ? 'btn-disabled' : 'btn-enable'
              "
              class="btn-validate"
              arrow-color="#FFF8EE"
              color="#000648"
              text="Valider"
            ></CustomButton>
          </div>
        </div>
      </template>
    </ActivityElement>

    <transition v-on:enter="enterResultAnimation">
      <ActivityOneResult
        v-if="displayActivityResult"
        :result-data="activityResultData"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import ActivityElement from "~/components/activities/ActivityElement.vue";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import { ActivityOneResultData, Step, UserSelection } from "~/core/types";
import CustomButton from "~/components/buttons/CustomButton.vue";
import { ActivitySceneInitializer } from "~/core/utils/initializers/activities";
import ActivityScene from "~/core/scene/ActivityScene";
import ActivityOneResult from "~/components/activities/activity-one/ActivityOneResult.vue";
import ChoiceCard from "~/components/cards/ChoiceCard.vue";
import { ActivityOneResultAnimation } from "~/core/animations/activities";
import TomSceneElement from "~/core/scene/TomSceneElement";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import {SoundDesignManager} from "~/core/managers";
import {AUDIO_ASSET} from "~/core/enums";

@Component({
  components: {
    ActivityElement,
    ProgressBar,
    CustomButton,
    ActivityOneResult,
    ChoiceCard
  }
})
export default class ActivityOne extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public progressBarStep: Step = { id: 1, text: "Allez narvalo !" };
  public displayActivityResult: boolean = false;
  public activityResultData: ActivityOneResultData = {
    answerWord: "",
    goodObjectUrl: "",
    goodObjectName: ""
  };

  public animations = {
    resultEnter: new ActivityOneResultAnimation()
  };

  public blockChoices: Array<UserSelection> = [
    {
      url: this.activityStore.dataWord!.activity_data!.object_one,
      description: this.activityStore!.dataWord!.activity_data!
        .object_one_description,
      isSelected: false
    },
    {
      url: this.activityStore.dataWord!.activity_data!.object_two,
      description: this.activityStore.dataWord!.activity_data!
        .object_two_description,
      isSelected: false
    }
  ];

  public userSelection: UserSelection | null = null;

  public async mounted() {
    this._createCanvas();
  }

  public onClickChoice(choice: UserSelection) {
    this.userSelection = choice;
    this.blockChoices.forEach(blockChoice => {
      blockChoice.isSelected = blockChoice.description === choice.description;
    });
  }

  public async validateActivity() {
    const goodAnswer =
      this.userSelection!.url ===
      this.activityStore.dataWord!.activity_data!.good_object;

    this.activityResultData = {
      goodObjectUrl: this.activityStore.dataWord!.activity_data!.good_object,
      answerWord: goodAnswer ? "Vrai" : "Faux",
      goodObjectName: goodAnswer
        ? this.userSelection!.description
        : this.blockChoices.find(choice => !choice.isSelected)!.description
    };

    if (goodAnswer) {
      TomSceneElement.playAnimation("punch", ActivityScene.context)
      SoundDesignManager.playSound(AUDIO_ASSET.GOOD_ANSWER)
      //SoundDesignManager.stopSound(AUDIO_ASSET.GOOD_ANSWER)
    } else {
      TomSceneElement.playAnimation("down", ActivityScene.context);
      SoundDesignManager.playSound(AUDIO_ASSET.BAD_ANSWER)
      //SoundDesignManager.stopSound(AUDIO_ASSET.BAD_ANSWER)
    }

    this.beforeEnterResultAnimation();
  }

  public beforeEnterResultAnimation() {
    CustomEase.create("asideExtend", "M0,0 C0.89,0 0.24,1 1,1 ");
    const hiddenElements = [
      document.querySelector(".aside-container"),
      document.querySelector(".word-name"),
      document.querySelector(".exercise-block")
    ];
    const tl = gsap.timeline({
      onComplete: () => {
        this.displayActivityResult = true;
      }
    });
    tl.to(
      hiddenElements,
      {
        duration: 1,
        autoAlpha: 0
      },
      1
    ).to(
      ".activity-element-aside",
      {
        width: window.innerWidth,
        duration: 1,
        ease: "asideExtend"
      },
      2
    );
  }

  public enterResultAnimation(el: Element, done: Function) {
    this.animations.resultEnter.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
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

  // TODO --> add destroy method for canvas
}
</script>

<style scoped lang="scss">
.activity-container {
  width: 100%;
  height: 100%;
  .activity-one {
    .aside-container {
      h1 {
        color: white;
        padding-top: 80px;
      }
    }

    .content-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .exercise-block {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 756px;
        padding: 20px;

        .instruction {
          color: $dark-blue;
          position: relative;
          z-index: 0;

          .current-word {
            position: relative;
          }

          .doodle {
            position: absolute;
            z-index: -1;

            &.bottom-left-arrow {
              bottom: -50px;
              left: 25px;
            }

            &.top-left-arrow {
              top: -45px;
              left: -30px;
            }

            &.circle-doodle {
              left: 0px;
              top: -15px;
            }
          }
        }
      }

      .choices-container {
        padding-top: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;

        .interrogation {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1.2);
        }

        .card {
          filter: grayscale(1);
          transition: 0.2s ease filter;
          cursor: pointer;

          &.isSelected {
            filter: grayscale(0);
            border-color: $orange;
            border-style: dashed;
          }

          &:hover {
            filter: grayscale(0);
          }

          &:first-child {
            margin-bottom: 20vh;
          }

          &:last-child {
            margin-top: 20vh;
          }
        }
      }

      .btn-enable{
        opacity: 1 !important;
      }

      .btn-disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }
  }
}
</style>
