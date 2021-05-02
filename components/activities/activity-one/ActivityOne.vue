<template>
  <div class="activity-container">
    <ActivityElement class="activity-one">
      <!-- Aside -->
      <template ref="aside" v-slot:activity-element-aside>
        <div class="aside-container">
          <ProgressBar :step="progressBarStep" :total="3" text-color="white"></ProgressBar>
          <h1 class="main-font bold big-title">{{ activityStore.dataWord.name }}</h1>
          <canvas class="tom-canvas" ref="tom"></canvas>
        </div>
      </template>
      <!-- Content -->
      <template class="content" v-slot:activity-element-content>
        <div class="content-container">
          <div class="exercise-block">
            <p class="instruction text-common">
              <img src="~/assets/img/orange-doodles.svg" alt="">
              Alors, alors... A ton avis, lequel de ces objets représente le mot <span
              class="bold">{{ activityStore.dataWord.name }}</span> ?</p>

            <div class="choices-container">
              <div :class="{isSelected: choice.isSelected}" @click="onClickChoice(choice)" v-for="choice in blockChoices"
                   class="choice-block">
                <img :src="choice.url" alt="">
                <span>{{ choice.description }}</span>
              </div>
            </div>

            <CustomButton @click.native="validateActivity" class="btn-validate" arrow-color="#FFF8EE" color="#000648"
                          text="Valider"></CustomButton>
          </div>
        </div>
      </template>
    </ActivityElement>
    <ActivityOneResult v-if="displayActivityResult" :result-data="activityResultData"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityElement from "~/components/activities/ActivityElement.vue";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import {ActivityOneResultData, Step, UserSelection} from "~/core/types";
import CustomButton from "~/components/buttons/CustomButton.vue";
import {ActivitySceneInitializer} from "~/core/utils/initializers/activities";
import ActivityScene from "~/core/scene/ActivityScene";
import ActivityOneResult from "~/components/activities/activity-one/ActivityOneResult.vue";

@Component({
  components: {
    ActivityElement,
    ProgressBar,
    CustomButton,
    ActivityOneResult
  }
})
export default class ActivityOne extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public progressBarStep: Step = {id: 1, text: 'Allez narvalo !'}
  public displayActivityResult: boolean = false
  public activityResultData: ActivityOneResultData = {
    answerWord: '',
    goodObjectUrl: '',
    goodObjectName: ''
  }

  public blockChoices: Array<UserSelection> = [
    {
      url: this.activityStore.dataWord!.activity_data!.object_one,
      description: this.activityStore!.dataWord!.activity_data!.object_one_description,
      isSelected: false
    },
    {
      url: this.activityStore.dataWord!.activity_data!.object_two,
      description: this.activityStore.dataWord!.activity_data!.object_two_description,
      isSelected: false
    }
  ];

  public userSelection: UserSelection | null = null

  public async mounted() {
    this._createCanvas()
  }

  public onClickChoice(choice: UserSelection) {
    this.userSelection = choice

    this.blockChoices.forEach(blockChoice => {
      blockChoice.isSelected = blockChoice.description === choice.description
    })
  }

  public validateActivity() {
    const goodAnswer = this.userSelection!.url === this.activityStore.dataWord!.activity_data!.good_object

    this.activityResultData = {
      goodObjectUrl: this.activityStore.dataWord!.activity_data!.good_object,
      answerWord: goodAnswer ? 'Vrai' : 'Faux',
      goodObjectName: goodAnswer ? this.userSelection!.description : this.blockChoices.find(choice => !choice.isSelected)!.description
    }
    this.displayActivityResult = true
  }

  private _createCanvas() {
    (<HTMLCanvasElement>this.$refs.tom).height = 500;
    (<HTMLCanvasElement>this.$refs.tom).width = (<HTMLElement>document.querySelector('aside.activity-element-aside'))!.clientWidth;

    new ActivitySceneInitializer({
      canvas: this.$refs.tom as HTMLCanvasElement
    }).init()
    ActivityScene.context.start()
  }
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
        justify-content: center;
        max-width: 756px;
        padding: 20px;

        .instruction {
          color: $dark-blue;
          position: relative;

          img {
            position: absolute;
            left: -80px;
            top: -40px;
          }
        }
      }

      .choices-container {
        padding-top: 60px;
        display: flex;
        justify-content: center;

        .choice-block:first-of-type {
          margin-right: 60px;
        }

        .choice-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 280px;
          padding: 20px 12px;
          box-sizing: border-box;
          position: relative;
          cursor: pointer;
          border: 1px solid grey;
          border-radius: 32px;
          color: grey;
          transition: all 0.3s ease;

          &.isSelected, &:hover {
            img {
              filter: grayscale(0)
            }
          }

          &.isSelected {
            border: 1px solid $dark-blue;
            color: $dark-blue;
          }

          img {
            top: -40px;
            position: absolute;
            filter: grayscale(1);
            transition: all 0.3s ease;
          }

          span {
            font-size: 28px;
            font-family: $secondary_font;
            padding-top: 90px;
          }
        }
      }

      .btn-validate {
        margin: 70px auto 0 auto;
      }
    }
  }
}
</style>
