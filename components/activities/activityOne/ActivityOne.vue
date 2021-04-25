<template>
    <div class="activity-item activity-1">
      <div class="activity-itemInfos">
        <span>Pour vous, quel objet représente ce mot ?</span>
        <canvas ref="activityOneTom" class="activity-1-tom"></canvas>
      </div>
      <div class="activity-itemPractice">
        <h2 v-if="activityModule.dataWord" class="activity-item--title">{{activityModule.dataWord.name}}</h2>
        <canvas ref="activityOneObjects" class="activity-1-objects"></canvas>
        <div class="activity-itemChoiceWrapper">
          <div @click="updateUserSelection(item)" v-for="(item , index) in objectsData"
               class="activity-itemChoiceBtn"
          >
            {{ index + 1 }}
          </div>
        </div>
        <button @click="validateActivity" class="activity-validation">Valider</button>
      </div>
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
    new ActivityOneCanvasInitializer({
      tomCanvas: this.$refs.activityOneTom as HTMLCanvasElement,
      objectsCanvas: this.$refs.activityOneObjects as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
  }
}
</script>

<style scoped lang="scss">
canvas {
  width: 300px;
  height: 200px;
}
</style>
