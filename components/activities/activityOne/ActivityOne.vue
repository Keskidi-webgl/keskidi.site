<template>
    <div class="activity-item activity-1">
      <div class="activity-itemInfos">
        <span>Pour vous, quel objet représente ce mot ?</span>
        <canvas ref="activity_1_tom" class="activity-1-tom"></canvas>
      </div>
      <div class="activity-itemPractice">
        <h2 v-if="activityModule.dataWord" class="activity-item--title">{{activityModule.dataWord.name}}</h2>
        <canvas ref="activity_1_objects" class="activity-1-objects"></canvas>
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
import {ActivityOneObjectsInitializer, ActivityOneTomInitializer} from "~/core/utils/initializers/activities"

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
    new ActivityOneObjectsInitializer({
      canvas: this.$refs.activity_1_objects as HTMLCanvasElement,
      wordData: this.activityModule.dataWord!
    }).init()
    SceneManager.ACTIVITY_1_OBJECTS.scene.position.set(0, 0, -60)

    new ActivityOneTomInitializer({
      canvas: this.$refs.activity_1_tom as HTMLCanvasElement,
      sceneModule: this.sceneModule
    }).init()
    SceneManager.ACTIVITY_1_TOM.scene.position.set(10, -2, -2)
  }
}
</script>

<style lang="scss">
.activity{
  &-container{
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: white;
    top: 0;
    transform: translateY(100%);
    padding: 2.5rem;
    overflow: hidden;
  }
  &-itemInfos{
    width: 30%;
    height: 100%;
    background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
    position: relative;
    .activity-1-tom{
      position: absolute;
    }
  }
  &-itemPractice{
    width: 70%;
    height: 100%;
    position: relative;
    .activity-1-objects{
      position: absolute;
    }

  }
  &-item{
    width: 100%;
    height: 100%;
    display: none;
    &--title{
      font-size: 6rem;
    }
    &--btn{
      padding: 20px;
      background: red;
      z-index: 999;
      position: fixed;
      top: 30px;
      width: 100px;
    }
  }
  &-itemActive{
    display: flex;
    flex-direction: row!important;
  }
  &-itemChoiceBtn{
    width: 40px;
    height: 40px;
    background: #EB5757;
    border-radius: 50%;
    z-index: 44;
    cursor: pointer;
    position: relative;
  }
  &-validation{
    z-index: 99;
    position: relative;
  }
  &-1-resultWrapper{
    position: absolute;
    background: pink;
    width: 100%;
    height: 100%;
  }
}
</style>
