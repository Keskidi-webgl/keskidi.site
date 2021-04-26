<template>
  <div class="activity-page">
    <aside class="activity-page-aside" ref="activityPageAside">
      <div class="progress-bar"></div>
      <h2 v-if="activityModule.dataWord" class="word-title">{{ activityModule.dataWord.name }}</h2>
      <canvas ref="activityOneTom" class="tom-canvas"></canvas>
    </aside>
    <main class="activity-page-content">
      <div>
        <span class="common-text instruction">
          Alors alors ... Parmis ces 3 objets lequel représente le mot {{ activityModule.dataWord.name }} ?
        </span>
        <div class="choice-block-container">
          <div @click="updateUserSelection(item)" v-for="(item , index) in objectsData"
               class="choice-block-item">{{ index + 1 }}
          </div>
        </div>
        <button @click="validateActivity" class="activity-validation">Valider</button>
      </div>
      <div>
        <canvas ref="activityOneObjects" class="activityOneObjects"></canvas>
      </div>

    </main>

    <ActivityOneResult
      :good-object="activityModule.dataWord.activity_data.good_object"
      :user-selection="userSelection"
      v-if="isValidate">
    </ActivityOneResult>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene"
import {SceneManager} from "~/core/managers"
import ActivityModule from "~/store/activity"
import {UserObjectSelection} from "~/core/types"
import ActivityOneResult from "~/components/activities/activityOne/ActivityOneResult.vue"
import {ActivityOneCanvasInitializer} from "~/core/utils/initializers/activities/canvas";

@Component({
  components: {
    ActivityOneResult
  }
})
export default class ActivityOne extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public userSelection!: UserObjectSelection
  public isValidate: boolean = false
  public objectsData: Array<UserObjectSelection> = [
    {
      name: this.activityModule.dataWord!.activity_data!.object_one,
      description: this.activityModule.dataWord!.activity_data!.object_one_description,
    },
    {
      name: this.activityModule.dataWord!.activity_data!.object_two,
      description: this.activityModule.dataWord!.activity_data!.object_two_description,
    },
    {
      name: this.activityModule.dataWord!.activity_data!.object_three,
      description: this.activityModule.dataWord!.activity_data!.object_three_description,
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
      this.activityModule.dataWord!.activity_data!.object_one,
      this.activityModule.dataWord!.activity_data!.object_two,
      this.activityModule.dataWord!.activity_data!.object_three,
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
    (<HTMLCanvasElement>this.$refs.activityOneTom).width = 440;
    (<HTMLCanvasElement>this.$refs.activityOneTom).height = 520;

    (<HTMLCanvasElement>this.$refs.activityOneObjects).width = 525;
    (<HTMLCanvasElement>this.$refs.activityOneObjects).height = 430;

    new ActivityOneCanvasInitializer({
      tomCanvas: this.$refs.activityOneTom as HTMLCanvasElement,
      objectsCanvas: this.$refs.activityOneObjects as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
  }
}
</script>

<style scoped lang="scss">
.activity-page {
  .activity-page-content {
    padding: 0 30px 0 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    div:first-child {
      flex: 1;
    }

    div:nth-child(1) {
      .instruction {
        width: 315px;
        display: block;
        padding-bottom: 70px;
      }

      .choice-block-container {
        display: flex;
        flex-direction: column;
      }
    }

    canvas.activityOneObjects {
    }
  }
}
</style>
