<template>
  <div class="activity-page">
    <aside class="activity-page-aside" ref="activityPageAside">
      <h2 v-if="activityStore.dataWord" class="word-title main-font">{{ activityStore.dataWord.name }}</h2>
      <canvas ref="activityOneTom" class="tom-canvas"></canvas>
    </aside>
    <main ref="activityPageContent" class="activity-page-content">
        <span class="common-text instruction main-font">
          Alors alors ... Parmis ces 3 objets lequel représente le mot {{ activityStore.dataWord.name }} ?
        </span>
<!--      <div class="activity-page-contentWrapper">-->
        <div v-if="userSelection" class="choice-block-container">
          <div @click="updateUserSelection(item)" v-for="(item , index) in objectsData"
               class="choice-block-item" :class="{isActive: item.name === userSelection.name}">
            <span class="circle"></span>
            <span class="text">{{ item.description }}</span>
          </div>
        </div>
        <div>
          <canvas ref="activityOneObjects" class="activityOneObjects"></canvas>
        </div>
<!--      </div>-->
      <custom-button class="activity-page--btn" @click.native="validateActivity"  color="#000648" text="Valider" arrow-color="white"></custom-button>


    </main>

    <ActivityOneResult
      :good-object="activityStore.dataWord.activity_data.good_object"
      :user-selection="userSelection"
      v-if="isValidate">
    </ActivityOneResult>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import {SceneManager} from "~/core/managers"
import ActivityStore from "~/store/activity"
import {UserObjectSelection} from "~/core/types"
import ActivityOneResult from "~/components/activities/activityOne/ActivityOneResult.vue"
import {ActivityOneCanvasInitializer} from "~/core/utils/initializers/activities/canvas";

import CustomButton from "~/components/buttons/CustomButton.vue";
@Component({
  components: {
    ActivityOneResult,
    CustomButton
  }
})
export default class ActivityOne extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public userSelection: UserObjectSelection|null = null
  public isValidate: boolean = false
  public objectsData: Array<UserObjectSelection> = [
    {
      name: this.activityStore.dataWord!.activity_data!.object_one,
      description: this.activityStore.dataWord!.activity_data!.object_one_description,
    },
    {
      name: this.activityStore.dataWord!.activity_data!.object_two,
      description: this.activityStore.dataWord!.activity_data!.object_two_description,
    },
    {
      name: this.activityStore.dataWord!.activity_data!.object_three,
      description: this.activityStore.dataWord!.activity_data!.object_three_description,
    }
  ]

  public mounted() {
    this.userSelection = this.objectsData[0]
    this._initCanvasScenes()
  }

  /**
   * Callback on click change button
   */
  public updateUserSelection(item: UserObjectSelection) {
    this.userSelection = item

    SceneManager.ACTIVITY_1_OBJECTS.setObjectVisibility([
      this.activityStore.dataWord!.activity_data!.object_one,
      this.activityStore.dataWord!.activity_data!.object_two,
      this.activityStore.dataWord!.activity_data!.object_three,
    ], this.userSelection.name)
  }

  /**
   * Callback on user validate activity
   */
  public validateActivity() {
    this.isValidate = true
  }

  /**
   * Init canvas of activity
   */
  private _initCanvasScenes() {
    (<HTMLCanvasElement>this.$refs.activityOneTom).width = (<HTMLElement>this.$refs.activityPageAside).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityOneTom).height = (<HTMLElement>this.$refs.activityPageAside).getBoundingClientRect().height;

    (<HTMLCanvasElement>this.$refs.activityOneObjects).width = (<HTMLElement>this.$refs.activityPageContent).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityOneObjects).height = (<HTMLElement>this.$refs.activityPageContent).getBoundingClientRect().height;

    new ActivityOneCanvasInitializer({
      tomCanvas: this.$refs.activityOneTom as HTMLCanvasElement,
      objectsCanvas: this.$refs.activityOneObjects as HTMLCanvasElement,
      activityStore: this.activityStore
    }).init()
  }
}
</script>

<style scoped lang="scss">

.activity-page {
  &-aside{
    justify-content: start;

    .word-title {
      padding-top: 100px;
    }
  }
  .activity-page-content {
    overflow: hidden;
    padding: 180px 30px 30px 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    justify-content: space-between;

    .activity-page-contentWrapper {
      display: flex;
      align-items: center;

      .instruction {
        width: 315px;
        display: block;
        padding-bottom: 70px;
        font-size: 40px;
        font-weight: bold !important;
      }

    }
    .choice-block-container {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      align-self: flex-start;
      z-index: 5;

      .choice-block-item {
        width: 270px;
        border: 2px solid #FF9D6F;
        border-radius: 30px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        margin: 5px 0;

        .circle {
          width: 20px;
          height: 20px;
          display: block;
          border-radius: 50%;
          border: 2px solid #FF9D6F;
          margin-right: 15px;
        }

        &.isActive {
          .circle {
            background-color: #FF9D6F;
          }
        }
      }
    }

    canvas.activityOneObjects {
      position: absolute;
      top: 0;
      left: 30%;
      transform: translateX(0%);
    }
  }
  &--btn{
    align-self: flex-start;
  }
}
</style>
